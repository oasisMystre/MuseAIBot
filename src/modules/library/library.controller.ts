import { and, count, desc, eq, gte, lte, sql } from "drizzle-orm";

import { db } from "../../db";
import {
  getByUserIdLibrariesSchema,
  getLibrariesSchema,
  insertLibrariesSchema,
  libraries,
  selectLibrariesSchema,
} from "../../schema";

export const getLibraries = function (offset = 0, limit = 24) {
  return db.query.libraries
    .findMany({
      extras: {
        likes: sql`cardinality(likes)`.as("likes"),
      },
      offset,
      limit,
      orderBy: [desc(libraries.updateAt), desc(libraries.createdAt)],
    })
    .execute();
};

export const getLibraryById = function (
  id: Zod.infer<typeof selectLibrariesSchema>["id"],
) {
  return db.query.libraries
    .findFirst({
      where: eq(libraries.id, id),
    })
    .execute();
};

export const getLibrariesOnlyByUser = function (
  values: Zod.infer<typeof getByUserIdLibrariesSchema>,
  offset = 0,
  limit = 24,
) {
  return db.query.libraries
    .findMany({
      columns: { likes: false },
      where: eq(libraries.userId, values.userId),
      extras: {
        likes: sql`cardinality(likes)`.as("likes"),
      },
      offset,
      limit,
      orderBy: [desc(libraries.updateAt), desc(libraries.createdAt)],
    })
    .execute();
};

export const getLibraryOnlyByUser = function (
  values: Zod.infer<typeof selectLibrariesSchema>,
) {
  return db.query.libraries
    .findFirst({
      columns: { likes: false },
      where: and(
        eq(libraries.id, values.id),
        eq(libraries.userId, values.userId),
      ),
      extras: {
        likes: count(libraries.likes).as("likes"),
      },
    })
    .execute();
};

export const createLibrary = function (
  values: Zod.infer<typeof insertLibrariesSchema>,
) {
  return db.insert(libraries).values(values).returning().execute();
};

export const updateLibraryById = function (
  id: Zod.infer<typeof getLibrariesSchema>['id'],
  values: Partial<Zod.infer<typeof insertLibrariesSchema>>,
) {
  return db
    .update(libraries)
    .set(values)
    .where(eq(libraries.id, id))
    .returning()
    .execute();
};

export const deleteLibraryOnlyByUser = function (
  values: Zod.infer<typeof selectLibrariesSchema>,
) {
  return db
    .delete(libraries)
    .where(
      and(eq(libraries.id, values.id), eq(libraries.userId, values.userId)),
    )
    .returning()
    .execute();
};
