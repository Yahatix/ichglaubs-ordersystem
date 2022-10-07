<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { currentOrder } from '$lib/stores';
	import { curr_formatter } from '$lib/utils';

	let isOrderMenuOpen = false;
	$: total = curr_formatter.format(
		$currentOrder.reduce((curr, val) => (curr += val.product.price), 0)
	);

	$: sortedOrder = $currentOrder.sort((a, b) => {
		if (a.product.name === b.product.name) return 0;
		return a.product.name < b.product.name ? -1 : 1;
	});

	beforeNavigate(() => {
		isOrderMenuOpen = false;
	});
</script>

{#if $page.routeId === '(app)/dashboard/kasse'}
	<div class="drawer relative top-0 left-0 w-screen" class:z-10={isOrderMenuOpen}>
		<label for="order-drawer" class="drawer-button btn absolute top-4 left-4 z-10 px-12"
			>Bestellung
			<div class="badge badge-success ml-1">{total}</div></label
		>
		<input id="order-drawer" type="checkbox" class="drawer-toggle" bind:checked={isOrderMenuOpen} />
		<div class="drawer-side">
			<label for="order-drawer" class="drawer-overlay" />
			<div class="flex h-screen w-80 flex-col justify-between bg-base-100 py-4 text-base-content">
				<div class="flex flex-col gap-2 overflow-y-auto">
					<div class="border-b-4 border-slate-500 px-4 pb-4">
						<p class="text-xl font-bold">Bestellung:</p>
					</div>
					<div class="flex flex-col gap-2 px-4">
						{#each sortedOrder as order, index}
							<div>
								<p>{order.product.name}</p>
								{#if order.extraWish}
									<p>Extra: {order.extraWish}</p>
								{/if}
							</div>
							{#if $currentOrder.length !== index + 1}
								<hr class="rounded-full border-t-2 border-slate-500" />
							{:else}
								<div class="mb-2" />
							{/if}
						{/each}
					</div>
				</div>
				<div class="border-t-2 border-slate-500 px-4">
					<p class="my-2 text-xl font-bold">Total: {total}</p>
					<button class="btn w-full">Jetzt Bestellen</button>
				</div>
			</div>
		</div>
	</div>
{/if}
