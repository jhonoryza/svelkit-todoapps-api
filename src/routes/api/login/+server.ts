import { db } from '$lib/database.js';
import { loginRequest } from '$lib/request/login.js';
import { users } from '$lib/schema.js';
import { json, error as responseError } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export async function POST({ request }) {
	const { email, password } = await request.json();
	const { error } = loginRequest.validate({ email, password });
	if (error) {
		throw responseError(400, {
			message: error.message
		});
	}

	const user = (await db.select().from(users).where(eq(users.email, email)).limit(1)).at(0);

	if (!user || (await bcrypt.compare(password, user.password)) === false) {
		throw responseError(400, {
			message: 'email or password is invalid'
		});
	}

    const token = uuidv4()
	await db
		.update(users)
		.set({
			token: token
		})
		.where(eq(users.id, user.id));

    return json(
        {
            token: token,
            message: 'login successfully',
            code: 200
        }
    )
}
