import { internalRequest } from "src/utils/requests";
import {
  ChapterProjectUpdate,
  HttpMethod,
  NonprofitProjectUpdate,
  Project,
  ProjectCreate,
} from "src/utils/types";
import urls from "src/utils/urls";

export async function createProject(projectCreate: ProjectCreate) {
  return internalRequest<Project>({
    url: urls.baseUrl + urls.api.projects,
    method: HttpMethod.POST,
    body: {
      projectCreate,
    },
  });
}

export async function getChapterProjects() {
  return internalRequest<Array<Project>>({
    url: urls.baseUrl + urls.api.projects + "?action=chapter",
    method: HttpMethod.GET,
  });
}

export async function getChapterProject(projectId: string) {
  return internalRequest<Project>({
    url: urls.baseUrl + urls.api.projects + `/${projectId}` + "?action=chapter",
    method: HttpMethod.GET,
  });
}

export async function getNonprofitProject() {
  return internalRequest<Project>({
    url: urls.baseUrl + urls.api.projects + "?action=nonprofit",
    method: HttpMethod.GET,
  });
}

export async function updateChapterProject(
  projectId: string,
  projectUpdate: ChapterProjectUpdate
) {
  return internalRequest<Project>({
    url: urls.baseUrl + urls.api.projects + `/${projectId}` + "?action=chapter",
    method: HttpMethod.PATCH,
    body: {
      projectUpdate,
    },
  });
}

export async function updateNonprofitProject(
  projectUpdate: NonprofitProjectUpdate
) {
  return internalRequest<Project>({
    url: urls.baseUrl + urls.api.projects + "?action=nonprofit",
    method: HttpMethod.PATCH,
    body: {
      projectUpdate,
    },
  });
}
