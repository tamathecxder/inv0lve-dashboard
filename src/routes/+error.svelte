<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

    onMount(() => {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-hytam ease-in duration-100">
	<img src="/assets/not-found.svg" alt="404" class="w-96" />
	<h1 class="text-9xl font-bold text-gray-700">{page?.status}</h1>
	<p class="text-3xl font-semibold text-gray-700">{page?.error?.message}</p>
    <button type="button" class="cursor-pointer hover:opacity-80 ease-in duration-150 mt-10 py-3 px-5 bg-gray-700 text-white rounded-lg" on:click={() => goto('/')}>Back to Home</button>
</div>
