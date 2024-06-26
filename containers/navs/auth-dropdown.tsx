"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import Link from "next/link";

export default function AuthDropdown({ session }: { session: Session }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session.user.role === "librarian" && (
          <DropdownMenuItem asChild>
            <Link href={"/settings"}>Settings</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href={"mailto:suppport@vizja.com"}>Support</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
