import { Author } from "@/types/author";
import { CreateBookFromSchema } from "@/containers/forms/book/book-edit-form";

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
  schema: {
    authors: { [key: string]: string };
    publishers: { [key: string]: string };
  };
}

export interface BookEditSchemaInterface {
  data: CreateBookFromSchema;
  schema: {
    authors: { [key: string]: string };
    publishers: { [key: string]: string };
  };
}
