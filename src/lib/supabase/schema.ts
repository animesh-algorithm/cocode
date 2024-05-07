import { sql } from "drizzle-orm";
import { date, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  avatar: text("avatar"),
  bio: text("bio"),
  location: text("location"),
  website: text("website"),
  twitter: text("twitter"),
  github: text("github"),
  linkedin: text("linkedin"),
  birthday: date("birthday"),
  created_at: date("created_at").notNull().default("now()"),
  updated_at: date("updated_at").notNull().default("now()"),
  pronouns: text("pronouns"),
  gender: text("gender"),
});

export const room = pgTable("room", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),
  uid: text("uid")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  created_at: date("created_at").notNull().default("now()"),
  updated_at: date("updated_at").notNull().default("now()"),
  sourceCode: text("sourceCode"),
  tags: jsonb("tags").default("[]"),
  thumbnail: text("thumbnail").default("/room.png"),
});

export type User = typeof users.$inferSelect;
export type Room = typeof room.$inferSelect;
