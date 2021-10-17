import { internalRequest } from "src/utils/requests";
import {
  HttpMethod,
  Application,
  NonprofitApplicationCreate,
} from "src/utils/types";
import urls from "src/utils/urls";

const applicationAPI = urls.baseUrl + urls.api.applications;

export async function createNonprofitApplication(
  applicationCreate: NonprofitApplicationCreate
) {
  return internalRequest<Application>({
    url: applicationAPI + "/application",
    method: HttpMethod.POST,
    body: {
      applicationCreate,
    },
  });
}

export async function getApplication(projectId: string) {
  return internalRequest<Application>({
    url: applicationAPI + "/application",
    queryParams: {
      projectId,
    },
    method: HttpMethod.GET,
  });
}
