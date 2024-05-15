import Link from "next/link";
import { getServerSession } from "next-auth";
import LoginForm from "@/components/auth/LoginForm";
import AuthLayout from "@/components/auth/AuthLayout";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();

  if (session) {
    redirect("/forgot-password");
  }

  return (
    <AuthLayout>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <LoginForm />
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="#" className="underline">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
}