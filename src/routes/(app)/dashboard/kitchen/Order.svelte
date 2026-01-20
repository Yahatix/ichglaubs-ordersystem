<script lang="ts">
	import { scale } from 'svelte/transition';
	import db, { type Order } from '$lib/dbAPI';

	interface Props {
		order: Order;
	}

	let { order }: Props = $props();

	const finishOrder = () => db.orders.finishOrder(order);
</script>

<div transition:scale|global class="w-fit max-w-xs rounded-xl bg-slate-500 p-4 shadow-xl">
	<div class="text-xl font-bold">Nr.: {order.id}</div>
	{#each order.orderItem as item, index}
		<div class="text-lg">{item.product.name}</div>
		{#if item.extraWish}
			<div class="text-lg font-bold text-amber-500">{item.extraWish}</div>
		{/if}
		{#if order.orderItem.length !== index + 1}
			<hr class="rounded-full border-t-2 border-slate-800" />
		{:else}
			<div class="mb-2"></div>
		{/if}
	{/each}
	<button class="btn mt-4" onclick={finishOrder}>Crêpe fertiggestelt</button>
</div>
