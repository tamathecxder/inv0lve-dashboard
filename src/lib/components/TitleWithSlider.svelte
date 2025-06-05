<script lang="ts">
    export let title: string
</script>

<div class="flex flex-row justify-between items-center">
    <h1 class="text-3xl font-semibold dark:text-white">
        {title}
    </h1>

    <div class="flex flex-row gap-4 items-center justify-center">
        <button>
            <img src="/assets/arrow-left.svg" alt="arrow-left" class="w-8 h-8">
        </button>
        <button>
            <img src="/assets/arrow-right.svg" alt="arrow-right" class="w-8 h-8">
        </button>
    </div>
</div>