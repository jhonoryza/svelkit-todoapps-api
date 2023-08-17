import { db } from '$lib/database';
import { users } from '$lib/schema';
import { json } from '@sveltejs/kit';

export async function GET() {
	const data = (await db.select().from(users).limit(5).offset(0)).values()
    return json(
		{
            data,
			code: 200
		},
		{ status: 200 }
	);
}
