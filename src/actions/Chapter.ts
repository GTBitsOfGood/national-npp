import { internalRequest } from "src/utils/requests";
import { Chapter, HttpMethod } from "src/utils/types";
import urls from "src/utils/urls";

export async function getChapters() {
  return internalRequest<Array<Chapter>>({
    url: urls.baseUrl + urls.api.chapters + "?action=chapters",
    method: HttpMethod.GET,
  });
}

export async function updateChapter() {
  return internalRequest<Chapter>({
    url: urls.baseUrl + urls.api.chapters + "?action=update",
    method: HttpMethod.PATCH,
  });
}
