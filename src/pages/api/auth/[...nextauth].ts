import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import MongoDBAdapter from "server/auth/MongoDBAdapter";

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
  pages: {
    signIn: "/login",
    verifyRequest: "/verify",
  },
});
