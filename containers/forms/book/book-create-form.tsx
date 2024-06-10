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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookCreate } from "@/app/actions/books.actions";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  subject: z.string(),
  language: z.string(),
  page_count: z.string(),
  author_id: z.string(),
  publisher_id: z.string(),
});

type KeyValueObject = { [key: string]: string };

export type CreateBookFromSchema = z.infer<typeof formSchema>;

export default function BookCreateForm({
  authors,
  publishers,
}: {
  authors: KeyValueObject;
  publishers: KeyValueObject;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      language: "",
    },
  });

  async function onSubmit(values: CreateBookFromSchema) {
    try {
      const book = await bookCreate(values);
      redirect(`/books/${book.id}`);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Book Name"
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
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="Book Subject"
                  {...field}
                  disabled={
                    form.formState.isLoading || form.formState.isSubmitting
                  }
                />
              </FormControl>
              <FormDescription>
                Please write something about the subject of the book.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Language</FormLabel>
              <FormControl>
                <Input
                  placeholder="Book Language"
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
        <FormField
          control={form.control}
          name="page_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Page Count</FormLabel>
              <FormControl>
                <Input
                  placeholder="Page Count"
                  type={"number"}
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
        <FormField
          control={form.control}
          name="author_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  disabled={
                    form.formState.isLoading || form.formState.isSubmitting
                  }
                  onValueChange={(value) =>
                    field.onChange({
                      target: {
                        value,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select author" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(authors).map((id) => (
                      <SelectItem key={id} value={id}>
                        {authors[id]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="publisher_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publisher</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  disabled={
                    form.formState.isLoading || form.formState.isSubmitting
                  }
                  onValueChange={(value) =>
                    field.onChange({
                      target: {
                        value,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select publisher" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(publishers).map((id: string) => (
                      <SelectItem key={id} value={id}>
                        {publishers[id]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isLoading || form.formState.isSubmitting}
        >
          Create
        </Button>
      </form>
    </Form>
  );
}
