import type { z } from "zod";
import { and, count, eq, sql } from "drizzle-orm";

import { db } from "../../db";
import { sunoApi } from "../../lib";
import {
  getByUserIdLibrariesSchema,
  getLibrariesSchema,
  insertLibrariesSchema,
  libraries,
  selectLibrariesSchema,
} from "../../schema";

export const getLibraries = function () {
  return db.query.libraries
    .findMany({
      extras: {
        likes: sql`cardinality(likes)`.as("likes"),
      },
    })
    .execute();
};

export const getLibrariesOnlyByUser = function (
  values: z.infer<typeof getByUserIdLibrariesSchema>
) {
  return db.query.libraries
    .findMany({
      columns: { likes: false },
      where: eq(libraries.userId, values.userId),
      extras: {
        likes: sql`cardinality(likes)`.as("likes"),
      },
    })
    .execute();
};

export const getLibraryOnlyByUser = function (
  values: z.infer<typeof selectLibrariesSchema>
) {
  return db.query.libraries
    .findFirst({
      columns: { likes: false },
      where: and(
        eq(libraries.id, values.id),
        eq(libraries.userId, values.userId)
      ),
      extras: {
        likes: count(libraries.likes).as("likes"),
      },
    })
    .execute();
};

export const createLibrary = function (
  values: z.infer<typeof insertLibrariesSchema>
) {
  return db.insert(libraries).values(values).returning().execute();
};

export const updateLibrary = function (
  selector: z.infer<typeof getLibrariesSchema>,
  values: Partial<z.infer<typeof insertLibrariesSchema>>
) {
  return db
    .update(libraries)
    .set(values)
    .where(eq(libraries.id, selector.id))
    .returning()
    .execute();
};

export const deleteLibraryOnlyByUser = function (
  values: z.infer<typeof selectLibrariesSchema>
) {
  return db
    .delete(libraries)
    .where(
      and(eq(libraries.id, values.id), eq(libraries.userId, values.userId))
    )
    .returning()
    .execute();
};

export const mapLibrariesWithAudioInfos = async function (
  libraries: Awaited<ReturnType<typeof getLibrariesOnlyByUser>>
) {
  const suno = await sunoApi;

  if (libraries.length === 0) return [];

  const songIds = libraries.map(({ id }) => id);
  const audioInfos = await suno.get(songIds);

  return audioInfos.map((audioInfo) => {
    const library = libraries.find((library) => library.id === audioInfo.id);
    return { audioInfo, library };
  });
};
