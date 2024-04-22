import { desc, eq, like } from "drizzle-orm";
import db from "../db";
import { room } from "../schema";

export const getRooms = async (search: string | undefined) => {
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({
    where,
    orderBy: [desc(room.created_at)],
  });
  return rooms;
};

export const getUserRooms = async (uid: string) => {
  const rooms = await db.query.room.findMany({
    where: eq(room.uid, uid),
    orderBy: [desc(room.created_at)],
  });
  return rooms;
};
