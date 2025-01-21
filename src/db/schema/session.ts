import { pgSchema, text, timestamp } from "drizzle-orm/pg-core";
import { user } from ".";

const dawahPlaySchema = pgSchema("dawahplay");

export const session = dawahPlaySchema.table("session", {
  id: text("id").primaryKey().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});
