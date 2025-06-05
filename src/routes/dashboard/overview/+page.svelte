<script lang="ts">
	import MentorCard from '$lib/components/MentorCard.svelte';
import RunningTaskCard from '$lib/components/RunningTaskCard.svelte';
	import TaskCard from '$lib/components/TaskCard.svelte';
	import TitleWithSlider from '$lib/components/TitleWithSlider.svelte';
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

<svelte:head>
	<title>Overview</title>
</svelte:head>

<div class="grid grid-cols-1 md:grid-cols-12 gap-6">
    <RunningTaskCard class="col-span-1 md:col-span-3" />
    
    <div class="col-span-1 md:col-span-9 bg-cloud dark:bg-hytam rounded-lg shadow-md p-4">
        <LineChart {data} {options} />
    </div>

    <section class="col-span-1 md:col-span-12 mt-6">
        <TitleWithSlider title="Monthly Mentors" />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            <MentorCard />
            <MentorCard />
            <MentorCard />
        </div>
    </section>

    <section class="col-span-1 md:col-span-12 mt-6">
        <TitleWithSlider title="Upcoming Tasks" />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            <TaskCard />
            <TaskCard />
            <TaskCard />
        </div>
    </section>
</div>