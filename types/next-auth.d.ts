import "next-auth";
import { SessionUser, User as AppUser } from "src/utils/types";

declare module "next-auth" {
  interface Session {
    user: SessionUser;
    accessToken?: string;
    expires: Date;
  }

  // Second parameter of session callback
  interface User extends AppUser {}
}
