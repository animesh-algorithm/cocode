"use client";

import { Button } from "@/components/ui/button";
import createSupabaseBrowerClient from "@/lib/supabase/client";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function OauthLoginForm() {
  const supabase = createSupabaseBrowerClient();

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <>
      <Button className="w-full">
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
