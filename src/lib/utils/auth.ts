import { goto } from "$app/navigation";
import { apiClient } from "$lib/utils/apiClient";

export function getAccessToken(): string | null {
	if (typeof localStorage === 'undefined') return null; // safety check for SSR
	return localStorage.getItem('accessToken');
}

export function getRefreshToken(): string | null {
	if (typeof localStorage === 'undefined') return null;
	return localStorage.getItem('refreshToken');
}

export function setTokens({
	accessToken,
	refreshToken,
	expiresIn
}: {
	accessToken: string;
	refreshToken: string;
	expiresIn: string;
}) {
	if (typeof localStorage === 'undefined') return;
	localStorage.setItem('accessToken', accessToken);
	localStorage.setItem('refreshToken', refreshToken);
	localStorage.setItem('expiresIn', expiresIn);
}

export function clearTokens() {
	if (typeof localStorage === 'undefined') return;
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
	localStorage.removeItem('expiresIn');
}

export async function refreshAccessToken(): Promise<boolean> {
	const refreshToken = getRefreshToken();
	if (!refreshToken) return false;

	try {
		const response: any = await apiClient.post('refresh-token', { refresh_token: refreshToken });
		const token = response?.data?.token;
		if (token) {
			setTokens({
				accessToken: token.access_token,
				refreshToken: token.refresh_token,
				expiresIn: token.expires_in
			});
			return true;
		}
		return false;
	} catch (err) {
		console.error('Failed to refresh token', err);
		clearTokens();
		return false;
	}
}

export async function requireAuth(redirectTo = '/auth/login'): Promise<void> {
	const token = getAccessToken();
	if (!token) {
		goto(redirectTo);
		throw new Error('Unauthorized');
	}

	// Contoh cek expire dari localStorage, lalu refresh token jika perlu
	const expiresIn = localStorage.getItem('expiresIn');
	if (expiresIn && Date.now() > Number(expiresIn)) {
		const success = await refreshAccessToken();
		if (!success) {
			goto(redirectTo);
			throw new Error('Token expired and refresh failed');
		}
	}
}
