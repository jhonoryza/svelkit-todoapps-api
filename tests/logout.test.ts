import { sql } from 'drizzle-orm';
import { db } from '../src/lib/database';
import { test, expect } from '@playwright/test';
import { userFactory } from '../src/lib/factory/user';

test.describe('test DELETE logout api', () => {
	test.beforeEach(async () => {
		await db.execute(sql`set FOREIGN_KEY_CHECKS=0`);
		await db.execute(sql`truncate users`);
		await db.execute(sql`set FOREIGN_KEY_CHECKS=1`);
		await userFactory(1, 'mytoken');
	});

	test('it can logout', async ({ request }) => {
		const res = await request.delete('/api/authenticated/logout', {
			headers: {
				authorization: 'mytoken'
			}
		});
		const json = await res.json();
		expect(res.status()).toBe(200);
		expect(json.message).toBe('Logged out successfully');
	});
});
