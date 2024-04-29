import { getUserById } from "@/lib/supabase/data/users";
import UserAvatar from "../shared/avatar";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import dayjs from "dayjs";
import { ArrowUpRight, LogOut, Tv } from "lucide-react";
import Link from "next/link";
import LogoutButton from "@/app/[username]/logout-button";

export default async function NavDrawer({ user }: { user: any }) {
  const userData: any = await getUserById(user.id);
  return (
    <>
      <DropdownMenuLabel>
        <UserAvatar
          user={user}
          className="w-[100px] h-[100px] cursor-emoji-[👌]"
        />
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <Link href={`/${userData.username}`}>
          <DropdownMenuItem className="flex flex-col justify-start items-start mb-2 cursor-pointer">
            <h2 className="text-2xl flex gap-1">
              {userData.name}{" "}
              <ArrowUpRight className="hover:text-orange-500 text-orange-400" />
            </h2>
            <p className="font-sans">
              @{userData.username} •{" "}
              <span className="text-muted-foreground">
                Joined {dayjs(userData.created_at).format("MMMM YYYY")}
              </span>
            </p>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2 mb-2 cursor-pointer">
          <Tv /> <div className="text-md gradient-slide">My Rooms</div>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 mb-2 cursor-pointer">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
}
