import { apiClient } from "./apiClient";

export async function login(email: string, password: string) {
    return await apiClient.post('/login', { email, password });
}

export async function register(email: string, password: string) {
    return await apiClient.post('/register', { email, password });
}

export async function logout() {
    return await apiClient.post('/logout', {});
}

export async function dashboard() {
    return await apiClient.get('/dashboard');
}

export async function profile() {
    return await apiClient.get('/profile');
}