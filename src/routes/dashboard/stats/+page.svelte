<script lang="ts">
	import orderStore, { type TOrder } from '$lib/stores/db';
	import { onMount } from 'svelte';

	let orders: TOrder[] = [];
	$: stats = [
		...orders.reduce<Map<string, number>>((curr, val) => {
			const toppingStats = curr.get(val.topping) || 0;
			curr.set(val.topping, toppingStats + 1);
			return curr;
		}, new Map())
	];

	onMount(async () => {
		orders = await orderStore.orders.getAll();
	});
</script>

<div class="flex flex-col">
	{#each stats as stat}
		<div>{stat[0]}: {stat[1]}</div>
	{/each}
</div>
