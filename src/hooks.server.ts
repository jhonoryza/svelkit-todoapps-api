import { logger } from '$lib/logger';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const resp: Response = await resolve(event);
	if (resp.status >= 400) {
        logger.info(await resp.clone().json());
	}
	return resp
};
