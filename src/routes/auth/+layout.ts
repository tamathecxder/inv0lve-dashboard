import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = async () => {
	if (typeof localStorage === 'undefined') return {};
	
	const accessToken = localStorage.getItem('accessToken');

	if (accessToken) {
		throw redirect(302, '/dashboard/overview');
	}

	return {};
};