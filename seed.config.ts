import { SeedPostgres } from "@snaplet/seed/adapter-postgres";
import { defineConfig } from "@snaplet/seed/config";
import postgres from "postgres";

export default defineConfig({
  adapter: () => {
    const password = import.meta.env.VITE_DB_PASSWORD;
    const client = postgres(
      `postgres://postgres.ltvozwxmtlodnvmcjhst:${password}@aws-0-eu-central-1.pooler.supabase.com:5432/postgres`
    );
    return new SeedPostgres(client);
  },
  select: [
    "!*",
    // We want to alter all the tables under public schema
    "public*",
  ],
});
