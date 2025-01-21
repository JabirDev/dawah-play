import { integer, pgSchema, text, timestamp } from "drizzle-orm/pg-core";
import { channel, user } from ".";

const dawahPlaySchema = pgSchema("dawahplay");

export const saved = dawahPlaySchema.table("saved", {
  id: text("id").primaryKey().unique(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  channelId: text("channelId")
    .notNull()
    .references(() => channel.ytId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  videoId: text("videoId").notNull(),
  author: text("author").notNull(),
  imageUrl: text("imageUrl").notNull(),
  title: text("title").notNull(),
  duration: integer("duration").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
});

export type SavedType = typeof saved.$inferSelect;
