"use server";

import { eq } from "drizzle-orm";
import db from "./db";
import { User, users } from "./schema";

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
    console.log(error);
    return JSON.parse(
      JSON.stringify({
        error: error,
      })
    );
  }
};
