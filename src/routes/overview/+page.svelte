<script lang="ts">
	import RunningTaskCard from '$lib/components/RunningTaskCard.svelte';
	import { LineChart, ScaleTypes, TickRotations, type ChartOptions } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';

	const data: { group: string; date: string; value: number }[] = [
		{
			group: 'Dataset 1',
			date: '2023-12-30',
			value: 32100
		},
		{
			group: 'Dataset 1',
			date: '2023-12-31',
			value: 23500
		},
		{
			group: 'Dataset 1',
			date: '2024-01-01',
			value: 53100
		},
		{
			group: 'Dataset 1',
			date: '2024-01-02',
			value: 42300
		},
		{
			group: 'Dataset 1',
			date: '2024-01-03',
			value: 12300
		}
	];

	const options: ChartOptions = {
		title: 'Rotated ticks (line)',
		axes: {
			bottom: {
				scaleType: ScaleTypes.TIME,
				mapsTo: 'date',
				ticks: {
					rotation: TickRotations.ALWAYS
				}
			},
			left: {
				mapsTo: 'value'
			}
		},
		legend: {
			clickable: false
		},
		height: '340px'
	};
</script>

<div class="grid grid-cols-12 gap-10">
	<!-- Running Task -->
	<RunningTaskCard class="col-span-3" />
	<!-- ! Running Task -->
	
	<!-- Chart Section -->
	<div class="col-span-9 bg-cloud flex flex-col rounded-lg">			
		<LineChart {data} {options} style="padding:2rem;" />
	</div>
	<!-- ! Chart Section -->
</div>
