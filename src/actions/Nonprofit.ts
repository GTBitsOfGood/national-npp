import { internalRequest } from "src/utils/requests";
import { Nonprofit, HttpMethod, NonprofitCreate } from "src/utils/types";
import urls from "src/utils/urls";

const nonprofitAPI = urls.baseUrl + urls.api.nonprofits;

export async function createNonprofit(nonprofitCreate: NonprofitCreate) {
  return internalRequest<Nonprofit>({
    url: nonprofitAPI,
    method: HttpMethod.POST,
    body: {
      nonprofitCreate,
    },
  });
}
