import {
  Card,
  CardDescription,
  CardHeader,
  CardImage,
  CardTitle,
} from "@/components/ui/card";
import { getRooms } from "@/lib/supabase/data/room";
import { Plus, SquareCode, SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAuthenticatedUser } from "../(auth)/login/actions";
import { Button } from "@/components/ui/button";

export default async function BrowsePage() {
  const rooms = await getRooms(undefined);
  const user = await getAuthenticatedUser();

  return (
    <div className="container mt-20 mb-20 relative">
      <header className="text-center inset-0 mb-8">
        <h1 className="text-5xl mb-1">Rooms</h1>
        <p className="text-gray3 my-0">Browse and join public rooms</p>
      </header>
      {user && (
        <div className="absolute right-10 top-2">
          <Button
            variant="ghost"
            className="hover:bg-green-600 rounded-full"
            asChild
          >
            <Link href="/room/create#create">
              <Plus />
            </Link>
          </Button>
        </div>
      )}

      <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-gray5 to-gray4 rounded-full"></div>
      {/* TODO: Common Component for Browse and my-room page */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-5 gap-4 justify-items-center">
        {rooms.map((room) => (
          <Card
            key={room.id}
            className="max-w-sm overflow-hidden shadow-xl rounded-b-sm rounded-t-2xl bg-gray6 y-6 hover:scale-105 hover:rounded-b-md hover:rounded-t-xl transition-transform ease-in-out duration-500 h-full flex flex-col"
          >
            <CardImage className="rounded-t-lg relative">
              <Image
                src={room.thumbnail!}
                className="rounded-t-lg aspect-video"
                alt={room.name}
                width={1920}
                height={1080}
              />
              {user && user.id === room.uid && (
                <Button
                  asChild
                  className="absolute top-2 right-2 text-black hover:text-white hover:bg-purple-600 drop-shadow-[6px_6px_0_black] hover:drop-shadow-[0_0_7px_rgba(168,85,247,0.5)] transition-all duration-300"
                >
                  <Link href={`/room/${room.id}/edit`}>
                    <SquarePen />
                  </Link>
                </Button>
              )}
            </CardImage>
            <CardHeader className="flex flex-row justify-between">
              <Link
                href={`/room/${room.id}#room`}
                className="hover:underline gradient-slide"
              >
                <CardTitle className="text-lg">{room.name}</CardTitle>
              </Link>
              <Link href={room.sourceCode || "#"}>
                <SquareCode />
              </Link>
            </CardHeader>
            <CardDescription className="w-full text-justify">
              {room.description?.slice(0, 200)}
              <span className="text-washed-purple-300 dark:text-washed-purple-600">
                ...
              </span>
            </CardDescription>
            <div className="flex gap-2 justify-start items-left flex-wrap pl-6 pr-6 pb-4 mt-auto">
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
          </Card>
        ))}
      </div>
    </div>
  );
}
