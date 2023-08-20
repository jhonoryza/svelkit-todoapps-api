import { sql } from 'drizzle-orm';
import { db } from '../src/lib/database';
import { test, expect } from '@playwright/test';
import { userFactory } from '../src/lib/factory/user';

test.describe('test GET myprofile api', () => {
	test.beforeEach(async () => {
		await db.execute(sql`set FOREIGN_KEY_CHECKS=0`);
		await db.execute(sql`truncate users`);
		await db.execute(sql`set FOREIGN_KEY_CHECKS=1`);
		await userFactory(1, 'mytoken');
	});

	test('it can get myprofile with valid token', async ({ request }) => {
		const res = await request.get('/api/authenticated/myprofile', {
			headers: {
				authorization: 'mytoken'
			}
		});
		const json = await res.json();
		expect(res.status()).toBe(200);
		expect(json.message).toBe('get user profile successfully');
	});
});
