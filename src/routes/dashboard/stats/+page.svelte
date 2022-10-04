<script lang="ts">
	import { orderStats } from '$lib/db';
</script>

<div class="flex h-full items-center justify-center">
	<div class="flex flex-col text-2xl">
		{#each $orderStats as stat}
			<p>{stat[0]}: {stat[1]}</p>
		{/each}
	</div>
</div>
