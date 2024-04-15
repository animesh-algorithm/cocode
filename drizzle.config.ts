import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
  console.log("🔴 Cannot find database url");
}

export default {
  schema: "./src/lib/supabase/schema.ts",
  out: "./migrations",
  driver: "pg",
  verbose: true,
  strict: true,
  dbCredentials: {
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL || "",
  },
} satisfies Config;
