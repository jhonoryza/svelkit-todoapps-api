import { sql } from 'drizzle-orm';
import { db } from '../src/lib/database';
import { test, expect } from '@playwright/test';
import { userFactory } from '../src/lib/factory/user';

test.describe('test POST login api', () => {
	test.beforeEach(async () => {
		await db.execute(sql`set FOREIGN_KEY_CHECKS=0`);
		await db.execute(sql`truncate users`);
		await db.execute(sql`set FOREIGN_KEY_CHECKS=1`);
		await userFactory(1)
	});

	test('it can login', async ({ request }) => {
		const res = await request.post('/api/login', {
			data : {
				email: 'email1@email.com',
				password: 'Password1'
			}
		});
		const json = await res.json();
		expect(res.status()).toBe(200);
		expect(json.token).not.toBeNull();
	});

	test('it can validate wrong email', async ({ request }) => {
        const res = await request.post('/api/login', {
			data: {
				email: 'email@gmail.com',
				password: 'Password1'
			}
		});
		const json = await res.json();
		expect(res.status()).toBe(400);
		expect(json.message).toEqual('email or password is invalid');
	});

	test('it can validate wrong pass', async ({ request }) => {
		const res = await request.post('/api/login', {
			data: {
				email: 'email1@email.com',
				password: 'Password123456'
			}
		});
		const json = await res.json();
		expect(res.status()).toBe(400);
		expect(json.message).toEqual('email or password is invalid');
	});
});
