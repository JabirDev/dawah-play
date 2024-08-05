import { relations } from "drizzle-orm/relations";
import {
  userTable,
  accountTable,
  sessionTable,
  bookmarkTable,
  channelTable,
} from "./schema";

export const accountTableRelations = relations(accountTable, ({ one }) => ({
  user: one(userTable, {
    fields: [accountTable.userId],
    references: [userTable.id],
  }),
}));

export const userTableRelations = relations(userTable, ({ many }) => ({
  accountTable: many(accountTable),
  sessionTable: many(sessionTable),
  bookmarkTable: many(bookmarkTable),
}));

export const sessionTableRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  }),
}));

export const bookmarkTableRelations = relations(bookmarkTable, ({ one }) => ({
  user: one(userTable, {
    fields: [bookmarkTable.userId],
    references: [userTable.id],
  }),
  channel: one(channelTable, {
    fields: [bookmarkTable.channelId],
    references: [channelTable.ytId],
  }),
}));

export const channelTableRelations = relations(channelTable, ({ many }) => ({
  bookmarkTable: many(bookmarkTable),
}));
