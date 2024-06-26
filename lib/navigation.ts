import { UserRole } from "@/types/user";
import { Book, Home, Users, FileOutput, Settings } from "lucide-react";

export type NavigationType = {
  label: string;
  href: string;
  isActive: (path: string) => boolean;
  icon: any;
};

const navigation: { user: NavigationType[]; librarian: NavigationType[] } = {
  user: [
    {
      label: "Books",
      href: "/books",
      isActive: (path) => path.startsWith("/books"),
      icon: Book,
    },
    {
      label: "Loans",
      href: "/loans",
      isActive: (path) => path.startsWith("/loans"),
      icon: FileOutput,
    },
  ],
  librarian: [
    {
      label: "Books",
      href: "/books",
      isActive: (path) => path.startsWith("/books"),
      icon: Book,
    },
    {
      label: "Users",
      href: "/users",
      isActive: (path) => path.startsWith("/users"),
      icon: Users,
    },
    {
      label: "Loans",
      href: "/loans",
      isActive: (path) => path.startsWith("/loans"),
      icon: FileOutput,
    },
    {
      label: "Settings",
      href: "/settings",
      isActive: (path) => path.startsWith("/settings"),
      icon: Settings,
    },
  ],
};

export function authNavigation(role: UserRole): NavigationType[] {
  return navigation[role];
}

export default navigation;
