<script lang="ts">
	import CircularRange from "./CircularRange.svelte";
</script>

<div class="text-2xl flex flex-col items-start gap-10 bg-hytam rounded-lg p-5 text-white {$$restProps.class}">
    <div class="flex flex-col gap-6 font-semibold">
        <p class="text-xl">Running Task</p>
        <p class="text-5xl">65</p>
    </div>
    <div class="flex flex-row items-center gap-4">
        <CircularRange />
        <p class="font-normal">100 <span class="text-secondary block">Task</span></p>
    </div>
</div>