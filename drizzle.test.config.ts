import type { Config } from 'drizzle-kit';
import { loadEnv } from 'vite';

const env = loadEnv('test', process.cwd(), '');

export default {
	schema: 'src/lib/schema.ts',
	out: 'drizzle',
	driver: 'mysql2',
	dbCredentials: {
		user: env.DB_USER,
		password: env.DB_PASSWORD,
		host: env.DB_HOST,
		port: Number(env.DB_PORT),
		database: env.DB_DATABASE
	}
} satisfies Config;
