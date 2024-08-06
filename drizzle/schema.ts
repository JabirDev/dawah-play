import {
  pgTable,
  uniqueIndex,
  pgEnum,
  text,
  timestamp,
  numeric,
  boolean,
} from "drizzle-orm/pg-core";

export const aalLevel = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);
export const factorStatus = pgEnum("factor_status", ["unverified", "verified"]);
export const factorType = pgEnum("factor_type", ["totp", "webauthn"]);
export const oneTimeTokenType = pgEnum("one_time_token_type", [
  "confirmation_token",
  "reauthentication_token",
  "recovery_token",
  "email_change_token_new",
  "email_change_token_current",
  "phone_change_token",
]);
export const role = pgEnum("role", ["admin", "member"]);
export const keyStatus = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const keyType = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const action = pgEnum("action", [
  "INSERT",
  "UPDATE",
  "DELETE",
  "TRUNCATE",
  "ERROR",
]);
export const equalityOp = pgEnum("equality_op", [
  "eq",
  "neq",
  "lt",
  "lte",
  "gt",
  "gte",
  "in",
]);

export const userTable = pgTable(
  "users",
  {
    id: text("id").primaryKey().notNull(),
    username: text("username").notNull(),
    name: text("name").notNull(),
    email: text("email"),
    password: text("password"),
    image: text("image"),
    role: role("role").default("member").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      emailKey: uniqueIndex("users_email_key").using("btree", table.email),
      usernameKey: uniqueIndex("users_username_key").using(
        "btree",
        table.username,
      ),
    };
  },
);

export const accountTable = pgTable("accounts", {
  id: text("id").primaryKey().notNull(),
  provider: text("provider").notNull(),
  providerId: text("providerId").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const sessionTable = pgTable("sessions", {
  id: text("id").primaryKey().notNull(),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  expiresAt: timestamp("expiresAt", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const channelTable = pgTable(
  "channels",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    url: text("url").notNull(),
    image: text("image").notNull(),
    ytId: text("ytId").notNull(),
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
  },
  (table) => {
    return {
      urlKey: uniqueIndex("channels_url_key").using("btree", table.url),
      ytIdKey: uniqueIndex("channels_ytId_key").using("btree", table.ytId),
    };
  },
);

export const bookmarkTable = pgTable("bookmarks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  channelId: text("channelId")
    .notNull()
    .references(() => channelTable.ytId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  videoId: text("videoId").notNull(),
  author: text("author").notNull(),
  imageUrl: text("imageUrl").notNull(),
  title: text("title").notNull(),
  duration: numeric("duration").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
});
