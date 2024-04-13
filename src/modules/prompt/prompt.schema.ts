import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {
  pgTable,
  text,
  boolean,
  json,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { users } from "../../schema";

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

export const insertPromptsScheme = createInsertSchema(users);
export const selectPromptschema = createSelectSchema(users);
