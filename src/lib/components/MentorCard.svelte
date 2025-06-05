<script lang="ts">
    const headshot: string = 'https://media.istockphoto.com/id/1171169127/photo/headshot-of-cheerful-handsome-man-with-trendy-haircut-and-eyeglasses-isolated-on-gray.jpg?s=612x612&w=0&k=20&c=yqAKmCqnpP_T8M8I5VTKxecri1xutkXH7zfybnwVWPQ=';
</script>

<div class="flex flex-col items-center gap-6 bg-white dark:bg-hytam dark:text-white shadow-md p-6 rounded-lg w-full">
    <div class="flex flex-row items-center justify-between w-full">
        <div class="flex flex-row items-start justify-start gap-2">
            <img src={headshot} alt="headshot" class="w-12 h-12 rounded-full object-center object-cover">

            <div class="flex flex-col">
                <p class="text-lg font-semibold">John Doe</p>
                <p class="text-sm text-gray-500">Software Engineer</p>
            </div>
        </div>

        <button class="cursor-pointer text-primary hover:text-hytam ease-in duration-150">Follow +</button>
    </div>

    <div class="flex flex-row justify-between w-full">
        <div class="flex items-center gap-2">
            <img src="/assets/note.svg" alt="note" class="w-6 h-6">
            <span>40 Task</span>
        </div>
        <div class="flex items-center gap-2">
            <img src="/assets/star.svg" alt="star" class="w-6 h-6">
            <span>4.7 (750 reviews)</span>
        </div>
    </div>
</div>