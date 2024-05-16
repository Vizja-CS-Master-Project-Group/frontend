import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function NavigationItem({
  href,
  label,
  icon,
  badge = 0,
  active = false,
  mobile = false,
}: {
  href: string;
  label: string;
  icon?: LucideIcon;
  badge?: number;
  active?: boolean;
  mobile?: boolean;
}) {
  const Icon = icon;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-3 py-2 transition-all hover:text-primary",
        {
          "gap-3 rounded-lg": !mobile,
          "gap-4 rounded-xl mx-[-0.65rem]": mobile,
          "bg-muted text-primary": active,
          "text-muted-foreground": !active,
        },
      )}
    >
      {Icon && (
        <Icon
          className={cn("h-4 w-4", {
            "h-5 w-5": mobile,
          })}
        />
      )}
      <span>{label}</span>
      {badge > 0 && (
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          {badge}
        </Badge>
      )}
    </Link>
  );
}
