import { relations } from "drizzle-orm/relations";
import { userTable, accountTable, sessionTable } from "./schema";

export const accountTableRelations = relations(accountTable, ({ one }) => ({
  user: one(userTable, {
    fields: [accountTable.userId],
    references: [userTable.id],
  }),
}));

export const userTableRelations = relations(userTable, ({ many }) => ({
  accountTable: many(accountTable),
  sessionTable: many(sessionTable),
}));

export const sessionTableRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  }),
}));
