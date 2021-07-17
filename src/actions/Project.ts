import { internalRequest } from "src/utils/requests";
import { HttpMethod, Project } from "src/utils/types";
import urls from "src/utils/urls";

export async function createProject() {
  return internalRequest<Project>({
    url: urls.baseUrl + urls.api.projects + "?action=create",
    method: HttpMethod.POST,
  });
}

export async function getChapterProjects() {
  return internalRequest<Array<Project>>({
    url: urls.baseUrl + urls.api.projects + "?action=chapter",
    method: HttpMethod.GET,
  });
}

export async function getNonprofitProject() {
  return internalRequest<Project>({
    url: urls.baseUrl + urls.api.projects + "?action=nonprofit",
    method: HttpMethod.GET,
  });
}
