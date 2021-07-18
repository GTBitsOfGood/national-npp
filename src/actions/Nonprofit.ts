import { internalRequest } from "src/utils/requests";
import { Nonprofit, HttpMethod, NonprofitCreate } from "src/utils/types";
import urls from "src/utils/urls";

export async function createNonprofit(nonprofitCreate: NonprofitCreate) {
  return internalRequest<Nonprofit>({
    url: urls.baseUrl + urls.api.nonprofits,
    method: HttpMethod.POST,
    body: {
      nonprofitCreate,
    },
  });
}
