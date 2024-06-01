export type BookType = {
  id: number;
  name: string;
  language: string;
  subject: string;
  page_count: number;
  original: boolean;
  allow_loan: boolean;
  cover: string;
  author: Author;
};

export type Author = {
  id: number;
  name: string;
  lastname: string;
};
