import { internalRequest } from "src/utils/requests";
import { HttpMethod, Issue, NonprofitUpdateIssue } from "src/utils/types";
import urls from "src/utils/urls";

const projectAPI = urls.baseUrl + urls.api.projects;

export async function nonprofitGetIssue(issueId: string, projectId: string) {
  return internalRequest<Issue>({
    url: projectAPI + `/${projectId}/issues/${issueId}/nonprofit`,
    method: HttpMethod.GET,
  });
}

export async function nonprofitUpdateIssue(
  issueId: string,
  projectId: string,
  issueUpdate: NonprofitUpdateIssue
) {
  return internalRequest<Issue>({
    url: projectAPI + `/${projectId}/issues/${issueId}/nonprofit`,
    method: HttpMethod.PATCH,
    body: {
      issueUpdate,
    },
  });
}
