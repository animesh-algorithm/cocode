"use server";

import db from "@/lib/supabase/db";
import { Room, room } from "@/lib/supabase/schema";
import { getAuthenticatedUser } from "../(auth)/login/actions";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/config/server";
import { eq } from "drizzle-orm";

export const createRoomAction = async (roomData: Partial<Room>) => {
  const supabase = createClient();
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      throw new Error(
        "You must be logged in to create a room. Please login first."
      );
    }
    let inserted = await db
      .insert(room)
      .values({
        name: roomData.name!,
        uid: user.id!,
        thumbnail: "/room.png",
        ...roomData,
      })
      .returning();

    revalidatePath("/browse");

    return JSON.parse(
      JSON.stringify({
        error: null,
        data: inserted,
      })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        error: error,
      })
    );
  }
};

export const updateRoomAction = async (roomData: Room) => {
  try {
    const user: any = await getAuthenticatedUser();
    if (!user) {
      throw new Error(
        "You must be logged in to update a room. Please login first."
      );
    }
    if (!user && user.id !== room.uid) {
      throw new Error("You are not authorized to update this room.");
    }
    const updated = await db
      .update(room)
      .set(roomData)
      .where(eq(room.id, roomData.id));
    console.log(updated);
    return JSON.parse(
      JSON.stringify({
        error: null,
        data: updated,
      })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        error: error,
      })
    );
  }
};
