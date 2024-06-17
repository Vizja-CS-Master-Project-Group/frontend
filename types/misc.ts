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
    links: ViewResourceLinkInterface[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface DeleteResponseInterface {
  data: {
    variant: "success" | "error";
    message: string;
  };
}

export type ViewResourceLinkInterface = {
  url: string | null;
  label: string;
  active: boolean;
};

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];
