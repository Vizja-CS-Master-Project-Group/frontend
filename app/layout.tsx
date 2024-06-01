import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { cn } from "@/lib/utils";
import AuthLayout from "@/containers/layouts/AuthLayout";
import GuestLayout from "@/containers/layouts/GuestLayout";
import getSession from "@/lib/getSession";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "The Library",
  description: "Library Management System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers session={session}>
          {session ? (
            <AuthLayout session={session}>{children}</AuthLayout>
          ) : (
            <GuestLayout>{children}</GuestLayout>
          )}
        </Providers>
      </body>
    </html>
  );
}
