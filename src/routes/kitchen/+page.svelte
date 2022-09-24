<script lang="ts">
	import { onMount } from 'svelte';
	import Order from '$lib/components/Order.svelte';
	import db, { orders, type TOrder } from '$lib/stores/db';

	onMount(async () => {
		$orders = (await db.orders.get()) as TOrder[];
	});
</script>

<svelte:head>
	<title>Küche</title>
</svelte:head>

<div class="flex gap-3 flex-wrap">
	{#each $orders as order (order.nr)}
		<Order {order} />
	{/each}
</div>
