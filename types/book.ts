import { Author } from "@/types/author";

export interface BookInterface {
  id: number;
  name: string;
  language: string;
  subject: string;
  page_count: number;
  original: boolean;
  allow_loan: boolean;
  cover: string;
  author: Author;
}

export interface BookCreateSchemaInterface {
  authors: { [key: string]: string };
  publishers: { [key: string]: string };
}
