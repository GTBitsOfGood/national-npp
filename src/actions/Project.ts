import { internalRequest } from "src/utils/requests";
import {
  ChapterProjectUpdate,
  HttpMethod,
  NonprofitProjectUpdate,
  Project,
  NonprofitProjectCreate,
} from "src/utils/types";
import urls from "src/utils/urls";

const projectAPI = urls.baseUrl + urls.api.projects;

export async function createNonprofitProject(
  projectCreate: NonprofitProjectCreate
) {
  return internalRequest<Project>({
    url: projectAPI + "/nonprofit",
    method: HttpMethod.POST,
    body: {
      projectCreate,
    },
  });
}

export async function getChapterProjects() {
  return internalRequest<Array<Project>>({
    url: projectAPI + "/chapter",
    method: HttpMethod.GET,
  });
}

export async function getChapterProject(projectId: string) {
  return internalRequest<Project>({
    url: projectAPI + `/${projectId}/chapter`,
    method: HttpMethod.GET,
  });
}

export async function getNonprofitProjects(active?: boolean) {
  return internalRequest<Project>({
    url: projectAPI + "/nonprofit",
    queryParams: {
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
    url: projectAPI + `/${projectId}/chapter`,
    method: HttpMethod.PATCH,
    body: {
      projectUpdate,
    },
  });
}

export async function updateNonprofitProject(
  projectId: string,
  projectUpdate: NonprofitProjectUpdate
) {
  return internalRequest<Project>({
    url: projectAPI + `/${projectId}/nonprofit`,
    method: HttpMethod.PATCH,
    body: {
      projectUpdate,
    },
  });
}
