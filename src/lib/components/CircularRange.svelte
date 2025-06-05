<script>
	// Props
	export let percentage = 45;
	export let primaryColor = '#ec4899'; // pink-500
	export let secondaryColor = '#1f2937'; // gray-800
	export let size = 100; // ukuran kotak dalam px
	export let strokeWidth = 5;

	let radius = (size - strokeWidth) / 2;
	let cx = size / 2;
	let cy = size / 2;
	let circumference = 2 * Math.PI * radius;
	let dashOffset = circumference - (percentage / 100) * circumference;

	// Update saat persentase berubah
	$: dashOffset = circumference - (percentage / 100) * circumference;
</script>

<div class="relative inline-flex items-center justify-center">
	<svg width={size} height={size} viewBox="0 0 {size} {size}">
		<!-- Background Circle -->
		<circle {cx} {cy} r={radius} fill="none" stroke={secondaryColor} stroke-width={strokeWidth} />

		<!-- Progress Circle -->
		<circle
			{cx}
			{cy}
			r={radius}
			fill="none"
			stroke={primaryColor}
			stroke-width={strokeWidth}
			stroke-dasharray={circumference}
			stroke-dashoffset={dashOffset}
			transform="rotate(-90 {cx} {cy})"
			stroke-linecap="round"
			style="transition: stroke-dashoffset 0.3s ease;"
		/>
	</svg>

	<!-- Teks di tengah -->
	<div class="absolute text-lg font-bold text-hytam dark:text-white">
		{percentage}%
	</div>
</div>
