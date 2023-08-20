import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
	return json({
		data: locals.user,
		message: 'get user profile successfully',
		code: 200
	});
}
