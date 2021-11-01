import APIWrapper from "server/utils/APIWrapper";
import { validateUserAuthAndGetBlobClient } from "server/utils/azure-storage";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      handleResponse: true,
    },
    async handler(req, res): Promise<void> {
      const blobClient = validateUserAuthAndGetBlobClient(
        req.user,
        (req.query.blobPath as string[]).join("/")
      );
      if (!(await blobClient.exists())) {
        res.status(404).end();
        return;
      }

      const downloadedResponse = await blobClient.download();
      if (downloadedResponse.errorCode) {
        throw new Error(downloadedResponse.errorCode);
      }
      if (!downloadedResponse.readableStreamBody) {
        res.status(404).end();
        return;
      }
      downloadedResponse.readableStreamBody.pipe(res);
    },
  },
});
