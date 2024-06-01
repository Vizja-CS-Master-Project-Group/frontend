"use client";

import NavigationItem from "@/components/navigation/navigation-item";
import Navigation from "@/components/navigation/navigation";
import { authNavigation } from "@/lib/navigation";
import { Session } from "next-auth";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function AuthNavigation({
  session,
  mobile = false,
  children,
}: {
  mobile?: boolean;
  session: Session;
  children?: ReactNode;
}) {
  const path = usePathname();
  const navigation = authNavigation(session.user.role);

  return (
    <Navigation mobile={mobile}>
      {children}
      {navigation.map((nav, i) => (
        <NavigationItem
          key={`nav-${i}`}
          label={nav.label}
          href={nav.href}
          icon={nav.icon}
          mobile={mobile}
          active={nav.isActive(path)}
        />
      ))}
    </Navigation>
  );
}
