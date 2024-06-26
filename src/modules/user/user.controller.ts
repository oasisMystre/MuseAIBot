import type { z } from "zod";
import { eq } from "drizzle-orm";

import { insertUsersSchema, users, getUsersSchema } from "../../schema";
import { db } from "../../db";

export const getOrCreateUser = async function (
  values: z.infer<typeof insertUsersSchema>
) {
  return db
    .insert(users)
    .values(values)
    .onConflictDoUpdate({
      target: users.id,
      set: {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
      },
    })
    .returning();
};

export const deleteUser = async function (
  values: z.infer<typeof getUsersSchema>
) {
  return db.delete(users).where(eq(users.id, values.id!)).returning();
};
