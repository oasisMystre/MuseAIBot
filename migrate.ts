import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import { createDB } from "./src/db";
import postgres from "postgres";
import { dbConfig } from "./src/config";

const db = createDB(postgres({ ...dbConfig, max: 1 }));

await migrate(db, {migrationsFolder: "./drizzle"});