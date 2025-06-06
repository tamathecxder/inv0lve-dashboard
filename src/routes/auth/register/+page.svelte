<script lang="ts">
	import { APP_NAME } from '$lib/utils/constants';
	import { onMount } from 'svelte';

	let isReady = false;
	let fullName = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let isLoading = false;
	let showPassword = false;
	let showConfirmPassword = false;
	let errors: { [key: string]: string } = {};
	let acceptTerms = false;

	// Password strength indicator
	$: passwordStrength = calculatePasswordStrength(password);

	function calculatePasswordStrength(pass: string) {
		if (!pass) return { score: 0, text: '', color: '' };

		let score = 0;
		if (pass.length >= 8) score++;
		if (/[a-z]/.test(pass)) score++;
		if (/[A-Z]/.test(pass)) score++;
		if (/\d/.test(pass)) score++;
		if (/[^a-zA-Z\d]/.test(pass)) score++;

		const levels = [
			{ score: 0, text: '', color: '' },
			{ score: 1, text: 'Sangat Lemah', color: 'bg-red-500' },
			{ score: 2, text: 'Lemah', color: 'bg-orange-500' },
			{ score: 3, text: 'Sedang', color: 'bg-yellow-500' },
			{ score: 4, text: 'Kuat', color: 'bg-green-500' },
			{ score: 5, text: 'Sangat Kuat', color: 'bg-green-600' }
		];

		return levels[score] || levels[0];
	}

	// Handle form submission
	async function handleRegister(event: Event) {
		event.preventDefault();
		isLoading = true;
		errors = {};

		// Validation
		if (!fullName.trim()) errors.fullName = 'Nama lengkap wajib diisi';
		if (!email) errors.email = 'Email wajib diisi';
		if (!password) errors.password = 'Password wajib diisi';
		if (password.length < 8) errors.password = 'Password minimal 8 karakter';
		if (password !== confirmPassword) errors.confirmPassword = 'Konfirmasi password tidak cocok';
		if (!acceptTerms) errors.terms = 'Anda harus menyetujui syarat dan ketentuan';

		if (Object.keys(errors).length > 0) {
			isLoading = false;
			return;
		}

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Handle successful registration here
			console.log('Registration attempt:', { fullName, email, password });

			// Redirect to login or dashboard
			// goto('/login');
		} catch (error) {
			errors.general = 'Registrasi gagal. Silakan coba lagi.';
		} finally {
			isLoading = false;
		}
	}

	// Handle OAuth registration
	async function handleOAuthRegister(provider: string) {
		try {
			console.log(`OAuth registration with ${provider}`);
			// Implement OAuth logic here
			// window.location.href = `/auth/${provider}`;
		} catch (error) {
			console.error('OAuth error:', error);
		}
	}

	function togglePasswordVisibility(field: string) {
		if (field === 'password') {
			showPassword = !showPassword;
		} else {
			showConfirmPassword = !showConfirmPassword;
		}
	}

	onMount(() => {
		isReady = true;
	})
</script>

<svelte:head>
	<title>Register - {APP_NAME}</title>
</svelte:head>

{#if isReady}
	<div
		class="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 px-4 py-12 sm:px-6 lg:px-8"
	>
		<div class="w-full max-w-md space-y-8">
			<!-- Logo and Header -->
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
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
				<h2 class="text-3xl font-bold text-gray-900">Buat Akun Baru</h2>
				<p class="mt-2 text-sm text-gray-600">
					Sudah punya akun?
					<a
						href="/login"
						class="font-medium text-purple-600 transition-colors hover:text-purple-500"
					>
						Masuk di sini
					</a>
				</p>
			</div>

			<!-- Registration Form -->
			<form class="mt-8 space-y-6 rounded-xl bg-white p-8 shadow-lg" on:submit={handleRegister}>
				{#if errors.general}
					<div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
						{errors.general}
					</div>
				{/if}

				<div class="space-y-4">
					<!-- Full Name Input -->
					<div>
						<label for="fullName" class="mb-1 block text-sm font-medium text-gray-700">
							Nama Lengkap
						</label>
						<input
							id="fullName"
							name="fullName"
							type="text"
							bind:value={fullName}
							autocomplete="name"
							required
							class="relative block w-full appearance-none border px-3 py-3 {errors.fullName
								? 'border-red-300'
								: 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-500 transition-colors focus:z-10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:text-sm"
							placeholder="Masukkan nama lengkap Anda"
						/>
						{#if errors.fullName}
							<p class="mt-1 text-sm text-red-600">{errors.fullName}</p>
						{/if}
					</div>

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
								: 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-500 transition-colors focus:z-10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:text-sm"
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
								autocomplete="new-password"
								required
								class="relative block w-full appearance-none border px-3 py-3 pr-10 {errors.password
									? 'border-red-300'
									: 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-500 transition-colors focus:z-10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:text-sm"
								placeholder="Masukkan password Anda"
							/>
							<button
								type="button"
								class="absolute inset-y-0 right-0 flex items-center pr-3"
								on:click={() => togglePasswordVisibility('password')}
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

						<!-- Password Strength Indicator -->
						{#if password && passwordStrength.score > 0}
							<div class="mt-2">
								<div class="flex items-center space-x-2">
									<div class="h-2 flex-1 rounded-full bg-gray-200">
										<div
											class="h-2 rounded-full transition-all duration-300 {passwordStrength.color}"
											style="width: {(passwordStrength.score / 5) * 100}%"
										></div>
									</div>
									<span class="text-xs text-gray-600">{passwordStrength.text}</span>
								</div>
							</div>
						{/if}

						{#if errors.password}
							<p class="mt-1 text-sm text-red-600">{errors.password}</p>
						{/if}
					</div>

					<!-- Confirm Password Input -->
					<div>
						<label for="confirmPassword" class="mb-1 block text-sm font-medium text-gray-700">
							Konfirmasi Password
						</label>
						<div class="relative">
							<input
								id="confirmPassword"
								name="confirmPassword"
								type={showConfirmPassword ? 'text' : 'password'}
								bind:value={confirmPassword}
								autocomplete="new-password"
								required
								class="relative block w-full appearance-none border px-3 py-3 pr-10 {errors.confirmPassword
									? 'border-red-300'
									: 'border-gray-300'} rounded-lg text-gray-900 placeholder-gray-500 transition-colors focus:z-10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:text-sm"
								placeholder="Konfirmasi password Anda"
							/>
							<button
								type="button"
								class="absolute inset-y-0 right-0 flex items-center pr-3"
								on:click={() => togglePasswordVisibility('confirm')}
							>
								<svg
									class="h-5 w-5 text-gray-400 hover:text-gray-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									{#if showConfirmPassword}
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
						{#if errors.confirmPassword}
							<p class="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
						{/if}
					</div>
				</div>

				<!-- Terms and Conditions -->
				<div class="flex items-start">
					<div class="flex h-5 items-center">
						<input
							id="acceptTerms"
							name="acceptTerms"
							type="checkbox"
							bind:checked={acceptTerms}
							class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for="acceptTerms" class="text-gray-700">
							Saya menyetujui
							<a href="/terms" class="font-medium text-purple-600 hover:text-purple-500"
								>Syarat dan Ketentuan</a
							>
							serta
							<a href="/privacy" class="font-medium text-purple-600 hover:text-purple-500"
								>Kebijakan Privasi</a
							>
						</label>
						{#if errors.terms}
							<p class="mt-1 text-sm text-red-600">{errors.terms}</p>
						{/if}
					</div>
				</div>

				<!-- Submit Button -->
				<div>
					<button
						type="submit"
						disabled={isLoading}
						class="group relative flex w-full transform justify-center rounded-lg border border-transparent bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
							Membuat akun...
						{:else}
							Daftar Sekarang
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
							<span class="bg-white px-2 text-gray-500">Atau daftar dengan</span>
						</div>
					</div>
				</div>

				<!-- OAuth Buttons -->
				<div class="mt-6 grid grid-cols-1 gap-3">
					<button
						type="button"
						on:click={() => handleOAuthRegister('google')}
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
						Daftar dengan Google
					</button>

					<button
						type="button"
						on:click={() => handleOAuthRegister('github')}
						class="inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-500 shadow-sm transition-colors hover:bg-gray-50"
					>
						<svg class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
								clip-rule="evenodd"
							/>
						</svg>
						Daftar dengan GitHub
					</button>
				</div>
			</form>
		</div>
	</div>
{:else}
	<slot />
{/if}
