import { date, pgTable, text } from "drizzle-orm/pg-core";

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

export type User = typeof users.$inferSelect;
