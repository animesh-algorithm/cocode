import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";

export default function UserAvatar({
  user,
  className,
}: {
  user: any;
  className?: string;
}) {
  return (
    <Avatar
      className={`flex justify-center items-center cursor-pointer rounded-md ${className}`}
    >
      <AvatarImage src={user.avatar} alt={`/${user.name}`} />
      <AvatarFallback className="bg-red-500 hover:bg-red-600 rounded-md">
        <UserIcon />
      </AvatarFallback>
    </Avatar>
  );
}
