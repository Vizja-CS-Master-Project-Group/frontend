import Image from "next/image";
import { BookInterface } from "@/types/book";
import Link from "next/link";

export default function BookItem({ id, name, cover, language }: BookInterface) {
  return (
    <Link
      href={`/books/${id}`}
      className="relative block bg-slate-50 rounded-xl border border-gray-200 p-4"
    >
      <div className="group aspect-h-7 aspect-w-10 block mx-auto overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 w-[120px]">
        <Image
          src={cover}
          alt=""
          width={120}
          height={200}
          className="pointer-events-none object-cover group-hover:opacity-75 h-[200px] w-[120px]"
        />
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">Cover of {name}</span>
        </button>
      </div>
      <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
        {name}
      </p>
      <p className="pointer-events-none block text-sm font-medium text-gray-500">
        {language}
      </p>
    </Link>
  );
}
