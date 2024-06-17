import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { BookInterface } from "@/types/book";

/**
 * No time for lazy combobox :)
 */
export default function BookCombobox({
  name,
  disabled,
  value,
  onChange,
  books,
}: {
  books: BookInterface[];
  name: string;
  disabled?: boolean;
  value: number;
  onChange: (value?: number) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const bookValue = (book: BookInterface) =>
    `${book.name} ${book.author.name} ${book.author.lastname} ${book.language} ${book.isbn}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          name={name}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
          disabled={disabled}
        >
          {value
            ? books.find((book) => book.id === value)?.name
            : "Select book..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={"start"} className="p-0 w-[500px]">
        <Command>
          <CommandInput placeholder="Search book..." />
          <CommandEmpty>No book found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {books &&
                books.length > 0 &&
                books.map((book) => (
                  <CommandItem
                    key={book.id}
                    value={bookValue(book)}
                    onSelect={(currentValue) => {
                      onChange(book.id === value ? undefined : book.id);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === book.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <div>
                      <div>{book.name}</div>
                      <div className={"text-xs"}>
                        by {book.author.name} {book.author.lastname} in{" "}
                        {book.language} ({book.isbn})
                      </div>
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
