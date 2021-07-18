import { internalRequest } from "src/utils/requests";
import { Chapter, HttpMethod } from "src/utils/types";
import urls from "src/utils/urls";

const chapterAPI = urls.baseUrl + urls.api.chapters;

export async function getChapters() {
  return internalRequest<Array<Chapter>>({
    url: chapterAPI,
    method: HttpMethod.GET,
  });
}
