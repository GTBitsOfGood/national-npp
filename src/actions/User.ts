import { internalRequest } from "src/utils/requests";
import {
  User,
  HttpMethod,
  UserUpdate,
  ChapterUpdate,
  NonprofitUpdate,
} from "src/utils/types";
import urls from "src/utils/urls";

const userAPI = urls.baseUrl + urls.api.users;

export async function getUserProfile() {
  return internalRequest<User>({
    url: userAPI + "?action=profile",
    method: HttpMethod.GET,
  });
}

export async function getChapterUsers() {
  return internalRequest<User[]>({
    url: userAPI + "?action=users",
    method: HttpMethod.GET,
  });
}

export async function updateUserProfile(
  userUpdate: UserUpdate,
  chapterUpdate?: ChapterUpdate,
  nonprofitUpdate?: NonprofitUpdate
) {
  return internalRequest<User>({
    url: userAPI + "?action=profile",
    method: HttpMethod.PATCH,
    body: {
      userUpdate,
      chapterUpdate,
      nonprofitUpdate,
    },
  });
}
