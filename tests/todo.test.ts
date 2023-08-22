import { sql } from 'drizzle-orm';
import { db } from '../src/lib/database';
import { test, expect } from '@playwright/test';
import { userFactory } from '../src/lib/factory/user';
import { todoFactory } from '../src/lib/factory/todo';

test.describe('test todo api', () => {
	test.beforeEach(async () => {
		await db.execute(sql`set FOREIGN_KEY_CHECKS=0`);
		await db.execute(sql`truncate users`);
		await db.execute(sql`truncate todos`);
		await db.execute(sql`set FOREIGN_KEY_CHECKS=1`);
		await userFactory(1, 'mytoken');
	});

	test('it can add new todo', async ({ request }) => {
		const res = await request.post('/api/authenticated/todos', {
			headers: {
				authorization: 'mytoken'
			},
			data: {
				title: 'title',
				description: 'description',
				order: 1
			}
		});
		const json = await res.json();
		expect(res.status()).toBe(201);
		expect(json.message).toBe('Todo added successfully');
	});

	test('it can get my todo', async ({ request }) => {
		await todoFactory(2, 1);
		const res = await request.get('/api/authenticated/todos', {
			headers: {
				authorization: 'mytoken'
			}
		});
		const json = await res.json();
		expect(res.status()).toBe(200);
		expect(json.message).toBe('get mytodo successfully');
	});

	test('it can update my todo', async ({ request }) => {
		await todoFactory(2, 1);
		const res = await request.put('/api/authenticated/todos/1', {
			headers: {
				authorization: 'mytoken'
			},
			data: {
				title: 'updated title',
				description: 'description',
				order: 1
			}
		});
		const json = await res.json();
		expect(res.status()).toBe(200);
		expect(json.message).toBe(`Todo 1 updated successfully`);
	});

	test('it can delete my todo', async ({ request }) => {
		await todoFactory(2, 1);
		const res = await request.delete('/api/authenticated/todos/1', {
			headers: {
				authorization: 'mytoken'
			}
		});
		const json = await res.json();
		expect(res.status()).toBe(200);
		expect(json.message).toBe(`Todo 1 deleted successfully`);
	});
});
