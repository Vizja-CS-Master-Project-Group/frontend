import Link from "next/link";
import ForgotPasswordForm from "@/containers/forms/auth/forgot-password-form";

export default async function Page() {
  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to reset your password.
        </p>
      </div>
      <ForgotPasswordForm />
      <div className="mt-4 text-center text-sm">
        You didn&apos;t?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </div>
    </>
  );
}
