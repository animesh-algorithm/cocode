"use client";

import { Button } from "@/components/ui/button";
import createSupabaseBrowerClient from "@/lib/supabase/config/client";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function OauthLoginForm() {
  const supabase = createSupabaseBrowerClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/oauth/callback`,
      },
    });
  };

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/oauth/callback`,
      },
    });
  };

  return (
    <>
      <Button className="w-full" onClick={handleGoogleLogin}>
        <FcGoogle className="mr-2 text-xl" />
        Log in With Google
      </Button>
      <Button className="w-full" onClick={handleGithubLogin}>
        <FaGithub className="mr-2 text-xl" />
        Log in With Github
      </Button>
    </>
  );
}
