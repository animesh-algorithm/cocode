"use server";

import db from "@/lib/supabase/db";
import { User, users } from "@/lib/supabase/schema";
import { eq } from "drizzle-orm";

export const editUserPersonalData = async (updatedUser: Partial<User>) => {
  try {
    if (updatedUser.id) {
      await db
        .update(users)
        .set(updatedUser)
        .where(eq(users.id, updatedUser.id));
    }
    return JSON.parse(
      JSON.stringify({
        error: null,
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
