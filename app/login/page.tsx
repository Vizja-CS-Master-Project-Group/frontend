import Link from "next/link";
import LoginForm from "@/containers/forms/auth/LoginForm";

export default async function Page() {
  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <LoginForm />
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account? Visit our library. User can only be
        registered by our library staff.
      </div>
    </>
  );
}
