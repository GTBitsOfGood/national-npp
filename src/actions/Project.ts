import { internalRequest } from "src/utils/requests";
import { HttpMethod, Project } from "src/utils/types";
import urls from "src/utils/urls";

export async function getChapterProjects() {
  return internalRequest<Array<Project>>({
    url: urls.baseUrl + urls.api.projects + "?action=chapter",
    method: HttpMethod.GET,
  });
}

export async function getProjectById() {
  return internalRequest<Project>({
    url: urls.baseUrl + urls.api.projects + "?action=id",
    method: HttpMethod.GET,
  });
}
