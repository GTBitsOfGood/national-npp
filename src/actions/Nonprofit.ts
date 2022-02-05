import { internalRequest } from "src/utils/requests";
import {
  HttpMethod,
  Nonprofit,
  NonprofitCreateNonprofit,
  NonprofitUpdateNonprofit,
} from "src/utils/types";
import urls from "src/utils/urls";

const nonprofitAPI = urls.baseUrl + urls.api.nonprofits;

export async function nonprofitCreateNonprofit(
  nonprofitCreate: NonprofitCreateNonprofit
) {
  return internalRequest<Nonprofit>({
    url: nonprofitAPI + "/nonprofit",
    method: HttpMethod.POST,
    body: {
      nonprofitCreate,
    },
  });
}

export async function nonprofitUpdateNonprofit(
  nonprofitId: string,
  nonprofitUpdate: NonprofitUpdateNonprofit
) {
  return internalRequest<Nonprofit>({
    url: nonprofitAPI + `/${nonprofitId}/nonprofit`,
    method: HttpMethod.PATCH,
    body: {
      nonprofitUpdate,
    },
  });
}

export async function adminDeleteNonProfit(
  nonprofitId: string,
  reason: string
) {
  return internalRequest({
    url: nonprofitAPI + `${nonprofitId}/nonprofit`,
    method: HttpMethod.DELETE,
    body: {
      reason: reason,
    },
  });
}
