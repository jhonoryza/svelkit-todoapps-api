import { db } from '$lib/database';
import { todoResource } from '$lib/resource/todo';
import { todos } from '$lib/schema';
import { json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { error as responseError } from '@sveltejs/kit';
import { todoSaveRequest } from '$lib/request/todo';

export const GET = (async ({ locals, url }) => {
	const size: number = url.searchParams.get('page[size]')
		? Number(url.searchParams.get('page[size]'))
		: 10;
	const page: number = url.searchParams.get('page[number]')
		? Number(url.searchParams.get('page[number]'))
		: 1;
	const offset = page > 0 ? (page - 1) * size : 0;

	const data = await db
		.select()
		.from(todos)
		.where(eq(todos.user_id, locals.user.id))
		.limit(size)
		.offset(offset);

	return json(
		{
            message: 'get mytodo successfully',
			data: todoResource(data),
			code: 200,
			meta: {
				page: page,
				size: size
			}
		},
		{ status: 200 }
	);
}) satisfies RequestHandler;

export const POST = (async ({ locals, request }) => {
	const { title, description, order } = await request.json();
	const { error } = todoSaveRequest.validate({ title, description, order });
	if (error) {
		throw responseError(400, {
			message: error.message
		});
	}
	const todo = await db.insert(todos).values({
		title: title,
		description: description,
		order: order,
		user_id: locals.user.id
	});
	return json(
		{
			data: todo,
			message: 'Todo added successfully',
			code: 201
		},
		{ status: 201 }
	);
}) satisfies RequestHandler;
