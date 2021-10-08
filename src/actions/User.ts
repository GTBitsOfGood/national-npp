import { internalRequest } from "src/utils/requests";
import { User, HttpMethod, UserUpdate } from "src/utils/types";
import urls from "src/utils/urls";

const userAPI = urls.baseUrl + urls.api.users;

export async function getNonprofitUser() {
  return internalRequest<User>({
    url: userAPI + `/personal/nonprofit`,
    method: HttpMethod.GET,
  });
}

export async function getChapterUser() {
  return internalRequest<User>({
    url: userAPI + `/personal/chapter`,
    method: HttpMethod.GET,
  });
}

export async function getChapterUsers() {
  return internalRequest<User[]>({
    url: userAPI + "/chapter",
    method: HttpMethod.GET,
  });
}

export async function getNonprofitUsers() {
  return internalRequest<User[]>({
    url: userAPI + "/nonprofit",
    method: HttpMethod.GET,
  });
}

export function updateNonprofitUser(userUpdate: UserUpdate) {
  return internalRequest<User>({
    url: userAPI + `/personal/nonprofit`,
    method: HttpMethod.PATCH,
    body: {
      userUpdate,
    },
  });
}

export function updateChapterUser(userUpdate: UserUpdate) {
  return internalRequest<User>({
    url: userAPI + `/personal/chapter`,
    method: HttpMethod.PATCH,
    body: {
      userUpdate,
    },
  });
}
