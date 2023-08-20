import { db } from '$lib/database';
import { logger } from '$lib/logger';
import { users } from '$lib/schema';
import type { Handle } from '@sveltejs/kit';
import { error as responseError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { eq } from 'drizzle-orm';

const authMiddleware: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api/authenticated')) {
		const token = event.request.clone().headers.get('authorization');
		if (!token) {
			throw responseError(401, {
				message: 'unauthenticated'
			});
		}
		const user = (await db.select().from(users).where(eq(users.token, token)).limit(1)).at(0);
		if (!user) {
			throw responseError(401, {
				message: 'invalid token'
			});
		}
		event.locals.user = user;
	}
	return await resolve(event)
}

const loggingMiddleware: Handle = async ({ event, resolve }) => {
	const resp: Response = await resolve(event);
	if (resp.status >= 400) {
		logger.info(await resp.clone().json());
	}
	return resp;
}

export const handle: Handle = sequence(authMiddleware, loggingMiddleware);
