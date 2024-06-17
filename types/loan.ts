import { UserInterface } from "@/types/user";
import { BookInterface } from "@/types/book";

export interface LoanInterface {
  id: string;
  user: UserInterface;
  book: BookInterface;
  barrow_at: string;
  returned_at: string;
  total_fee: string;
}
