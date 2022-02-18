import { ChapterRemovalEmail } from "emails/templates/chapter-removal/ChapterRemovalEmail";
import { Types } from "mongoose";
import {
  adminDeleteChapter,
  adminGetChapter,
} from "server/mongodb/actions/Chapter";
import APIWrapper from "server/utils/APIWrapper";
import { sendEmail } from "server/utils/email";
import { Role, User } from "src/utils/types";

export default APIWrapper({
  DELETE: {
    config: {
      requireSession: true,
      roles: [Role.NATIONAL_ADMIN],
    },
    handler: async (req) => {
      const reason = req.body.reason as string;

      if (!reason) {
        throw new Error("Must specify a reason");
      }

      const chapterId = Types.ObjectId(req.query.id as string);
      const chapter = await adminGetChapter(chapterId);
      if (!chapter) {
        throw new Error("Chapter does not exist");
      }

      await adminDeleteChapter({
        deletedDocumentId: chapterId,
        name: chapter.name,
        reason: reason,
      });

      const { name, email } = chapter.contact as User;
      void sendEmail(
        email,
        new ChapterRemovalEmail({
          name: name,
          chapterName: chapter.name,
          reason: reason,
        })
      );
    },
  },
});
