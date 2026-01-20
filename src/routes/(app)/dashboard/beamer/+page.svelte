<script lang="ts">
	import { onMount } from 'svelte';
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';

	import { Carousel, type CarouselControls } from 'renderless-svelte';

	import { finishedOrders, unfinishedOrders } from '$lib/dbAPI';

	let controls: CarouselControls = $state();

	onMount(() => {
		const id = setInterval(() => {
			controls.next();
		}, 10000);
		return () => clearInterval(id);
	});

	const [send, receive] = crossfade({
		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	const images = [
		'/images/slider/Flyer Teenkreis_Endformat.jpg',
		'/images/slider/Flyer Teenkreis_Endformat2.jpg',
		'/images/slider/Werbung Jugendbistro_2022.jpg',
		'/images/slider/whatsapp.png'
	];
</script>

<div class="grid h-full w-full grid-cols-2 gap-2">
	<div class="flex h-full w-full items-center justify-center">
		<!-- Werbeblock -->
		<Carousel items={images} loop bind:controls>
			{#snippet children({ payload })}
				<img src={payload} alt="" class="max-h-[calc(100vh-32px)]" />
			{/snippet}
		</Carousel>
	</div>
	<div class="grid grid-cols-2 justify-center gap-2">
		<div class="flex flex-col items-center gap-2">
			<h2 class="mb-2 text-center text-3xl font-bold underline">In bearbeitung</h2>
			{#each $unfinishedOrders as order (order.id)}
				<div
					in:receive|global={{ key: order.id }}
					out:send|global={{ key: order.id }}
					animate:flip
					class="w-fit max-w-xs min-w-[10rem] rounded-lg bg-amber-500 p-2 text-center text-3xl font-bold"
				>
					{order.id}
				</div>
			{/each}
		</div>
		<div class="flex flex-col items-center gap-2">
			<h2 class="mb-2 text-center text-3xl font-bold underline">Abholbereit</h2>
			{#each $finishedOrders as order (order.id)}
				<div
					in:receive|global={{ key: order.id }}
					out:send|global={{ key: order.id }}
					animate:flip
					class="w-fit max-w-xs min-w-[10rem] rounded-lg bg-green-500 p-2 text-center text-3xl font-bold"
				>
					{order.id}
				</div>
			{/each}
		</div>
	</div>
</div>
