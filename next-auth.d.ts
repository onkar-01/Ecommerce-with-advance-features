import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: "Admin" | "User";
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    role: "Admin" | "User";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "User";
  }
}
