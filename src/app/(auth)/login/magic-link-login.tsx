"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { signInWithEmail } from "./actions";
import { Button } from "@/components/ui/button";

const MagicLinkLoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function MagicLinkLoginForm() {
  const [submitError, setSubmitError] = useState("");

  const form = useForm<z.infer<typeof MagicLinkLoginFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(MagicLinkLoginFormSchema),
    defaultValues: { email: "" },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<
    z.infer<typeof MagicLinkLoginFormSchema>
  > = async (formData) => {
    const response = await signInWithEmail(formData.email.trim());
    if (response.error) {
      form.reset();
      setSubmitError(response.error.code);
    }
  };
  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className="text-4xl">Login</h2>
        <p className="mt-7">With magic email link:</p>
        <div className="grid w-full max-w-sm items-center gap-2 mt-5">
          <Label htmlFor="email">Email</Label>
          <FormField
            control={form.control}
            disabled={isLoading}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    autoFocus
                    required
                    type="email"
                    className={`bg-gray6 rounded-none border-0 border-b-4 ${
                      form.formState.errors.email
                        ? "border-red-600"
                        : field.value === ""
                        ? "border-blue-600"
                        : "border-green-600"
                    }
                     border-blue-600 font-sans focus:ring-none focus:outline-none p-2 w-[300px]`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {submitError && <FormMessage>{submitError}</FormMessage>}

          <Button
            className="mt-1 w-fit bg-green-500 hover:bg-green-600 text-gray-100 p-2 cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            send
          </Button>
        </div>
      </form>
    </Form>
  );
}
