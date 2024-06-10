import { UserRole } from "@/types/user";
import { Book, Home } from "lucide-react";

export type NavigationType = {
  label: string;
  href: string;
  isActive: (path: string) => boolean;
  icon: any;
};

const navigation: { user: NavigationType[]; librarian: NavigationType[] } = {
  user: [
    {
      label: "Dashboard",
      href: "/",
      isActive: (path) => path === "/",
      icon: Home,
    },
    {
      label: "Books",
      href: "/books",
      isActive: (path) => path.startsWith("/books"),
      icon: Book,
    },
  ],
  librarian: [
    {
      label: "Dashboard",
      href: "/",
      isActive: (path) => path === "/",
      icon: Home,
    },
    {
      label: "Books",
      href: "/books",
      isActive: (path) => path.startsWith("/books"),
      icon: Book,
    },
  ],
};

export function authNavigation(role: UserRole): NavigationType[] {
  return navigation[role];
}

export default navigation;
