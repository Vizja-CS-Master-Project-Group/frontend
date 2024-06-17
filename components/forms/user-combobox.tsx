import { UserInterface } from "@/types/user";
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

/**
 * No time for lazy combobox :)
 */
export default function UserCombobox({
  name,
  disabled,
  value,
  onChange,
  users,
}: {
  users: UserInterface[];
  name: string;
  disabled?: boolean;
  value: number;
  onChange: (value?: number) => void;
}) {
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState<number>();

  const userValue = (user: UserInterface) => `${user.id}||${user.full_name}`;

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
            ? users.find((user) => user.id === value)?.full_name
            : "Select user..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={"start"} className="p-0 w-[500px]">
        <Command>
          <CommandInput placeholder="Search user..." />
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {users &&
                users.length > 0 &&
                users.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={userValue(user)}
                    onSelect={(currentValue) => {
                      onChange(user.id === value ? undefined : user.id);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === user.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <div>
                      <div>{user.name}</div>
                      <div className={"text-xs"}>{user.email}</div>
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
