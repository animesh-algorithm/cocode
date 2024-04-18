import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";

export default function UserAvatar({ user }: { user: any }) {
  return (
    <Avatar className="flex justify-center items-center cursor-pointer">
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
