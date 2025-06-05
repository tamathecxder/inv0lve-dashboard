<script lang="ts">
    import { onMount } from 'svelte';

    let isOpen = false;
    let isDark = false;

    function openNotification() {
        isOpen = !isOpen;
    }

    function toggleDarkMode() {
        isDark = !isDark;
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    }

    onMount(() => {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            isDark = true;
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
</script>

<header class="flex flex-row items-center justify-between mb-10 bg-white dark:bg-gray-900 p-4 shadow-md rounded-lg transition-all duration-300">
    <h2 class="text-hytam font-semibold text-3xl dark:text-white">Explore Task</h2>

    <div class="flex flex-row gap-6 sm:gap-10">
        <button type="button" class="cursor-pointer" on:click={openNotification}>
            <img src="/assets/notification.svg" alt="notification" class="w-8 h-8 dark:invert">
        </button>

        {#if isOpen}
            <div class="absolute right-5 top-[10%] w-80 h-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md z-10 transition-colors duration-300">
                <div class="flex flex-row items-center justify-between p-4">
                    <h3 class="text-lg font-semibold dark:text-white">Notifications</h3>
                    <button type="button" class="cursor-pointer" on:click={openNotification}>
                        x
                    </button>
                </div>
            </div>
        {/if}

        <!-- Dark Mode Toggle -->
        <button type="button" on:click={toggleDarkMode} class="cursor-pointer hover:opacity-80 ease-in duration-150">
            {#if isDark}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            {/if}
        </button>

        <button type="button" class="cursor-pointer hover:opacity-80 ease-in duration-150">
            <img src="https://media.istockphoto.com/id/1314997483/photo/portrait-of-a-confident-mature-businessman-working-in-a-modern-office.jpg?s=612x612&w=0&k=20&c=OxN-O2qe4LbgYuOnp_VkgXOV5p7CDC_uWja9iWFM-OA="
                alt="profile" class="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover">
        </button>
    </div>
</header>