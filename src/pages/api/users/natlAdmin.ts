import { NatlAdminEmailPOC } from "emails/templates/natl-admin-poc/NatlAdminEmailPOC";
import { natlAdminGetChapterContacts } from "server/mongodb/actions/NatlAdmin";
import APIWrapper from "server/utils/APIWrapper";
import { sendEmail } from "server/utils/email";
import { User, Role } from "src/utils/types";

export default APIWrapper({
  GET: {
    config: {
      requireSession: true,
      roles: [Role.NATIONAL_ADMIN],
    },
    handler: async (req) => {
      const contacts: User[] = await natlAdminGetChapterContacts();

      if (!contacts) {
        throw new Error("Failed to retrieve contacts.");
      }

      return contacts;
    },
  },
  POST: {
    config: {
      requireSession: true,
      roles: [Role.NATIONAL_ADMIN],
    }, handler: async (req) => {
      const contacts: User[] = await natlAdminGetChapterContacts();
      if (!contacts) {
        throw new Error("Failed to retrieve contacts. Unable to send the email.");
      }

      const emails = contacts.map((contact) => contact.email);
      const names = contacts.map((contact) => contact.name);
      const emailsSent: string[] = [];
      // Send Emails to All Contacts -- is there a cleaner way to do this?
      for (let index = 0; index < emails.length; index++) {
        // Handles duplicate emails to avoid spam
        if (emailsSent.includes(emails[index])) {
          continue;
        }

        void sendEmail(
          emails[index],
          new NatlAdminEmailPOC({
            name: names[index],
            content: req.body.content as string,
            subject: req.body.subject as string
          }));
      }
    }
  }
});
