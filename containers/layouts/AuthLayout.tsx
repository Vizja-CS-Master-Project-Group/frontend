import type { ReactNode } from "react";
import Link from "next/link";
import { Bell, CircleUser, Home, Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Navigation from "@/components/navigation/navigation";
import NavigationItem from "@/components/navigation/navigation-item";
import ActiveEvent from "@/containers/events/active-event";
import { Session } from "next-auth";
import { authNavigation } from "@/lib/navigation";
import { headers } from "next/headers";
import { cn } from "@/lib/utils";

export default async function AuthLayout({
  title,
  children,
  session,
}: {
  title?: string;
  children: ReactNode;
  session: Session;
}) {
  const navigation = authNavigation(session.user.role);
  const headersList = headers();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">The Library</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <Navigation>
              {navigation.map((nav, i) => (
                <NavigationItem
                  key={`nav-${i}`}
                  label={nav.label}
                  href={nav.href}
                  icon={Home}
                  active
                />
              ))}
            </Navigation>
          </div>
          <div className="mt-auto p-4">
            <ActiveEvent />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <Navigation mobile>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">The Library</span>
                </Link>
                <NavigationItem
                  href={"/"}
                  label={"Dashboard"}
                  icon={Home}
                  mobile
                />
                <NavigationItem
                  href={"/"}
                  label={"Dashboard"}
                  icon={Home}
                  badge={2}
                  mobile
                />
              </Navigation>
              <div className="mt-auto">
                <ActiveEvent mobile />
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1">
          {title && (
            <div className="flex items-center gap-4 p-4 lg:gap-6 lg:p-6">
              <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
