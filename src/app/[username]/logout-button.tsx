"use client";

import { Button } from "@/components/ui/button";
import createSupabaseBrowerClient from "@/lib/supabase/config/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutButton() {
  const supabase = createSupabaseBrowerClient();
  const router = useRouter();

  return (
    <React.Fragment>
      <LogOut />{" "}
      <div
        onClick={async () => {
          console.log("🔴 signing out");
          await supabase.auth.signOut();
          router.refresh();
        }}
        className="text-md gradient-slide"
      >
        Logout
      </div>
    </React.Fragment>
  );
}
