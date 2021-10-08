import { internalRequest } from "src/utils/requests";
import {
  Nonprofit,
  HttpMethod,
  NonprofitCreate,
  NonprofitUpdate,
} from "src/utils/types";
import urls from "src/utils/urls";

const nonprofitAPI = urls.baseUrl + urls.api.nonprofits;

export async function createNonprofit(nonprofitCreate: NonprofitCreate) {
  return internalRequest<Nonprofit>({
    url: nonprofitAPI + "/nonprofit",
    method: HttpMethod.POST,
    body: {
      nonprofitCreate,
    },
  });
}

export async function updateNonprofit(
  nonprofitId: string,
  nonprofitUpdate: NonprofitUpdate
) {
  return internalRequest<Nonprofit>({
    url: nonprofitAPI + `/${nonprofitId}/nonprofit`,
    method: HttpMethod.PATCH,
    body: {
      nonprofitUpdate,
    },
  });
}
