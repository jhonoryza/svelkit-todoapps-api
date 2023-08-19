import { logger } from '$lib/logger';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const resp = await resolve(event);
	if (resp.status === 400) {
		const data = await resp.json();
        logger.error(data.message);
	}
	return resp
};
