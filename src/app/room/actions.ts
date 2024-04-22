"use server";

import db from "@/lib/supabase/db";
import { Room, room } from "@/lib/supabase/schema";
import { getAuthenticatedUser } from "../(auth)/login/actions";
import { revalidatePath } from "next/cache";

export const createRoomAction = async (roomData: Partial<Room>) => {
  try {
    const user = await getAuthenticatedUser();
    console.log(user);
    if (!user) {
      throw new Error(
        "You must be logged in to create a room. Please login first."
      );
    }
    const inserted = await db
      .insert(room)
      .values({
        name: roomData.name!,
        uid: user.id!,
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
