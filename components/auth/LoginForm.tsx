"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";
import React from "react";

type TRegisterForm = {
  email: string;
  password: string;
};

const schema: ZodType<TRegisterForm> = z.object({
  email: z.string().email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const LoginForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [err, setErr] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TRegisterForm>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (data: TRegisterForm) => {
    setErr(false);
    setToast(false);
    setLoading(true);

    const onLogin = () => {
      reset();
    };

    const onFailed = () => {
      setErr(true);
      setToast(true);
    };

    // TODO: redirect will be handle it by next-auth
    return signIn("credentials", {
      redirect: true,
      callbackUrl: "/",
      ...data,
    })
      .then(onLogin)
      .catch(onFailed)
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="email@address.com"
          required
          disabled={loading}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">
            {errors.email?.message ?? "Please check your email address"}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            Forgot your password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          required
          disabled={loading}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {errors.password?.message ?? "Please check your password"}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Login
      </Button>
      <Button variant="outline" type="button" className="w-full flex" disabled>
        <Badge variant="outline">Coming Soon</Badge>
        <div className={"flex-1 text-left px-2"}>Login with vizja.pl</div>
      </Button>
    </form>
  );
};

export default LoginForm;
