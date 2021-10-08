import { internalRequest } from "src/utils/requests";
import { Chapter, ChapterUpdate, HttpMethod } from "src/utils/types";
import urls from "src/utils/urls";

const chapterAPI = urls.baseUrl + urls.api.chapters;

export async function updateChapter(
  chapterId: string,
  chapterUpdate: ChapterUpdate
) {
  return internalRequest<Chapter>({
    url: chapterAPI + `/${chapterId}/chapter`,
    method: HttpMethod.PATCH,
    body: {
      chapterUpdate,
    },
  });
}
