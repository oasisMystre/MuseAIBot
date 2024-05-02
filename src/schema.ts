import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {
  pgTable,
  text,
  timestamp,
  serial,
  integer,
  uuid,
} from "drizzle-orm/pg-core";

import { tokenGenerator } from "./utils/secret";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  lastLogin: timestamp("last_login").defaultNow().notNull(),
});

export const selectUsersSchema = createSelectSchema(users);
export const insertUsersSchema = createInsertSchema(users);
export const getUsersSchema = insertUsersSchema.pick({ id: true });

export const userRelations = relations(users, ({ many }) => ({
  token: many(tokens),
  libraries: many(libraries),
}));

export const tokens = pgTable("tokens", {
  id: serial("id").primaryKey(),
  key: text("token")
    .$defaultFn(() => tokenGenerator.generate())
    .notNull(),
  userId: text("user_id").unique(),
});

export const tokenRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userId],
    references: [users.id],
  }),
}));

export const selectTokensSchema = createSelectSchema(tokens);
export const insertTokensSchema = createInsertSchema(tokens);
export const getTokensSchema = selectTokensSchema.pick({
  key: true,
});
export const getTokensByUserIdSchema = selectTokensSchema.pick({
  userId: true,
});

export const libraries = pgTable("libraries", {
  id: uuid("id").primaryKey(),
  title: text("title"),
  updateAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  plays: integer("plays").default(0).notNull(),
  likes: integer("likes").array().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const librariesRelations = relations(libraries, ({ one }) => ({
  user: one(users, {
    fields: [libraries.userId],
    references: [users.id],
  }),
}));

export const selectLibrariesSchema = createSelectSchema(libraries).pick({
  id: true,
  userId: true,
});
export const insertLibrariesSchema = createInsertSchema(libraries);
export const getLibrariesSchema = selectLibrariesSchema.pick({
  id: true,
});
export const getByUserIdLibrariesSchema = selectLibrariesSchema.pick({
  userId: true,
});

export default {
  users,
  tokens,
  libraries,
  userRelations,
  tokenRelations,
  librariesRelations,
} as const;
