import { internalRequest } from "src/utils/requests";
import { HttpMethod, Application, NonprofitCreateIssue } from "src/utils/types";
import urls from "src/utils/urls";

const issueAPI = urls.baseUrl + urls.api.issues;

export async function nonprofitCreateIssue(
  projectId: string,
  issueCreate: NonprofitCreateIssue
) {
  return internalRequest<Application>({
    url: issueAPI + `/${projectId}`,
    method: HttpMethod.POST,
    body: {
      issueCreate,
    },
  });
}
