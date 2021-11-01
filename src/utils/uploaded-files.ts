import { AnonymousCredential, BlockBlobClient } from "@azure/storage-blob";
import { generateWriteOnlyUploadURL } from "src/actions/Uploads";
import { UploadedFile, UploadFileOptions } from "src/utils/types";
import urls from "src/utils/urls";
import { v4 as uuidv4 } from "uuid";

const MAX_UPLOAD_MB = 10;
/**
 * @param file - the file being uploaded
 * @param nameWithoutExtension - the name to give the file in storage (without the extension). if two files have the same name
 * for a user, the file will overwrite the existing file. if a name is not
 * provided, a randomly generated name will be used that does NOT collide with an
 * existing file
 * @param onProgress - called on progress events. on fast networks, this
 * will might just emit one event
 *
 * Will throw error if file is too large
 */
export async function uploadFile(
  file: File,
  { nameWithoutExtension, onProgress }: UploadFileOptions
): Promise<UploadedFile> {
  if (file.size > MAX_UPLOAD_MB * Math.pow(2, 20)) {
    throw new Error("File too large");
  }

  const extensionPeriodIdx = file.name.lastIndexOf(".");
  const fileName = `${nameWithoutExtension ?? uuidv4()}${
    extensionPeriodIdx > 0 ? file.name.substring(extensionPeriodIdx) : ""
  }`;

  const blockClient = new BlockBlobClient(
    await generateWriteOnlyUploadURL(fileName),
    new AnonymousCredential()
  );
  const response = await blockClient.uploadData(await file.arrayBuffer(), {
    onProgress: !onProgress
      ? undefined
      : (event) => {
          onProgress(event.loadedBytes / file.size);
        },
  });

  if (response.errorCode) {
    throw new Error(response.errorCode);
  }

  return {
    blobPath: blockClient.name,
    name: fileName,
  };
}

export function linkToUploadedFile(blobPath: string): string {
  return `${urls.api.uploads}/${blobPath}`;
}
