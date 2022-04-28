import { Types } from "mongoose";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import nodemailer from "nodemailer";
import MongoDBAdapter from "server/auth/MongoDBAdapter";
import { SessionUser } from "src/utils/types";

function html({ url, email }: Record<"url" | "email", string>) {
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;

  const backgroundColor = "#E6F7FF";
  const textColor = "#444444";
  const mainBackgroundColor = "#ffffff";
  const buttonBackgroundColor = "#0069CA";
  const buttonBorderColor = "#346df1";
  const buttonTextColor = "#ffffff";

  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>Sign In Confirmation</sttong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        Click the button below to sign in to Hack4Impact Nonprofit Portal as <strong>${escapedEmail}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Sign in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        
      </td>
    </tr>
  </table>
</body>
`;
}

function text({ url }: Record<"url", string>) {
  return `Sign in to Hack4Impact Nonprofit Portal\n${url}\n\n`;
}

export default NextAuth({
  debug: false,
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST as string,
        port: parseInt(process.env.EMAIL_SERVER_PORT as string),
        auth: {
          user: process.env.EMAIL_SERVER_USER as string,
          pass: process.env.EMAIL_SERVER_PASSWORD as string,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const transport = nodemailer.createTransport(server);
        await transport.sendMail({
          to: email,
          from,
          subject: `Sign in to Hack4Impact Nonprofit Portal`,
          text: text({ url }),
          html: html({ url, email }),
        });
      },
    }),
  ],
  adapter: MongoDBAdapter(),
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async session(session, user) {
      const sessionUser = {
        id: Types.ObjectId(user._id as string),
        email: user.email,
        name: user.name,
        image: user.image,
        roles: user.roles,
      } as SessionUser;

      if (user.chapter) {
        sessionUser.chapter = Types.ObjectId(user.chapter as string);
      } else if (user.nonprofit) {
        sessionUser.nonprofit = Types.ObjectId(user.nonprofit as string);
      }

      session.user = sessionUser;
      return session;
    },
  },
});
