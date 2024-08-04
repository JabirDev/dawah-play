// import pg from "pg";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

// const pool = new pg.Pool();
const client = postgres(process.env.DIRECT_URL!, { max: 1 });
export const db = drizzle(client);
