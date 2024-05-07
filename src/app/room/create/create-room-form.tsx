"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Tag, TagInput } from "@/components/ui/tag-input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgePlus, ClipboardX, SquarePen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createRoomAction, updateRoomAction } from "../actions";
import { Room } from "@/lib/supabase/schema";
import createSupabaseBrowerClient from "@/lib/supabase/config/client";

const CreateRoomSchema = z.object({
  name: z.string().min(3, "Name is too short").max(255, "Name is too long"),
  description: z
    .string()
    .min(100, "Description is too short")
    .max(1000, "Description is too long")
    .optional(),
  sourceCode: z.string().url("Invalid URL").optional(),
  tags: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .optional(),
  thumbnail: z.any().optional(),
});

export default function CreateRoomForm() {
  const supabase = createSupabaseBrowerClient();
  const [submitError, setSubmitError] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);

  const { toast } = useToast();
  const form = useForm<z.infer<typeof CreateRoomSchema>>({
    mode: "onChange",
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      name: "",
      description: "",
      sourceCode: "",
      tags: [],
      thumbnail: "",
    },
  });
  const { setValue, register } = form;

  const uploadThumbnail = async (room: Room, file: any) => {
    const { data, error } = await supabase.storage
      .from("thumbnails")
      .upload(`thumbnail-${room.id}`, file, {
        cacheControl: "3600",
        upsert: true,
      });
    if (error) {
      setSubmitError(error.message);
      return;
    }

    const response = await supabase.storage
      .from("thumbnails")
      .createSignedUrl(data.path, 3.156e7);
    return response.data?.signedUrl;
  };

  const submit = async (formData: z.infer<typeof CreateRoomSchema>) => {
    const response = await createRoomAction({
      ...formData,
      thumbnail: "/room.png",
    });
    if (response.error) {
      setSubmitError(response.error.message);
      toast({
        title: "An error occurred.",
        description:
          "An error occurred while creating your room. Please contact support.",
      });
      return;
    }
    console.log(formData.thumbnail);
    if (formData.thumbnail !== "") {
      const thumbnailURL = await uploadThumbnail(
        response.data[0],
        formData.thumbnail[0]
      );
      if (thumbnailURL) {
        await updateRoomAction({
          ...response.data[0],
          thumbnail: thumbnailURL,
        });
      }
    }
    toast({
      title: "Room created.",
      description: "Your room has been created successfully.",
    });
    form.reset();
    setTags([]);
  };

  const isLoading = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form
        id="create"
        className="md:container"
        onClick={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(submit)}
      >
        <div className="flex gap-4 flex-col md:container min-w-full">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Room Name</Label>
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
                      placeholder="CoCode: A pair programing social network"
                      className={`bg-gray6 rounded-none border-0 border-b-4 ${
                        form.formState.errors.name
                          ? "border-red-600"
                          : field.value === ""
                          ? "border-blue-600"
                          : "border-green-600"
                      }
                    } font-sans focus:ring-none focus:outline-none p-2 w-full ${
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
            <Label htmlFor="description">Description</Label>
            <FormField
              control={form.control}
              disabled={isLoading}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="CoCode is a social network for pair programming. You can create a room and share the link with your friends to code together."
                      className={`bg-gray6 rounded-none border-0 border-b-4 h-[128px] ${
                        form.formState.errors.description
                          ? "border-red-600"
                          : field.value === ""
                          ? "border-blue-600"
                          : "border-green-600"
                      }
                    } font-sans focus:ring-none focus:outline-none p-2  ${
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
            <Label htmlFor="sourceCode">Source Code</Label>
            <FormField
              control={form.control}
              disabled={isLoading}
              name="sourceCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      required
                      type="url"
                      placeholder="https://github.com/animesh-algorithm/cocode"
                      className={`bg-gray6 rounded-none border-0 border-b-4 ${
                        form.formState.errors.sourceCode
                          ? "border-red-600"
                          : field.value === ""
                          ? "border-blue-600"
                          : "border-green-600"
                      }
                    } font-sans focus:ring-none focus:outline-none p-2 w-full ${
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
            <Label htmlFor="tags">Tags</Label>
            <FormField
              control={form.control}
              disabled={isLoading}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TagInput
                      {...field}
                      placeholder="Enter a topic"
                      tags={tags}
                      className={`bg-gray6 rounded-none border-0 border-b-4 ${
                        form.formState.errors.tags
                          ? "border-red-600"
                          : "border-green-600"
                      }
                    } font-sans focus:ring-none focus:outline-none p-2 ${
                      isLoading ? "bg-gray7" : ""
                    }`}
                      setTags={(newTags: Tag[]) => {
                        setTags(newTags);
                        setValue("tags", newTags as [Tag, ...Tag[]]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="sourceCode">Thumbnail</Label>
            <FormField
              control={form.control}
              disabled={isLoading}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      type="file"
                      className={`bg-gray6 rounded-none border-0 border-b-4 ${
                        form.formState.errors.thumbnail
                          ? "border-red-600"
                          : "border-green-600"
                      }
                    } font-sans focus:ring-none focus:outline-none p-2 w-full ${
                      isLoading ? "bg-gray7" : ""
                    }`}
                      {...register("thumbnail")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex md:justify-start justify-center items-start gap-3">
            <Button
              className=" w-fit bg-green-500 hover:bg-green-600 text-gray-100 p-2 cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              <BadgePlus className="mr-1" /> Create Room
            </Button>
            <Link href={`/browse`}>
              <Button
                disabled={isLoading}
                className=" w-fit bg-red-500 hover:bg-red-600 text-gray-100 p-2 cursor-pointer "
              >
                <ClipboardX className="mr-1" /> Discard
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
