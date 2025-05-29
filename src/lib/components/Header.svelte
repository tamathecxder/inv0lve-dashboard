<script lang="ts">
    let isOpen = false;
    
    function openNotification() {
        isOpen = !isOpen
    }
</script>

<header class="flex flex-row items-center justify-between mb-10">
    <h2 class="text-hytam font-semibold text-2xl">Explore Task</h2>

    <div class="flex flex-row gap-10">
        <button type="button" class="cursor-pointer" on:click={openNotification}>
            <img src="/assets/notification.svg" alt="notification" class="w-8 h-8">
        </button>

        {#if isOpen}
            <div class="absolute right-20 top-[10%] w-80 h-96 bg-white border border-gray-50 rounded-lg shadow-lg z-10">
                <div class="flex flex-row items-center justify-between p-4">
                    <h3 class="text-lg font-semibold">Notifications</h3>
                    <button type="button" class="cursor-pointer" on:click={openNotification}>
                        x
                    </button>
                </div>
            </div>
        {/if}
        
        <button type="button" class="cursor-pointer hover:opacity-80 ease-in duration-150 ">
            <img src="https://media.istockphoto.com/id/1314997483/photo/portrait-of-a-confident-mature-businessman-working-in-a-modern-office.jpg?s=612x612&w=0&k=20&c=OxN-O2qe4LbgYuOnp_VkgXOV5p7CDC_uWja9iWFM-OA="
                alt="profile" class="w-14 h-14 rounded-full object-center object-cover">
        </button>
    </div>
</header>