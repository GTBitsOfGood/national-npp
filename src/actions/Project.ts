import { internalRequest } from "src/utils/requests";
import {
  ChapterProjectUpdate,
  HttpMethod,
  NonprofitProjectUpdate,
  Project,
  ProjectCreate,
} from "src/utils/types";
import urls from "src/utils/urls";

const projectAPI = urls.baseUrl + urls.api.projects;

export async function createProject(projectCreate: ProjectCreate) {
  return internalRequest<Project>({
    url: projectAPI,
    method: HttpMethod.POST,
    body: {
      projectCreate,
    },
  });
}

export async function getChapterProjects() {
  return internalRequest<Array<Project>>({
    url: projectAPI + "?action=chapter",
    method: HttpMethod.GET,
  });
}

export async function getChapterProject(projectId: string) {
  return internalRequest<Project>({
    url: projectAPI + `/${projectId}` + "?action=chapter",
    method: HttpMethod.GET,
  });
}

export async function getNonprofitProjects(active?: boolean) {
  return internalRequest<Project>({
    url: projectAPI,
    queryParams: {
      action: "nonprofit",
      active,
    },
    method: HttpMethod.GET,
  });
}

export async function updateChapterProject(
  projectId: string,
  projectUpdate: ChapterProjectUpdate
) {
  return internalRequest<Project>({
    url: projectAPI + `/${projectId}` + "?action=chapter",
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
    url: projectAPI + "?action=nonprofit",
    method: HttpMethod.PATCH,
    body: {
      projectUpdate,
    },
  });
}
