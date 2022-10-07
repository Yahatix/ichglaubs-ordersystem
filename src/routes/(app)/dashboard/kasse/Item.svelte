<script lang="ts">
	import { getNotificationsContext } from 'svelte-notifications';
	import userStore, { type TOrder, orders, type TProduct } from '$lib/db';
	import db from '$lib/db';
	import { curr_formatter } from '$lib/utils';
	import { currentOrder } from '$lib/stores';

	const { addNotification } = getNotificationsContext();

	export let product: Required<TProduct>;
	let order: TOrder<number>;
	let extraWish: string;

	const sendOrderToKitchen = (item: Required<TProduct>) => {
		$currentOrder = [
			...$currentOrder,
			{
				done: false,
				product: item,
				extraWish
			}
		];
		extraWish = ""
		return;

		order = {
			done: false,
			product: item.id,
			extraWish
		};

		userStore.orders
			.create(order)
			.then((res) => {
				addNotification({
					text: `Bestellung: ${res?.id} Erfolgreich an Küche gesendet`,
					type: 'success',
					position: 'bottom-center',
					removeAfter: 3000
				});
			})
			.catch((error) => {
				console.error(error);
				addNotification({
					text: 'Da ist etwas schief gegangen!' + error,
					type: 'error',
					position: 'bottom-center'
				});
			});
	};
</script>

<div class="card w-96 bg-base-100 shadow-xl">
	<figure>
		<img src={db.products.getImage(product)} alt={product.name} width="384" height="384" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{product.name}</h2>
		<p>{curr_formatter.format(product.price)}</p>
		<input
			bind:value={extraWish}
			class="input input-bordered"
			type="text"
			placeholder="Sonderwünsche"
		/>
		<button class="btn" on:click={() => sendOrderToKitchen(product)}>Bestellen</button>
	</div>
</div>
