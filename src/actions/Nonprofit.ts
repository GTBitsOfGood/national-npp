import { internalRequest } from "src/utils/requests";
import { Nonprofit, HttpMethod } from "src/utils/types";
import urls from "src/utils/urls";

export async function createNonprofit() {
  return internalRequest<Nonprofit>({
    url: urls.baseUrl + urls.api.nonprofits + "?action=create",
    method: HttpMethod.POST,
  });
}

export async function updateNonprofit() {
  return internalRequest({
    url: urls.baseUrl + urls.api.nonprofits + "?action=update",
    method: HttpMethod.PATCH,
  });
}
