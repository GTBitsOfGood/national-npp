import { internalRequest } from "src/utils/requests";
import { HttpMethod, NonprofitCreateIssue, Issue } from "src/utils/types";
import urls from "src/utils/urls";

const issueAPI = urls.baseUrl + urls.api.projects;

export async function nonprofitCreateIssue(
  projectId: string,
  issueCreate: NonprofitCreateIssue
) {
  return internalRequest<Issue>({
    url: issueAPI + `/${projectId}/issues/nonprofit`,
    method: HttpMethod.POST,
    body: {
      issueCreate,
    },
  });
}
