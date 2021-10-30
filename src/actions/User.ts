import { AnonymousCredential, BlockBlobClient } from "@azure/storage-blob";
import { internalRequest } from "src/utils/requests";
import {
  User,
  HttpMethod,
  NonprofitUpdateUser,
  ChapterUpdateUser,
  UploadFileOptions,
  UploadedFile,
} from "src/utils/types";
import urls from "src/utils/urls";
import { v4 as uuidv4 } from "uuid";

const userAPI = urls.baseUrl + urls.api.users;

export async function nonprofitGetUser() {
  return internalRequest<User>({
    url: userAPI + `/personal/nonprofit`,
    method: HttpMethod.GET,
  });
}

export async function chapterGetUser() {
  return internalRequest<User>({
    url: userAPI + `/personal/chapter`,
    method: HttpMethod.GET,
  });
}

export async function chapterGetUsers() {
  return internalRequest<User[]>({
    url: userAPI + "/chapter",
    method: HttpMethod.GET,
  });
}

export async function nonprofitGetUsers() {
  return internalRequest<User[]>({
    url: userAPI + "/nonprofit",
    method: HttpMethod.GET,
  });
}

export function nonprofitUpdateUser(userUpdate: NonprofitUpdateUser) {
  return internalRequest<User>({
    url: userAPI + `/personal/nonprofit`,
    method: HttpMethod.PATCH,
    body: {
      userUpdate,
    },
  });
}

export function chapterUpdateUser(userUpdate: ChapterUpdateUser) {
  return internalRequest<User>({
    url: userAPI + `/personal/chapter`,
    method: HttpMethod.PATCH,
    body: {
      userUpdate,
    },
  });
}

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

  const sasUploadUrl = await internalRequest<string>({
    url: `${userAPI}/uploads`,
    method: HttpMethod.POST,
    body: { path: `/${fileName}` },
  });
  const blockClient = new BlockBlobClient(
    sasUploadUrl,
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
