import { internalRequest } from "src/utils/requests";
import {
  Nonprofit,
  HttpMethod,
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
