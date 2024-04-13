import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {
  pgTable,
  text,
  boolean,
  json,
  timestamp,
  serial,
  integer,
  bigint,
} from "drizzle-orm/pg-core";

import { tokenGenerator } from "./utils/secret";

export const users = pgTable("users", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  username: text("username").unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  lastLogin: timestamp("last_login").defaultNow().notNull(),
});

export const selectUsersSchema = createSelectSchema(users);
export const insertUsersSchema = createInsertSchema(users);
export const getUsersSchema = insertUsersSchema.pick({ id: true });

export const userRelations = relations(users, ({ many }) => ({
  token: many(tokens),
}));

export const tokens = pgTable("tokens", {
  id: serial("id").primaryKey(),
  key: text("token")
    .$defaultFn(() => tokenGenerator.generate())
    .notNull(),
  userId: integer("user_id").unique(),
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

export const prompts = pgTable("prompt", {
  id: serial("id").primaryKey(),
  visibility: text("visibility", {
    enum: ["PUBLIC", "PRIVATE"] as const,
  })
    .default("PUBLIC")
    .notNull(),
  description: text("description").notNull(),
  isIntrumental: boolean("is_intrumental").default(false).notNull(),
  customParameters: json("custom_aramters"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const promptRelations = relations(prompts, ({ many }) => ({
  libraries: many(libraries),
}));

export const insertPromptsScheme = createInsertSchema(users);
export const selectPromptschema = createSelectSchema(users);

export const libraries = pgTable("libraries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  updateAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  plays: integer("plays").default(0).notNull(),
  likes: integer("likes").array().unique().notNull(),
  promptId: serial("prompt_id").notNull(),
  userId: serial("user_id").notNull(),
});

export const librariesRelations = relations(libraries, ({ one }) => ({
  prompt: one(prompts, {
    fields: [libraries.promptId],
    references: [prompts.id],
  }),
}));

export const selectLibrariesSchema = createSelectSchema(libraries).pick({
  id: true,
  userId: true,
});

export const insertLibrariesSchema = createInsertSchema(libraries).omit({
  userId: true,
});

export const getLibrariesSchema = selectLibrariesSchema.pick({
  id: true,
});

export const getByUserIdLibrariesSchema = selectLibrariesSchema.pick({
  userId: true,
});

export default {
  users,
  tokens,
  prompts,
  libraries,
  userRelations,
  tokenRelations,
  promptRelations,
  librariesRelations,
} as const;
