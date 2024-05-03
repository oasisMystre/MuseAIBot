import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import schema from "./schema";

export function createDB(connection: ReturnType<typeof postgres>) {
  const db = drizzle(connection, { schema });
  return db;
}

export const db = createDB(postgres(process.env.DATABASE_URL!));
