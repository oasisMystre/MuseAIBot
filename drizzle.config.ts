import "dotenv/config";
import type { Config } from "drizzle-kit";

import { dbConfig } from "./src/config";

export default {
  schema: ["./src/schema.ts"],
  out: "./drizzle",
  driver: "pg",
  dbCredentials: dbConfig,
} satisfies Config;
