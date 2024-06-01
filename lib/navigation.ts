import { UserRole } from "@/types/user";

export type NavigationType = {
  label: string;
  href: string;
  isActive: (path: string) => boolean;
};

const navigation: { user: NavigationType[]; librarian: NavigationType[] } = {
  user: [
    {
      label: "Dashboard",
      href: "/",
      isActive: (path) => path === "/",
    },
    {
      label: "Books",
      href: "/books",
      isActive: (path) => path === "/books",
    },
  ],
  librarian: [],
};

export function authNavigation(role: UserRole): NavigationType[] {
  return navigation[role];
}

export default navigation;
