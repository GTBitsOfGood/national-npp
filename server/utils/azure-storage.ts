import {
  BlobClient,
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { SessionUser } from "src/utils/types";

const UPLOADS_CONTAINER_NAME = "uploads";

export const blobService = new BlobServiceClient(
  `https://${
    process.env.AZURE_STORAGE_ACCOUNT as string
  }.blob.core.windows.net`,
  new StorageSharedKeyCredential(
    process.env.AZURE_STORAGE_ACCOUNT as string,
    process.env.AZURE_STORAGE_KEY as string
  )
);
export const containerSerivce = blobService.getContainerClient(
  UPLOADS_CONTAINER_NAME
);

export function validateUserAuthAndGetBlobClient(
  user: SessionUser,
  blobPath: string
): BlobClient {
  const blobPathParts = blobPath.split("/");
  if (blobPathParts.length <= 1) {
    throw new Error(`Invalid blob path ${blobPath}`);
  }
  if (blobPathParts[0] != user.id.toString()) {
    throw new Error(`User does not have access to blob ${blobPath}`);
  }
  return containerSerivce.getBlockBlobClient(blobPath);
}
