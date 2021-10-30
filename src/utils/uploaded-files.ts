import urls from "./urls";

export function linkToUploadedFile(blobPath: string): string {
  return `${urls.api.users}/uploads/${blobPath}`;
}
