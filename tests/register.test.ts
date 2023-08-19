import { sql } from 'drizzle-orm';
import { db } from '../src/lib/database';
import { test, expect } from '@playwright/test';
import { users } from '../src/lib/schema';

test.describe('test POST register api', () => {
	test.beforeEach(async () => {
		await db.execute(sql`set FOREIGN_KEY_CHECKS=0`);
		await db.execute(sql`truncate users`);
		await db.execute(sql`set FOREIGN_KEY_CHECKS=1`);
	});

	test('it can register user', async ({ request }) => {
		const res = await request.post('/api/register', {
			data : {
				name: 'fajar sp',
				email: 'email@gmail.com',
				password: 'Password123456'
			}
		});
		const json = await res.json();
		expect(res.status()).toBe(201);
		expect(json.message).toEqual('user created successfully');
	});

	test('it can validate exists user', async ({ request }) => {
        await db.insert(users).values({
            name: 'fajar sp',
            email: 'email@gmail.com',
            password: 'Password123456'
        })
        const res = await request.post('/api/register', {
			data: {
				name: 'agung sp',
				email: 'email@gmail.com',
				password: 'Password123456'
			}
		});
		const json = await res.json();
		expect(res.status()).toBe(400);
		expect(json.message).toEqual('user already exist');
	});

	test('it can validate required field', async ({ request }) => {
		const res = await request.post('/api/register', {
			data: {
				name: 'fajar sp',
				email: '',
				password: 'Password123456'
			}
		});
		const json = await res.json();
		expect(res.status()).toBe(400);
		expect(json.message).toEqual('"email" is not allowed to be empty');
	});
});
