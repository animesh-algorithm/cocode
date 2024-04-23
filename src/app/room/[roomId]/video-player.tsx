"use client";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { generateTokenAction } from "./actions";
import { useRouter } from "next/navigation";
import { Room } from "@/lib/supabase/schema";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;

export default function VideoPlayer({ room, user }: { room: Room; user: any }) {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => track.stop());
        });
    };
  }, [call]);

  useEffect(() => {
    if (!room) return;
    if (!user) {
      return;
    }
    const userId = user.id;
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name: user.name ?? undefined,
        image: user.avatar ?? undefined,
      },
      tokenProvider: () => generateTokenAction(),
    });
    const call = client.call("default", room.id);
    call.join({ create: true });
    setClient(client);
    setCall(call);

    return () => {
      call
        .leave()
        .then(() => client.disconnectUser())
        .catch(console.error);
    };
  }, [user, room]);

  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls
              onLeave={() => {
                router.push("/browse");
              }}
            />
            <CallParticipantsList onClose={() => undefined} />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  );
}
