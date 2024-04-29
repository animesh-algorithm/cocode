import { getAuthenticatedUser } from "@/app/(auth)/login/actions";
import { unstable_noStore } from "next/cache";
import LogInFirst from "@/components/shared/login-in-first";
import { getRoom } from "@/lib/supabase/data/room";
import RoomNotFound from "@/components/shared/room-not-found";
import VideoPlayer from "./video-player";
import { getUserById } from "@/lib/supabase/data/users";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpFromDot,
  ArrowUpRight,
  Bookmark,
  Github,
  Link as Share,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dayjs from "dayjs";

export default async function RoomPage(props: {
  params: {
    roomId: string;
  };
}) {
  unstable_noStore();
  const user = await getAuthenticatedUser();
  if (!user) return <LogInFirst />;

  const room = await getRoom(props.params.roomId!);
  if (!room) return <RoomNotFound />;
  const userData = await getUserById(user.id);
  const author = await getUserById(room.uid);

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="lg:col-span-3 col-span-4 p-4 pr-2">
        <div
          id="room"
          className="rounded-lg border text-card-foreground shadow-sm p-4 min-h-screen"
        >
          <VideoPlayer room={room} user={userData} />
        </div>
      </div>
      <div className="lg:col-span-1 p-4 lg:pl-2 flex gap-2 flex-col md:flex-row lg:flex-col col-span-4">
        {/* About the Room */}
        <div className="rounded-lg border text-card-foreground shadow-sm p-4 flex flex-col gap-4 overflow-hidden sm:max-w-[50%] lg:min-w-full">
          <h1 className="text-2xl bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            {room.name}
          </h1>
          <div className="flex gap-2 justify-start items-left flex-wrap">
            {(room.tags as any[]) &&
              (room.tags as any[]).map((tag: any) => (
                <div
                  key={tag.id}
                  className="rounded-full p-[1px] text-sm dark:bg-gradient-to-r dark:from-brand-primaryBlue dark:to-brand-primaryPurple"
                >
                  <div className="rounded-full px-3 py-1 dark:bg-black">
                    {tag.text}
                  </div>
                </div>
              ))}
          </div>
          <Button
            variant="outline"
            asChild
            className="bg-transparent font-sans overflow-hidden flex justify-start pl-1 w-fit"
          >
            <Link href={room.sourceCode!} target="_blank">
              <Github className="mr-1" /> @{room.sourceCode?.split(".com/")[1]}
            </Link>
          </Button>
          <p className="w-full text-justify font-sans text-muted-foreground ">
            {room.description}
          </p>
          <Image
            src={`/room.png`}
            className="rounded-lg aspect-video"
            alt={room.name}
            width={1920}
            height={1080}
          />
          <div className="flex justify-between mt-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="cursor-pointer hover:bg-green-500"
                  >
                    <ArrowUpFromDot />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-transparent">
                  Upvote
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="cursor-pointer hover:bg-pink-700"
                  >
                    <Share />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-transparent">
                  Copy link
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="cursor-pointer hover:bg-slate-700"
                  >
                    <Bookmark />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-transparent">
                  Bookmark
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        {/* About the Author */}
        <div className="rounded-lg border text-card-foreground shadow-sm p-4 flex flex-col gap-4 sm:max-w-[50%] lg:min-w-full h-fit">
          <h2 className="text-2xl bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            About the author
          </h2>
          <h2 className="text-2xl flex gap-1">
            {author?.name}{" "}
            <ArrowUpRight className="hover:text-orange-500 text-orange-400" />
          </h2>
          <p className="font-sans text-sm">
            @{author?.username} •{" "}
            <span className="text-muted-foreground">
              Joined {dayjs(author?.created_at).format("MMMM YYYY")}
            </span>
          </p>
          {/* TODO: Github Profile and other stuff */}
        </div>
      </div>
    </div>
  );
}
