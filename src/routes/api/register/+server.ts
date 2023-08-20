import { db } from '$lib/database.js';
import { registerRequest } from '$lib/request/register.js';
import { users } from '$lib/schema.js';
import { json, error as responseError } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export async function POST({ request }) {
	const { name, email, password } = await request.json();
	const { error } = registerRequest.validate({ name, email, password });
	if (error) {
		throw responseError(400, {
			message: error.message
		});
	}
	const isUserExist = await db.select().from(users).where(eq(users.email, email));
	if (isUserExist.length > 0) {
		throw responseError(400, {
			message: 'user already exist'
		});
	}
	const hashPassword = await bcrypt.hash(password, 10);
	const user = await db.insert(users).values({
		name: name,
		email: email,
		password: hashPassword
	});

	return json(
		{
			data: user,
			message: 'register successfully',
			code: 201
		},
		{ status: 201 }
	);
}
