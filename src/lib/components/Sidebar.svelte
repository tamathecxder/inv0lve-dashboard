<script lang="ts">
    import { page } from '$app/stores';
    export let menu: { name: string; href: string; icon: string }[]
</script>

<aside
	class="border-b border-gray-100 p-4 transition-colors duration-300 md:flex-[1] md:border-r md:border-b-0 dark:border-gray-700 dark:bg-gray-800"
>
	<div class="mb-16 flex flex-row items-center justify-start gap-4">
		<img src="/assets/book-square.png" alt="logo" class="w-12" />
		<h1 class="text-hytam text-2xl font-bold dark:text-white">NUEGAS</h1>
	</div>

	<ul class="flex flex-col gap-6">
		{#each menu as item}
			<li
				class="hover:bg-cloud dark:hover:bg-gray-700 cursor-pointer rounded-lg px-5 py-3 duration-300 ease-in hover:px-7 hover:py-5 {$page
					.url.pathname === item.href
					? 'bg-cloud text-hytam border border-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
					: 'text-secondary dark:text-gray-300'}"
			>
				<a href={item.href} class="flex flex-row items-center gap-4 font-semibold">
					<img src={item.icon} alt={item.name} class="w-6 invert dark:invert-0" />
					<span>{item.name}</span>
				</a>
			</li>
		{/each}
	</ul>
</aside>
