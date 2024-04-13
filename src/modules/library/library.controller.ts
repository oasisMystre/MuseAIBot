import type { z } from "zod";
import { and, count, eq, sql } from "drizzle-orm";

import { db } from "../../db";
import {
  getByUserIdLibrariesSchema,
  getLibrariesSchema,
  insertLibrariesSchema,
  libraries,
  selectLibrariesSchema,
} from "../../schema";

export const getLibrariesOnlyByUser = function (
  values: z.infer<typeof getByUserIdLibrariesSchema>
) {
  return db.query.libraries.findMany({
    columns: { likes: false },
    where: eq(libraries.userId, values.userId),
    with: {
      prompt: true,
    },
    extras: {
      likes: sql`cardinality(likes)`.as("likes"),
    },
  });
};

export const getLibraryOnlyByUser = function (
  values: z.infer<typeof selectLibrariesSchema>
) {
  return db.query.libraries.findFirst({
    columns: { likes: false },
    where: and(
      eq(libraries.id, values.id),
      eq(libraries.userId, values.userId)
    ),
    with: {
      prompt: true,
    },
    extras: {
      likes: count(libraries.likes).as("likes"),
    },
  });
};

export const createLibrary = function (
  values: z.infer<typeof insertLibrariesSchema>
) {
  return db.insert(libraries).values(values).returning();
};

export const updateLibrary = function (
  selector: z.infer<typeof getLibrariesSchema>,
  values: Partial<z.infer<typeof insertLibrariesSchema>>
) {
  return db
    .update(libraries)
    .set(values)
    .where(eq(libraries.id, selector.id))
    .returning();
};

export const deleteLibraryOnlyByUser = function (
  values: z.infer<typeof selectLibrariesSchema>
) {
  return db
    .delete(libraries)
    .where(
      and(eq(libraries.id, values.id), eq(libraries.userId, values.userId))
    )
    .returning();
};
