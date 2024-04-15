"use server";

import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";

const supabase = createClient();

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

export async function signInWithEmail(email: string) {
  const response = await supabase.auth.signInWithOtp({
    email,
  });
  return JSON.parse(JSON.stringify(response));
}

export async function signInWithGithub() {
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
  const response = await supabase.auth.signOut();
  return JSON.parse(JSON.stringify(response));
}
