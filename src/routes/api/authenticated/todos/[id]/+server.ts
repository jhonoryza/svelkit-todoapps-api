import { db } from '$lib/database';
import { todos } from '$lib/schema';
import { json, type RequestHandler } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { error as responseError } from '@sveltejs/kit';
import { todoSaveRequest } from '$lib/request/todo';

export const PUT = (async ({ params, locals, request }) => {
	const { title, description, order } = await request.json();
	const { error } = todoSaveRequest.validate({ title, description, order });
	if (error) {
		throw responseError(400, {
			message: error.message
		});
	}
	const mytodo = (
		await db
			.select()
			.from(todos)
			.where(eq(todos.user_id, locals.user.id))
			.where(eq(todos.id, Number(params.id)))
			.limit(1)
	).at(0);
	if (!mytodo) {
		throw responseError(404, {
			message: 'Todo not found'
		});
	}
	await db
		.update(todos)
		.set({
			title: title,
			description: description,
			order: order
		})
		.where(eq(todos.user_id, locals.user.id))
		.where(eq(todos.id, Number(mytodo.id)))
		.catch((err) => {
			throw responseError(400, {
				message: err
			});
		});

	return json({
		message: `Todo ${mytodo.id} updated successfully`,
		code: 200
	});
}) satisfies RequestHandler;

export const DELETE = (async ({ locals, params }) => {
	const mytodo = (
		await db
			.select()
			.from(todos)
			.where(and(eq(todos.user_id, locals.user.id), eq(todos.id, Number(params.id))))
			.limit(1)
	).at(0);
	if (!mytodo) {
		throw responseError(404, {
			message: 'Todo not found'
		});
	}
	await db
		.delete(todos)
		.where(and(eq(todos.user_id, locals.user.id), eq(todos.id, Number(params.id))))
		.catch((err) => {
			throw responseError(400, {
				message: err
			});
		});

	return json({
		data: mytodo,
		message: `Todo ${mytodo.id} deleted successfully`,
		code: 200
	});
}) satisfies RequestHandler;
