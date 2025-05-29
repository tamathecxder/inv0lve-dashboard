<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../../app.css';

	let { children } = $props();

	const menu: { name: string; href: string, icon: string }[] = [
		{
			name: 'Overview',
			href: '/',
			icon: '/assets/overview.svg',
		},
		{
			name: 'Task',
			href: '/Task',
			icon: '/assets/task.svg',
		},
		{
			name: 'Mentors',
			href: '/mentors',
			icon: '/assets/mentors.svg',
		},
		{
			name: 'Message',
			href: '/message',
			icon: '/assets/message.svg',
		},
		{
			name: 'Settings',
			href: '/settings',
			icon: '/assets/settings.svg',
		},
	]
</script>

<div class="flex min-h-screen flex-col">
	<div class="flex">
		<aside class="flex-[1] p-4 border-r border-gray-100">
			<div class="mb-16 flex flex-row items-center justify-start gap-4">
				<img src="/assets/book-square.png" alt="logo" class="w-12" />
				<h1 class="text-2xl font-bold">NUEGAS</h1>
			</div>

			<ul class="flex flex-col gap-6">
				{#each menu as item}
					<li class="py-3 px-5 hover:bg-cloud rounded-lg cursor-pointer hover:py-5 hover:px-7 ease-in duration-300">
						<a href={item.href} class="flex flex-row items-center gap-4 font-semibold text-secondary">
							<img src={item.icon} alt={item.name} class="w-6" />
							<span>{item.name}</span>
						</a>
					</li>
				{/each}
			</ul>
		</aside>

		<main class="flex-[6] p-8 bg-white">
			<Header />
			
			{@render children()}
			<footer class="mt-10 bottom-0 w-full bg-gray-300 p-4">footer</footer>
		</main>
	</div>
</div>
