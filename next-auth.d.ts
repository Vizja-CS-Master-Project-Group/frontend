import type { JWT, Session, User } from "next-auth/next";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: "librarian" | "user";
      accessToken: string;
    } & Session["user"];
  }
  interface User {
    access_token: string;
  }
  interface JWT {
    access_token: string;
    user: {};
  }
}
