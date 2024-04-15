"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getUser() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

export async function signInWithEmail(email: string) {
  const supabase = createClient();

  const response = await supabase.auth.signInWithOtp({
    email,
  });
  return JSON.parse(JSON.stringify(response));
}

export async function signInWithGithub() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `/auth/callback`,
    },
  });
  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}

export async function signOut() {
  const supabase = createClient();

  await supabase.auth.signOut();
  redirect("/login");
}
