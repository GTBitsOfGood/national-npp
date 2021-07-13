import { Types } from "mongoose";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import MongoDBAdapter from "server/auth/MongoDBAdapter";
import { SessionUser } from "src/utils/types";

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
    }),
  ],
  adapter: MongoDBAdapter(),
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async session(session, user) {
      const sessionUser = {
        id: user._id,
        email: user.email,
        name: user.name,
        image: user.image,
        roles: user.roles,
      } as SessionUser;

      if (user.chapter) {
        sessionUser.chapter = user.chapter as Types.ObjectId;
      } else if (user.nonprofit) {
        sessionUser.nonprofit = user.nonprofit as Types.ObjectId;
      }

      session.user = sessionUser;
      return session;
    },
  },
});
