import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	workers: 1,
	webServer: {
		command: 'npm run dev:test',
		port: 8000
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
