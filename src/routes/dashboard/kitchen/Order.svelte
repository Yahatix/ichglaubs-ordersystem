<script lang="ts">
	import { scale } from 'svelte/transition';
	import orderStore, { orders, products, type TOrder } from '$lib/db';
	import db from '$lib/db';

	export let order: TOrder;
	const product = $products.find((a) => a.id === order.product);
	const finishOrder = () => {
		orderStore.orders.finishOrder(order);
		$orders = $orders.filter((o) => o.nr !== order.nr);
	};
</script>

{#if product}
	<div transition:scale class="card image-full mb-4 w-fit max-w-xs shadow-xl">
		<figure>
			<img
				src={db.products.getImage(product.image_path)}
				alt={product.name}
				width="384"
				height="384"
			/>
		</figure>
		<div class="card-body justify-between">
			<div class="rounded bg-base-content/60 p-2 text-base-200">
				<div class="card-title">{product.name}</div>
				<div>Nr: {order.nr}</div>
				{#if order.extraWish}
					<div>{order.extraWish}</div>
				{/if}
			</div>
			<div class="card-actions">
				<button class="btn btn-lg bg-base-content/80 text-base-200" on:click={finishOrder}
					>Crêpe fertiggestelt</button
				>
			</div>
		</div>
	</div>
{/if}
