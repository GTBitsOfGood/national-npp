import { internalRequest } from "src/utils/requests";
import {
  User,
  HttpMethod,
  NonprofitUpdateUser,
  ChapterUpdateUser,
} from "src/utils/types";
import urls from "src/utils/urls";

const userAPI = urls.baseUrl + urls.api.users;

export async function nonprofitGetUser() {
  return internalRequest<User>({
    url: userAPI + `/personal/nonprofit`,
    method: HttpMethod.GET,
  });
}

export async function chapterGetUser() {
  return internalRequest<User>({
    url: userAPI + `/personal/chapter`,
    method: HttpMethod.GET,
  });
}

export async function chapterGetUsers() {
  return internalRequest<User[]>({
    url: userAPI + "/chapter",
    method: HttpMethod.GET,
  });
}

export async function nonprofitGetUsers() {
  return internalRequest<User[]>({
    url: userAPI + "/nonprofit",
    method: HttpMethod.GET,
  });
}

export function nonprofitUpdateUser(userUpdate: NonprofitUpdateUser) {
  return internalRequest<User>({
    url: userAPI + `/personal/nonprofit`,
    method: HttpMethod.PATCH,
    body: {
      userUpdate,
    },
  });
}

export function chapterUpdateUser(userUpdate: ChapterUpdateUser) {
  return internalRequest<User>({
    url: userAPI + `/personal/chapter`,
    method: HttpMethod.PATCH,
    body: {
      userUpdate,
    },
  });
}
