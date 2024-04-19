"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CountryList } from "@/lib/country";
import { Gender, Pronouns } from "@/lib/pronouns";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ClipboardX, SquarePen } from "lucide-react";
import Link from "next/link";
import { editUserPersonalData } from "@/lib/supabase/queries";
import { useToast } from "@/components/ui/use-toast";

const PersonalProfileSchema = z.object({
  name: z.string().min(2, "Name is too short").max(50, "Name is too long"),
  bio: z.string().max(300, "Bio is too long").optional(),
  // location: z.nativeEnum(CountryList).optional(),
  birthday: z
    .string()
    .optional()
    .refine((date) => dayjs(date).isValid(), {
      message: "Invalid date format",
    })
    .refine((date) => dayjs(date).isBefore(dayjs()), {
      message: "Birthday can't be in the future",
    }),

  gender: z.nativeEnum(Gender).optional(),
  pronouns: z.nativeEnum(Pronouns).optional(),
});

export default function EditPersonalProfile({ user }: { user: any }) {
  const [submitError, setSubmitError] = useState<string>("");
  const { toast } = useToast();
  const form = useForm<z.infer<typeof PersonalProfileSchema>>({
    resolver: zodResolver(PersonalProfileSchema),
    defaultValues: {
      name: user.name,
      bio: user.bio,
      // location: user.location || CountryList.India,
      birthday: user.birthday
        ? dayjs(user.birthday).format("YYYY-MM-DD")
        : dayjs("2000-01-01").format("YYYY-MM-DD"),
      gender: user.gender,
      pronouns: user.pronouns,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const submit = async (formData: z.infer<typeof PersonalProfileSchema>) => {
    toast({
      title: "Saving Changes.",
      description: "Hold on while we save your changes.",
    });

    const response = await editUserPersonalData({ ...formData, id: user.id });
    if (response.error) {
      form.reset();
      setSubmitError(response.error.code || "");
      toast({
        title: "An error occurred.",
        description: "An error occurred while saving your changes.",
      });
    }
    toast({
      title: "Changes saved successfully!",
      description: "Your changes have been saved successfully.",
    });
    console.log(formData);
  };

  return (
    <Form {...form}>
      <form
        className="container"
        onChange={() => {
          console.log(form.formState.errors);
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(submit)}
        // onSubmit={async (e) => {
        //   e.preventDefault();
        //   await submit(form.getValues());
        //   setSubmitError("Changes saved successfully!");
        // }}
      >
        <div className="md:grid grid-cols-2 gap-4 sm:flex justify-center items-start">
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <FormField
                control={form.control}
                disabled={isLoading}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        required
                        type="name"
                        className={`bg-gray6 rounded-none border-0 border-b-4 ${
                          form.formState.errors.name
                            ? "border-red-600"
                            : "border-green-600"
                        }
                    } font-sans focus:ring-none focus:outline-none p-2 w-[300px] ${
                      isLoading ? "bg-gray7" : ""
                    }`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="birthday">Birthday</Label>
              <FormField
                control={form.control}
                disabled={isLoading}
                name="birthday"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <input
                          type="date"
                          className={`bg-gray6 rounded-none border-0 border-b-4 ${
                            form.formState.errors.birthday
                              ? "border-red-600"
                              : "border-green-600"
                          } font-sans focus:ring-none focus:outline-none p-2 w-[300px] ${
                            isLoading ? "bg-gray7" : ""
                          }`}
                          {...field}
                          value={dayjs(field.value).format("YYYY-MM-DD")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="gender">Gender</Label>
              <FormField
                control={form.control}
                disabled={isLoading}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          className={`bg-gray6 rounded-none border-0 border-b-4 ${
                            form.formState.errors.gender
                              ? "border-red-600"
                              : "border-green-600"
                          } font-sans focus:ring-none focus:outline-none p-2 w-[300px] ${
                            isLoading ? "bg-gray7" : ""
                          }`}
                        >
                          <SelectValue placeholder="Choose your gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray8">
                          <SelectGroup>
                            <SelectLabel>Choose your gender</SelectLabel>

                            {Object.values(Gender).map((gender) => (
                              <SelectItem
                                className="font-sans"
                                value={gender}
                                key={gender}
                              >
                                {gender}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center mt-4 sm:mt-0">
            <div className="flex flex-col gap-2">
              <Label htmlFor="bio">Bio</Label>
              <FormField
                control={form.control}
                disabled={isLoading}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className={`bg-gray6 rounded-none border-0 border-b-4 h-[128px] ${
                          form.formState.errors.bio
                            ? "border-red-600"
                            : "border-green-600"
                        }
                    } font-sans focus:ring-none focus:outline-none p-2 w-[300px] ${
                      isLoading ? "bg-gray7" : ""
                    }`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="pronouns">Pronouns</Label>
              <FormField
                control={form.control}
                disabled={isLoading}
                name="pronouns"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          className={`bg-gray6 rounded-none border-0 border-b-4 ${
                            form.formState.errors.pronouns
                              ? "border-red-600"
                              : "border-green-600"
                          } font-sans focus:ring-none focus:outline-none p-2 w-[300px] ${
                            isLoading ? "bg-gray7" : ""
                          }`}
                        >
                          <SelectValue placeholder="Preferred Pronouns" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray8">
                          <SelectGroup>
                            <SelectLabel>Preferred Pronouns</SelectLabel>

                            {Object.values(Pronouns).map((pronoun) => (
                              <SelectItem
                                className="font-sans"
                                value={pronoun}
                                key={pronoun}
                              >
                                {pronoun}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex md:justify-start p-1 justify-center items-start gap-2 mt-5">
          <Button
            className=" w-fit bg-green-500 hover:bg-green-600 text-gray-100 p-2 cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            <SquarePen className="mr-1" /> Make Changes
          </Button>
          <Link href={`/${user.username}`}>
            <Button
              disabled={isLoading}
              className=" w-fit bg-red-500 hover:bg-red-600 text-gray-100 p-2 cursor-pointer "
            >
              <ClipboardX className="mr-1" /> Discard
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
