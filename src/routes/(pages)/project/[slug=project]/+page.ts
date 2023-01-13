import type { PageLoad } from './$types';
import projects from '$lib/projects.json';

export const load = (({ params }) => {
	const keys = Object.keys(projects);

	return {
		project: projects[params.slug as keyof typeof projects],
		next: keys[keys.indexOf(params.slug) + 1] || keys[0],
		prev: keys[keys.indexOf(params.slug) - 1] || keys[keys.length - 1]
	};
}) satisfies PageLoad;
