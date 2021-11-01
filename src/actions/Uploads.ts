import { internalRequest } from "src/utils/requests";
import { HttpMethod } from "src/utils/types";
import urls from "src/utils/urls";

export async function generateWriteOnlyUploadURL(
  fileName: string
): Promise<string> {
  return internalRequest<string>({
    url: urls.api.uploads,
    method: HttpMethod.POST,
    body: { path: `/${fileName}` },
  });
}
