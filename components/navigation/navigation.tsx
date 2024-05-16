import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Navigation({
  children,
  mobile = false,
}: {
  children: ReactNode;
  mobile?: boolean;
}) {
  return (
    <nav
      className={cn("grid font-medium", {
        "items-start px-2 text-sm lg:px-4": !mobile,
        "gap-2 text-lg": mobile,
      })}
    >
      {children}
    </nav>
  );
}
