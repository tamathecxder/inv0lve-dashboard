<script lang="ts">
	const image: string =
		'https://www.shutterstock.com/image-photo/programmer-people-working-laptops-smartphones-600nw-2473384115.jpg';

	let progressPercentage: number = 75;
</script>

<div class="flex w-full flex-col items-center gap-6 rounded-lg bg-white dark:bg-hytam text-hytam dark:text-white p-6 shadow-md">
	<div class="flex w-full flex-row items-center justify-between">
		<div class="flex w-full flex-col items-start justify-start gap-4">
			<img
				src={image}
				alt="headshot"
				class="h-[200px] w-full rounded-lg object-cover object-center"
			/>

			<div class="flex flex-col gap-1">
				<p class="text-lg font-semibold">Creating Mobile App Design System</p>
				<p class="text-sm text-gray-500">UI/UX</p>
			</div>

			<!-- Progress -->
			<div class="flex w-full flex-col gap-4">
				<div class="flex flex-row items-center justify-between">
					<span>Progress</span>
					<span class="text-primary">{progressPercentage}%</span>
				</div>

				<input
					type="range"
					min="0"
					max="100"
					bind:value={progressPercentage}
					class="bg-primary h-2 w-full cursor-pointer appearance-none rounded-lg accent-gray-900 dark:accent-gray-200"
				/>

				<div class="flex flex-row items-center justify-between">
					<div class="flex flex-row gap-2">
						<img src="/assets/time.svg" alt="Time" class="h-6 w-6" />
						<span>3 Days Left</span>
					</div>

					<!-- Avatar Stack -->
					<div class="flex -space-x-3 mt-2">
						<!-- Avatar 1 -->
						<img
							class="h-8 w-8 rounded-full border-2 border-white"
							src="https://i.pravatar.cc/40?img=1"
							alt="Avatar 1"
						/>
						<!-- Avatar 2 -->
						<img
							class="h-8 w-8 rounded-full border-2 border-white"
							src="https://i.pravatar.cc/40?img=2"
							alt="Avatar 2"
						/>
						<!-- Avatar 3 -->
						<img
							class="h-8 w-8 rounded-full border-2 border-white"
							src="https://i.pravatar.cc/40?img=3"
							alt="Avatar 3"
						/>
						<!-- Avatar 4 -->
						<img
							class="h-8 w-8 rounded-full border-2 border-white"
							src="https://i.pravatar.cc/40?img=4"
							alt="Avatar 4"
						/>
						<!-- Avatar 5 -->
						<img
							class="h-8 w-8 rounded-full border-2 border-white"
							src="https://i.pravatar.cc/40?img=5"
							alt="Avatar 5"
						/>
						<!-- Extra counter if more than 5 -->
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-300 text-xs font-medium text-gray-700"
						>
							+2
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
