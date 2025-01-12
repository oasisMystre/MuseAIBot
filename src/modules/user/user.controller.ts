
import { eq } from "drizzle-orm";

import { insertUsersSchema, users, getUsersSchema } from "../../schema";
import { db } from "../../db";

export const getOrCreateUser = async function (
  values: Zod.infer<typeof insertUsersSchema>
) {
  return db
    .insert(users)
    .values(values)
    .onConflictDoUpdate({
      target: users.id,
      set: values
    })
    .returning();
};

export const deleteUser = async function (
  values: Zod.infer<typeof getUsersSchema>
) {
  return db.delete(users).where(eq(users.id, values.id!)).returning();
};
