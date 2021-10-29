import { internalRequest } from "src/utils/requests";
import { Chapter, ChapterUpdateChapter, HttpMethod } from "src/utils/types";
import urls from "src/utils/urls";

const chapterAPI = urls.baseUrl + urls.api.chapters;

export async function chapterUpdateChapter(
  chapterId: string,
  chapterUpdate: ChapterUpdateChapter
) {
  return internalRequest<Chapter>({
    url: chapterAPI + `/${chapterId}/chapter`,
    method: HttpMethod.PATCH,
    body: {
      chapterUpdate,
    },
  });
}
