import type { JWT, Session, User } from "next-auth/next";
import { UserRole } from "@/types/user";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      access_token: string;
    } & Session["user"];
  }
  interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    access_token: string;
  }
  interface JWT {
    access_token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
    };
  }
}
