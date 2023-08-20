import { sql } from 'drizzle-orm';
import { db } from '../src/lib/database';
import { test, expect } from '@playwright/test';
import { userFactory } from '../src/lib/factory/user';

test.describe('test auth middleware', () => {
	test.beforeEach(async () => {
		await db.execute(sql`set FOREIGN_KEY_CHECKS=0`);
		await db.execute(sql`truncate users`);
		await db.execute(sql`set FOREIGN_KEY_CHECKS=1`);
		await userFactory(1, 'mytoken');
	});

	test('it can validate with invalid token', async ({ request }) => {
		const res = await request.post('/api/authenticated/myprofile', {
			data: {
				email: 'email@gmail.com',
				password: 'Password1'
			},
			headers: {
				authorization: 'invalidtoken'
			}
		});
		const json = await res.json();
		expect(res.status()).toBe(401);
		expect(json.message).toEqual('invalid token');
	});

	test('it can validate with no token', async ({ request }) => {
		const res = await request.post('/api/authenticated/myprofile', {
			data: {
				email: 'email@gmail.com',
				password: 'Password1'
			}
		});
		const json = await res.json();
		expect(res.status()).toBe(401);
		expect(json.message).toEqual('unauthenticated');
	});
});
