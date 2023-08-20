import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
	return json({
		data: locals.user,
		message: 'myprofile successfully',
		code: 200
	});
}
