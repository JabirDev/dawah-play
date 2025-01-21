import { pgSchema, text, timestamp } from "drizzle-orm/pg-core";

const dawahPlaySchema = pgSchema("dawahplay");

export const verification = dawahPlaySchema.table("verification", {
  id: text("id").primaryKey().unique(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});
