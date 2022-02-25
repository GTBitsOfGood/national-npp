import { internalRequest } from "src/utils/requests";
import {
  HttpMethod,
  Application,
  NonprofitCreateApplication,
  ProjectStage,
} from "src/utils/types";
import urls from "src/utils/urls";

const applicationApi = `${urls.baseUrl}${urls.api.applications}`;

export async function nonprofitCreateApplication(
  projectId: string,
  applicationCreate: NonprofitCreateApplication
) {
  return internalRequest<Application>({
    url: `${applicationApi}/nonprofit`,
    method: HttpMethod.POST,
    body: {
      projectId,
      applicationCreate,
    },
  });
}

export async function chapterGetApplication(projectId: string) {
  return internalRequest<Application>({
    url: `${applicationApi}/${projectId}/chapter`,
    method: HttpMethod.GET,
  });
}

export async function natlAdminChangeApplicationStage(
  applicationId: string,
  stage: ProjectStage
) {
  return internalRequest<Application>({
    url: `${applicationApi}/${applicationId}/natlAdmin`, // TODO: maybe use a constant for the role?
    method: HttpMethod.PATCH,
    body: {
      stage,
    },
  });
}
