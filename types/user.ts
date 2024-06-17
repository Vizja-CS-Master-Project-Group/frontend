export type UserRole = "librarian" | "user";

export interface UserInterface {
  id: number;
  name: string;
  lastname: string;
  full_name: string;
  email: string;
  role: UserRole;
  registered_at: string;
}

export interface UserSchemaInterface {
  roles: UserRole[];
}
