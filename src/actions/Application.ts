import { internalRequest } from "src/utils/requests";
import {
  HttpMethod,
  Application,
  NonprofitCreateApplication,
} from "src/utils/types";
import urls from "src/utils/urls";

const applicationAPI = urls.baseUrl + urls.api.applications;

export async function nonprofitCreateApplication(
  projectId: string,
  applicationCreate: NonprofitCreateApplication
) {
  return internalRequest<Application>({
    url: applicationAPI + "/nonprofit",
    method: HttpMethod.POST,
    body: {
      projectId,
      applicationCreate,
    },
  });
}

export async function chapterGetApplication(projectId: string) {
  return internalRequest<Application>({
    url: applicationAPI + `/${projectId}/chapter`,
    method: HttpMethod.GET,
  });
}
