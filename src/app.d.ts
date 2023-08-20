// See https://kit.svelte.dev/docs/types#app
import type { user } from "$lib/model/user";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: user
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
