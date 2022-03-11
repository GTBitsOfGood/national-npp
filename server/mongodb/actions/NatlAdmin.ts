import ChapterModel from "server/mongodb/models/Chapter";
import NonprofitModel from "server/mongodb/models/Nonprofit";
import UserModel from "server/mongodb/models/User";
import dbConnect from "server/utils/dbConnect";
import { User } from "src/utils/types";

export async function natlAdminGetNonprofits() {
  await dbConnect();

  return NonprofitModel.find().populate({
    path: "contact",
    model: UserModel
  });
}

export async function natlAdminGetChapters() {
  await dbConnect();

  return ChapterModel.find().populate({
    path: "contact",
    model: UserModel
  });
}

export async function natlAdminGetChapterContacts() {
  await dbConnect();

  const query = await ChapterModel.find({}, { contact: 1, _id: 0 });
  const users: User[] = [];

  for (const document of query) {
    const user = (await UserModel.findOne(document.contact)) as User;
    users.push(user);
  }

  return users;
}
