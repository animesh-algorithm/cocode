"use client";

import { Button } from "@/components/ui/button";
import createSupabaseBrowerClient from "@/lib/supabase/config/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = createSupabaseBrowerClient();
  const router = useRouter();
  return (
    <Button
      className="my-4"
      onClick={async () => {
        console.log("🔴 signing out");
        await supabase.auth.signOut();
        router.refresh();
      }}
    >
      Logout
    </Button>
  );
}
