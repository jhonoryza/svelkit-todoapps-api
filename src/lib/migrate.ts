import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { loadEnv } from 'vite';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { askQuestion } from './util';

const ans = await askQuestion('input your environment: (default: development)') || 'development';
if (ans == '') process.exit(0)

const env = loadEnv(String(ans), process.cwd(), '');
const poolConnection = mysql.createPool({
	host: env.DB_HOST,
	user: env.DB_USER,
	password: env.DB_PASSWORD,
	database: env.DB_DATABASE,
	port: Number(env.DB_PORT)
});
const db = drizzle(poolConnection);

async function main() {
	console.log('migration start ..!');
    await migrate(db, { migrationsFolder: "drizzle" });
	console.log('migration success ..!');
	process.exit(0);
}

await main().catch(console.error);
process.exit(0)

