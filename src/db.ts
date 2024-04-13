import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import schema from "./schema";
import { dbConfig } from "./config";

export function createDB(connection: ReturnType<typeof postgres>) {
  const db = drizzle(connection, { schema });
  return db;
}

export const db = createDB(postgres(dbConfig));
