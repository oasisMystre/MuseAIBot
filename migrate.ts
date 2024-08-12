import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import { createDB } from "./src/db";
import postgres from "postgres";

const db = createDB(postgres(process.env.DATABASE_URL!));

await migrate(db, { migrationsFolder: "./drizzle" });
