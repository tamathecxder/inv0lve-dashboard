<script lang="ts">
	import { LineChart } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	// import options from './options';
	// import data from './data';

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

	const options: any = {
		title: 'Rotated ticks (line)',
		axes: {
			bottom: {
				scaleType: 'time',
				mapsTo: 'date',
				ticks: {
					rotation: 'always'
				}
			},
			left: {
				mapsTo: 'value'
			}
		},
		legend: {
			clickable: false
		},
		height: '400px'
	};
</script>

<div class="container">
	<LineChart {data} {options} style="padding:2rem;" />
</div>
