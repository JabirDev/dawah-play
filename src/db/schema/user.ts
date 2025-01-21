import { boolean, pgSchema, text, timestamp } from "drizzle-orm/pg-core";
import { gender, role } from ".";

const dawahPlaySchema = pgSchema("dawahplay");

export const user = dawahPlaySchema.table("user", {
  id: text("id").primaryKey().unique(),
  name: text("name").notNull(),
  username: text("username").unique(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  role: role("role").default("member").notNull(),
  gender: gender("gender").default("male"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export type UserType = typeof user.$inferSelect;
