"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forgotPassword } from "@/app/actions/auth.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string(),
});

export type ForgotPasswordFromSchema = z.infer<typeof formSchema>;

export default function ForgotPasswordForm() {
  const [success, setSuccess] = React.useState<boolean>(false);
  const form = useForm<ForgotPasswordFromSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFromSchema) {
    setSuccess(false);
    return forgotPassword(values);
  }

  return (
    <Form {...form}>
      {success && (
        <div className={"bg-green-100 border border-green-300 p-4 rounded"}>
          Your new password has been sent to your email address.
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  disabled={
                    form.formState.isLoading || form.formState.isSubmitting
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isLoading || form.formState.isSubmitting}
        >
          Reset Password
        </Button>
      </form>
    </Form>
  );
}
