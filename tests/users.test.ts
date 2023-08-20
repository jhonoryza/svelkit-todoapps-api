import { sql } from 'drizzle-orm';
import { db } from '../src/lib/database';
import { userFactory } from '../src/lib/factory/user';
import { test, expect } from '@playwright/test';

test.describe('test GET users api', () => {
	test.beforeEach(async () => {
		await db.execute(sql`set FOREIGN_KEY_CHECKS=0`);
		await db.execute(sql`truncate users`);
		await db.execute(sql`set FOREIGN_KEY_CHECKS=1`);
		await userFactory(10);
	});

	test('default list is works', async ({ request }) => {
		const res = await request.get('/api/users');
		const json = await res.json();
		expect(res.status()).toBe(200);
		expect(json.data.length).toEqual(10);
		expect(json.meta.size).toEqual(10);
		expect(json.meta.page).toEqual(1);
	});

	test('param ?page[size] is works', async ({ request }) => {
		const res = await request.get('/api/users?page[size]=4');
		const json = await res.json();
		expect(res.status()).toBe(200);
		expect(json.meta.size).toEqual(4);
		expect(json.meta.page).toEqual(1);
	});

	test('param ?page[number] is works', async ({ request }) => {
		const res = await request.get('/api/users?page[size]=3&page[number]=2');
		const json = await res.json();
		expect(res.status()).toBe(200);
		expect(json.meta.size).toEqual(3);
		expect(json.meta.page).toEqual(2);
		expect(json.data[0]?.id).toEqual(4);
	});
});
