import { internalRequest } from "src/utils/requests";
import {
  HttpMethod,
  Application,
  NonprofitApplicationCreate,
} from "src/utils/types";
import urls from "src/utils/urls";

const applicationAPI = urls.baseUrl + urls.api.applications;

export async function createNonprofitApplication(
  projectId: string,
  applicationCreate: NonprofitApplicationCreate
) {
  return internalRequest<Application>({
    url: applicationAPI,
    method: HttpMethod.POST,
    body: {
      projectId,
      applicationCreate,
    },
  });
}

export async function getApplication(projectId: string) {
  return internalRequest<Application>({
    url: applicationAPI + `/${projectId}`,
    method: HttpMethod.GET,
  });
}
