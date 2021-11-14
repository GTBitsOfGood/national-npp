import { internalRequest } from "src/utils/requests";
import { HttpMethod, Issue, NonprofitGetIssues } from "src/utils/types";
import urls from "src/utils/urls";

const projectAPI = urls.baseUrl + urls.api.projects;

export async function nonprofitGetIssues(
  projectId: string,
  issuesGet: NonprofitGetIssues
) {
  return internalRequest<Issue[]>({
    url: projectAPI + `/${projectId}/issues/nonprofit`,
    queryParams: {
      ...issuesGet,
    },
    method: HttpMethod.GET,
  });
}
