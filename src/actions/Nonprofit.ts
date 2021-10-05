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
    url: nonprofitAPI,
    method: HttpMethod.POST,
    body: {
      nonprofitCreate,
    },
  });
}

// Note: leaving these even though unused currently since API is going to be refactored a bit
export async function getNonprofit() {
  return internalRequest<Nonprofit>({
    url: nonprofitAPI + "?action=profile",
    method: HttpMethod.GET,
  });
}

export async function updateNonprofit(nonprofitUpdate: NonprofitUpdate) {
  return internalRequest<Nonprofit>({
    url: nonprofitAPI + "?action=profile",
    method: HttpMethod.PATCH,
    body: {
      nonprofitUpdate,
    },
  });
}
