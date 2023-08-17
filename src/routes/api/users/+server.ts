import { db } from '$lib/database';
import { userResource } from '$lib/resource/user';
import { users } from '$lib/schema';
import { json } from '@sveltejs/kit';

export async function GET() {
	const data = await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
        updated_at: users.updated_at,
        created_at: users.created_at
    }).from(users).limit(5).offset(0)

    return json(
		{
            data: userResource(data),
			code: 200
		},
		{ status: 200 }
	);
}
