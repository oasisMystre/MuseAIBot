
import { eq } from "drizzle-orm";

import { db } from "../../db";
import { getTokensSchema, insertTokensSchema, tokens } from "../../schema";

export const getTokenByKey = async function (
  values: Zod.infer<typeof getTokensSchema>
) {
  return db.query.tokens.findFirst({
    where: eq(tokens.key, values.key),
    with: {
      user: true,
    },
  });
};

export const getTokenByUserId = async function (
  values: Zod.infer<typeof insertTokensSchema>
) {
  return db
    .insert(tokens)
    .values(values)
    .onConflictDoUpdate({
      target: [tokens.userId],
      set: {
        userId: values.userId,
      },
    })
    .returning();
};
