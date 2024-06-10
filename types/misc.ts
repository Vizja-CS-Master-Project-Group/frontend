export interface ViewInterface<T> {
  data: T;
}

export interface ViewResourceInterface<T> extends ViewInterface<T[]> {
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: ViewResourceLinkType[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export type ViewResourceLinkType = {
  url: string | null;
  label: string;
  active: boolean;
};
