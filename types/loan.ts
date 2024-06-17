import { UserInterface } from "@/types/user";
import { BookInterface } from "@/types/book";

export interface LoanInterface {
  id: string;
  user: UserInterface;
  book: BookInterface;
  barrow_at: string;
  returned_at: string;
  passed_days: number;
  fee: number | bigint;
}

export interface LoanCreateSchemaInterface {
  schema: {
    users: UserInterface[];
    books: BookInterface[];
  };
}

export interface LoanFinalizeSchemaInterface {
  data: LoanInterface;
  schema: {};
  meta: {
    late_days: number;
    late_fee: number | bigint;
  };
}
