"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import createSupabaseBrowerClient from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function UserAvatar({ user }: { user: any }) {
  const supabase = createSupabaseBrowerClient();
  const router = useRouter();
  return (
    <Avatar
      className="flex justify-center items-center cursor-pointer"
      onClick={async () => {
        console.log("🔴 signing out");
        await supabase.auth.signOut();
        router.refresh();
      }}
    >
      <AvatarImage
        src={user.user_metadata.avatar_url}
        alt={`/${user.user_metadata.name}`}
      />
      <AvatarFallback>
        <UserIcon />
      </AvatarFallback>
    </Avatar>
  );
}
