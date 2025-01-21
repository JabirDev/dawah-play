import { boolean, pgSchema, text, timestamp } from "drizzle-orm/pg-core";

const dawahPlaySchema = pgSchema("dawahplay");

export const channel = dawahPlaySchema.table("channel", {
  id: text("id").primaryKey().unique(),
  name: text("name").notNull(),
  url: text("url").unique().notNull(),
  image: text("image").notNull(),
  ytId: text("ytId").unique().notNull(),
  description: text("description").default("No description").notNull(),
  verified: boolean("verified").default(false).notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", {
    precision: 3,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

export type ChannelType = typeof channel.$inferSelect;
