import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { loadEnv } from "vite";

const env = loadEnv(import.meta.env.MODE, process.cwd(), '')

const poolConnection = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  port: Number(env.DB_PORT)
});
 
export const db = drizzle(poolConnection);