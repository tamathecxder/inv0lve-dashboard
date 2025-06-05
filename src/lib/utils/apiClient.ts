import ky from 'ky';

const api = ky.create({
	prefixUrl: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	hooks: {
		beforeRequest: [
			request => {
				const token = localStorage.getItem('token');
				if (token) {
					request.headers.set('Authorization', `Bearer ${token}`);
				}
			}
		]
	}
});

export const apiClient = {
	get: (url: string) => api.get(url).json(),
	post: (url: string, data: unknown) => api.post(url, { json: data }).json()
};
