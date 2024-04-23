import { getAuthenticatedUser } from "@/app/(auth)/login/actions";
import { unstable_noStore } from "next/cache";
import LoginInFirst from "../create/login-in-first";
import { getRoom } from "@/lib/supabase/data/room";
import RoomNotFound from "./room-not-found";
import VideoPlayer from "./video-player";
import { getUserById } from "@/lib/supabase/data/users";

export default async function RoomPage(props: {
  params: {
    roomId: string;
  };
}) {
  unstable_noStore();
  const user = await getAuthenticatedUser();
  if (!user) return <LoginInFirst />;

  const room = await getRoom(props.params.roomId!);
  const userData = await getUserById(user.id);
  if (!room) return <RoomNotFound />;

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border text-card-foreground shadow-sm p-4 min-h-screen">
          <VideoPlayer room={room} user={userData} />
        </div>
      </div>
      <div className="col-span-1 p-4 pl-2">
        <div className="rounded-lg border text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base">{room.name}</h1>
        </div>
      </div>
    </div>
  );
}
