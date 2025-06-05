<script lang="ts">
	import { goto } from '$app/navigation';
	import { apiClient } from '$lib/utils/apiClient';
	import { APP_NAME } from '$lib/utils/constants';
	import { onMount } from 'svelte';

	let isReady = false;
	let email = '';
	let password = '';
	let isLoading = false;
	let showPassword = false;
	let errors: { [key: string]: string } = {};

	async function handleLogin(event: Event) {
		event.preventDefault();
		isLoading = true;
		errors = {};

		if (!email) errors.email = 'Email wajib diisi';
		if (!password) errors.password = 'Password wajib diisi';

		if (Object.keys(errors).length > 0) {
			isLoading = false;
			return;
		}

		try {
			const response: any = await apiClient.post('login', { email, password });
			
			const token = response?.data?.token;
			const refreshToken = token?.refresh_token;
			const accessToken = token?.access_token;
			const expiresIn = token?.expires_in;
			
			if (token) {
				localStorage.setItem('refreshToken', refreshToken);
				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('expiresIn', expiresIn);
				
				goto('/dashboard/overview');
			}
		} catch (error: any) {
			if (error.response) {
				const errorData = await error.response.json();
				errors.general = errorData.message;
			} else {
				errors.general = 'Something went wrong. Please try again.';
			}
		} finally {
			isLoading = false;
		}
	}

	async function handleOAuthLogin(provider: string) {
		try {
			console.log(`OAuth login with ${provider}`);
			// Implement OAuth logic here
			// window.location.href = `/auth/${provider}`;
		} catch (error) {
			console.error('OAuth error:', error);
		}
	}

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}

	onMount(() => {
		isReady = true;
	})
</script>

<svelte:head>
	<title>Login - {APP_NAME}</title>
</svelte:head>

{#if isReady}
	<div
		class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12 sm:px-6 lg:px-8"
	>
		<div class="w-full max-w-md space-y-8">
			<!-- Logo and Header -->
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
				>
					<svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						/>
					</svg>
				</div>
				<h2 class="text-3xl font-bold text-gray-900">Masuk ke Akun</h2>
				<p class="mt-2 text-sm text-gray-600">
					Belum punya akun?
					<a href="/register" class="font-medium text-blue-600 transition-colors hover:text-blue-500">
						Daftar di sini
					</a>
				</p>
			</div>

			<!-- Login Form -->
			<form class="mt-8 space-y-6 rounded-xl bg-white p-8 shadow-lg" on:submit={handleLogin}>
				{#if errors.general}
					<div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
						{errors.general}
					</div>
				{/if}

				<div class="space-y-4">
					<!-- Email Input -->
					<div>
						<label for="email" class="mb-1 block text-sm font-medium text-gray-700"> Email </label>
						<input
							id="email"
							name="email"
							type="email"
							bind:value={email}
							autocomplete="email"
							required
							class="relative block w-full appearance-none border px-3 py-3 {errors.email
								? 'border-red-300'
								: 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-500 transition-colors focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
							placeholder="Masukkan email Anda"
						/>
						{#if errors.email}
							<p class="mt-1 text-sm text-red-600">{errors.email}</p>
						{/if}
					</div>

					<!-- Password Input -->
					<div>
						<label for="password" class="mb-1 block text-sm font-medium text-gray-700">
							Password
						</label>
						<div class="relative">
							<input
								id="password"
								name="password"
								type={showPassword ? 'text' : 'password'}
								bind:value={password}
								autocomplete="current-password"
								required
								class="relative block w-full appearance-none border px-3 py-3 pr-10 {errors.password
									? 'border-red-300'
									: 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-500 transition-colors focus:z-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
								placeholder="Masukkan password Anda"
							/>
							<button
								type="button"
								class="absolute inset-y-0 right-0 flex items-center pr-3"
								on:click={togglePasswordVisibility}
							>
								<svg
									class="h-5 w-5 text-gray-400 hover:text-gray-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									{#if showPassword}
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
										/>
									{:else}
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									{/if}
								</svg>
							</button>
						</div>
						{#if errors.password}
							<p class="mt-1 text-sm text-red-600">{errors.password}</p>
						{/if}
					</div>
				</div>

				<!-- Remember me and Forgot password -->
				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
						/>
						<label for="remember-me" class="ml-2 block text-sm text-gray-900"> Ingat saya </label>
					</div>

					<div class="text-sm">
						<a
							href="/forgot-password"
							class="font-medium text-blue-600 transition-colors hover:text-blue-500"
						>
							Lupa password?
						</a>
					</div>
				</div>

				<!-- Submit Button -->
				<div>
					<button
						type="submit"
						disabled={isLoading}
						class="group relative flex w-full transform justify-center rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
					>
						{#if isLoading}
							<svg class="mr-3 -ml-1 h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Memproses...
						{:else}
							Masuk
						{/if}
					</button>
				</div>

				<!-- Divider -->
				<div class="mt-6">
					<div class="relative">
						<div class="absolute inset-0 flex items-center">
							<div class="w-full border-t border-gray-300"></div>
						</div>
						<div class="relative flex justify-center text-sm">
							<span class="bg-white px-2 text-gray-500">Atau masuk dengan</span>
						</div>
					</div>
				</div>

				<!-- OAuth Buttons -->
				<div class="mt-6 grid grid-cols-1 gap-3">
					<button
						type="button"
						on:click={() => handleOAuthLogin('google')}
						class="inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-500 shadow-sm transition-colors hover:bg-gray-50"
					>
						<svg class="mr-2 h-5 w-5" viewBox="0 0 24 24">
							<path
								fill="#4285F4"
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							/>
							<path
								fill="#34A853"
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							/>
							<path
								fill="#FBBC05"
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							/>
							<path
								fill="#EA4335"
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							/>
						</svg>
						Masuk dengan Google
					</button>

					<button
						type="button"
						on:click={() => handleOAuthLogin('github')}
						class="inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-500 shadow-sm transition-colors hover:bg-gray-50"
					>
						<svg class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
								clip-rule="evenodd"
							/>
						</svg>
						Masuk dengan GitHub
					</button>
				</div>
			</form>
		</div>
	</div>
{:else}
	<slot />
{/if}

