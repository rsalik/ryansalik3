import type { ParamMatcher } from '@sveltejs/kit';
import projects from '$lib/projects.json';

export const match = ((param) => {
	return Object.keys(projects).includes(param);
}) satisfies ParamMatcher;
