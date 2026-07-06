import type { Handle } from '@sveltejs/kit';
import { PROJECT_NAME, PROJECT_DESCRIPTION, PROJECT_OG_DESCRIPTION, PROJECT_URL } from '$lib/scripts/project.ts';

// Placeholders in app.html are replaced at prerender time, so crawlers without
// JavaScript (Facebook, Telegram, ...) see the final metadata.
const replacements: Record<string, string> = {
	'%project.name%': PROJECT_NAME,
	'%project.description%': PROJECT_DESCRIPTION,
	'%project.ogDescription%': PROJECT_OG_DESCRIPTION,
	'%project.url%': PROJECT_URL,
};

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		transformPageChunk: ({ html }): string => {
			let result = html;
			for (const [key, value] of Object.entries(replacements)) result = result.replaceAll(key, value);
			return result;
		},
	});
};
