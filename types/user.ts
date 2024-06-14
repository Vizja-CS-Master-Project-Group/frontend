export type UserRole = "librarian" | "user";

export interface UserInterface {
  id: string;
  name: string;
  lastname: string;
  full_name: string;
  email: string;
  role: UserRole;
}

export interface UserSchemaInterface {
  roles: UserRole[];
}
