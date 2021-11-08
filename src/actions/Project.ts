import { internalRequest } from "src/utils/requests";
import {
  ChapterUpdateProject,
  HttpMethod,
  NonprofitUpdateProject,
  Project,
  NonprofitCreateProject,
  ChapterGetProjects,
  NonprofitGetProjects,
  ChapterGetProject,
  NonprofitGetProject,
} from "src/utils/types";
import urls from "src/utils/urls";

const projectAPI = urls.baseUrl + urls.api.projects;

export async function nonprofitCreateProject(
  projectCreate: NonprofitCreateProject
) {
  return internalRequest<Project>({
    url: projectAPI + "/nonprofit",
    method: HttpMethod.POST,
    body: {
      projectCreate,
    },
  });
}

export async function chapterGetProject(
  projectId: string,
  projectGet: ChapterGetProject
) {
  return internalRequest<Project>({
    url: projectAPI + `/${projectId}/chapter`,
    queryParams: {
      ...projectGet,
    },
    method: HttpMethod.GET,
  });
}

export async function nonprofitGetProject(
  projectId: string,
  projectGet: NonprofitGetProject
) {
  return internalRequest<Project>({
    url: projectAPI + `/${projectId}/nonprofit`,
    queryParams: {
      ...projectGet,
    },
    method: HttpMethod.GET,
  });
}

export async function chapterGetProjects(projectsGet: ChapterGetProjects) {
  return internalRequest<Array<Project>>({
    url: projectAPI + "/chapter",
    queryParams: {
      ...projectsGet,
    },
    method: HttpMethod.GET,
  });
}

export async function nonprofitGetProjects(projectsGet: NonprofitGetProjects) {
  return internalRequest<Array<Project>>({
    url: projectAPI + "/nonprofit",
    queryParams: {
      ...projectsGet,
    },
    method: HttpMethod.GET,
  });
}

export async function chapterUpdateProject(
  projectId: string,
  projectUpdate: ChapterUpdateProject
) {
  return internalRequest<Project>({
    url: projectAPI + `/${projectId}/chapter`,
    method: HttpMethod.PATCH,
    body: {
      projectUpdate,
    },
  });
}

export async function nonprofitUpdateProject(
  projectId: string,
  projectUpdate: NonprofitUpdateProject
) {
  return internalRequest<Project>({
    url: projectAPI + `/${projectId}/nonprofit`,
    method: HttpMethod.PATCH,
    body: {
      projectUpdate,
    },
  });
}
