import { internalRequest } from "src/utils/requests";
import { User, HttpMethod } from "src/utils/types";
import urls from "src/utils/urls";

export async function getChapterUserProfile() {
  return internalRequest<User>({
    url: urls.baseUrl + urls.api.users + "?action=chapter",
    method: HttpMethod.GET,
  });
}

export async function getNonprofitUserProfile() {
  return internalRequest<User>({
    url: urls.baseUrl + urls.api.users + "?action=nonprofit",
    method: HttpMethod.GET,
  });
}

export async function updateUserProfile() {
  return internalRequest({
    url: urls.baseUrl + urls.api.nonprofits + "?action=update",
    method: HttpMethod.PATCH,
  });
}
