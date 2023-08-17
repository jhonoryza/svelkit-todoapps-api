import { db } from '$lib/database';
import { userResource } from '$lib/resource/user';
import { users } from '$lib/schema';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const size: number = url.searchParams.get('page[size]') ? Number(url.searchParams.get('page[size]')) : 10;
	const page: number = url.searchParams.get('page[number]')
		? Number(url.searchParams.get('page[number]'))
		: 1;
	const offset = page > 0 ? (page - 1) * size : 0;

	const data = await db
		.select({
			id: users.id,
			name: users.name,
			email: users.email,
			updated_at: users.updated_at,
			created_at: users.created_at
		})
		.from(users)
		.limit(size)
		.offset(offset);

	return json(
		{
			data: userResource(data),
			code: 200,
			meta: {
				page: page,
				size: size
			}
		},
		{ status: 200 }
	);
}
