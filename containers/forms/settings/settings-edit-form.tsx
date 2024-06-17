"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { settingsEdit } from "@/app/actions/setting.action";
import { SettingsInterface } from "@/types/settings";

const formSchema = z.object({
  late_fee: z.number(),
  max_days: z.string(),
});

export type EditSettingsFromSchema = z.infer<typeof formSchema>;

export default function SettingsEditForm({
  settings,
}: {
  settings: SettingsInterface;
}) {
  const router = useRouter();
  const form = useForm<EditSettingsFromSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: settings,
  });

  async function onSubmit(values: EditSettingsFromSchema) {
    return settingsEdit(values).then(() => {
      alert("Saved");
      return router.refresh();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="late_fee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Late Fee (€)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Late Fee (€)"
                  {...field}
                  disabled={
                    form.formState.isLoading || form.formState.isSubmitting
                  }
                />
              </FormControl>
              <FormDescription>...</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="max_days"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Barrow Day Limit</FormLabel>
              <FormControl>
                <Input
                  placeholder="Barrow Day Limit"
                  {...field}
                  disabled={
                    form.formState.isLoading || form.formState.isSubmitting
                  }
                />
              </FormControl>
              <FormDescription>...</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isLoading || form.formState.isSubmitting}
        >
          Update
        </Button>
      </form>
    </Form>
  );
}
