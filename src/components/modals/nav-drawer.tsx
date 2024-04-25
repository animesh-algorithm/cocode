import { getUserById } from "@/lib/supabase/data/users";
import UserAvatar from "../shared/avatar";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import dayjs from "dayjs";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function NavDrawer({ user }: { user: any }) {
  const userData: any = await getUserById(user.id);
  return (
    <>
      <DropdownMenuLabel>
        <UserAvatar user={user} className="w-[100px] h-[100px]" />
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem className="flex flex-col justify-start items-start mb-2">
          <h2 className="text-2xl flex gap-1">
            {userData.name}{" "}
            <Link href={`/${userData.username}`}>
              <ArrowUpRight className="hover:text-orange-500 text-orange-400" />
            </Link>
          </h2>
          <p className="font-sans">
            @{userData.username} •{" "}
            <span className="text-muted-foreground">
              Joined {dayjs(userData.created_at).format("MMMM YYYY")}
            </span>
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex  mb-2">
          <p>
            10 <span className="font-sans"> Followers</span>
          </p>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
}
