<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { requireAuth } from '$lib/utils/auth';
	import { onMount } from 'svelte';
	import '../../app.css';
	import menu from '$lib/utils/menu';
	
	let { children } = $props();
	let isReady: boolean = $state(false);

	onMount(async () => {
		try {
			await requireAuth();
			isReady = true;
		} catch {
			// Do nothing
		}
	});
</script>

{#if isReady}
	<div class="flex min-h-screen flex-col">
		<div class="flex flex-col md:flex-row">
			<Sidebar {menu} />

			<main
				class="min-h-screen bg-[#FAFAFA] p-4 transition-colors duration-300 sm:p-8 md:flex-[6] dark:bg-gray-900"
			>
				<Header />

				{@render children()}
				<footer
					class="bottom-0 mt-10 w-full bg-gray-300 p-4 text-center text-sm transition-colors duration-300 dark:bg-gray-800 dark:text-gray-400"
				>
					footer
				</footer>
			</main>
		</div>
	</div>
{/if}
