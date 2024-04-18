import { getUser, getUserById } from "@/lib/supabase/data/users";
import { getAuthenticatedUser } from "../(auth)/login/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Cake,
  Github,
  Linkedin,
  Mail,
  MapPin,
  SquareArrowOutUpRight,
  SquarePen,
  Twitter,
  UserIcon,
  UserRoundX,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import LogoutButton from "./logout-button";
import dayjs from "dayjs";
import UserNotFound from "./user-not-found";

export default async function ProfilePage(props: {
  params: {
    username: string;
  };
}) {
  const { username } = props.params;
  const user = await getUser(username);

  const currentUser = await getAuthenticatedUser();
  let currentUserData = null;
  if (currentUser) currentUserData = await getUserById(currentUser?.id!);

  const isSameUser = currentUserData && currentUserData?.username === username;

  if (!user) {
    return <UserNotFound />;
  }
  return (
    <div className="md:mt-20 mt-10 container relative">
      <div className="flex justify-center items-center flex-col">
        <Avatar className="flex justify-center items-center w-[100px] h-[100px]">
          <AvatarImage src={user.avatar!} alt={user.name} />
          <AvatarFallback className="w-[100px] h-[100px] bg-red-500 hover:bg-red-600">
            <UserIcon width={50} height={50} />
          </AvatarFallback>
        </Avatar>
        <h2 className="text-4xl mt-6">{user.name}</h2>
        <p className="font-sans mt-1">@{user.username}</p>
        <div className="flex gap-3">
          <Button className="my-4">Follow</Button>
          {isSameUser && <LogoutButton />}
        </div>
        <p className="">{user.bio || "This user has not set a bio yet."}</p>
        <div className="flex-wrap gap-4 mt-5 flex justify-center items-center text-muted-foreground font-sans">
          <div className="flex gap-1">
            <MapPin /> IN
          </div>
          <div className="flex gap-1">
            <Cake /> Joined on {dayjs(user.created_at).format("MMMM DD, YYYY")}
          </div>
          <div className="flex gap-1 cursor-pointer">
            <Mail />{" "}
            <Link href={`mailto://${user.email}`} target="_blank">
              {user.email}
            </Link>
          </div>
          {user.website && (
            <div className="flex gap-1 cursor-pointer">
              <SquareArrowOutUpRight />
              <Link target="_blank" href="https://animesh.live">
                {user.website}
              </Link>
            </div>
          )}

          {user.github && <Github />}
          {user.linkedin && <Linkedin />}
          {user.twitter && <Twitter />}
        </div>
        <Separator className="my-8" />
        <div className="grid md:grid-cols-3 grid-rows-3 space-y-4 md:space-y-0">
          <div className="flex flex-col items-center flex-wrap text-center gap-2 w-full">
            <h6 className="text-md">Education</h6>
            <p className="font-sans">
              Shri Vaishnav Vidhyapeeth Vishvavidyalaya
            </p>
          </div>
          <div className="flex flex-col items-center flex-wrap text-center gap-2 w-full">
            <h6 className="text-md">Pronouns</h6>
            <p className="font-sans">{user.pronouns || "—"}</p>
          </div>
          <div className="flex flex-col items-center flex-wrap text-center gap-2 w-full">
            <h6 className="text-md">Work</h6>
            <p className="font-sans">CEO @CoCode</p>
          </div>
        </div>
      </div>
      {isSameUser && (
        <Button
          className="absolute top-0 right-5 hover:bg-red-400"
          variant="ghost"
          asChild
        >
          <Link href={`/${user.username}/edit`}>
            <SquarePen />
          </Link>
        </Button>
      )}
    </div>
  );
}
