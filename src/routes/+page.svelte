<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    onMount(() => {
        goto('/overview');
    });
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>