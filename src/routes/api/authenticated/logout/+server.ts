import { db } from '$lib/database.js';
import { users } from '$lib/schema.js';
import { json, error as responsError } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function DELETE({ locals }) {
	await db
		.update(users)
		.set({
			token: null
		})
		.where(eq(users.id, locals.user.id))
        .catch(err => {
            throw responsError(400, {
                message: err
            })
        });
	return json({
		data: locals.user,
        message: 'Logged out successfully',
		code: 200
	});
}
