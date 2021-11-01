import {
  BlobSASPermissions,
  CommonGenerateSasUrlOptions,
} from "@azure/storage-blob";
import APIWrapper from "server/utils/APIWrapper";
import { validateUserAuthAndGetBlobClient } from "server/utils/azure-storage";

export default APIWrapper({
  POST: {
    config: {
      requireSession: true,
    },
    async handler(req): Promise<string> {
      if (!req.body.path || typeof req.body.path !== "string") {
        throw new Error("Path must be in body");
      }
      const uploadUrl = await validateUserAuthAndGetBlobClient(
        req.user,
        // all user uploads go to the users' folder in blob storage (for now)
        `${req.user.id.toString()}${req.body.path}`
      ).generateSasUrl({
        permissions: BlobSASPermissions.parse("cw"),
        ...buildTokenRange(10),
      });
      return Promise.resolve(uploadUrl);
    },
  },
});

function buildTokenRange(
  durationMins: number
): Required<Pick<CommonGenerateSasUrlOptions, "startsOn" | "expiresOn">> {
  const tokenStart = new Date(Date.now() - 5000); // shift start by a couple seconds due to issues with client-side clock synchronization
  return {
    startsOn: tokenStart,
    expiresOn: new Date(tokenStart.getTime() + durationMins * 60000),
  };
}
