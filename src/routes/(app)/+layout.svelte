<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	import { startSupabaseSessionSync } from '@supabase/auth-helpers-sveltekit';
	import Notifications from 'svelte-notifications';

	import '../../app.css';
	import '$lib/db';
	import OrderMenu from './OrderMenu.svelte';
	import NavigationMenu from './NavigationMenu.svelte';

	startSupabaseSessionSync({
		page,
		handleRefresh: () => invalidateAll()
	});
</script>

<svelte:head>
	<title>Ich Glaub's</title>
</svelte:head>

<Notifications>
	{#if $page.data.session.user}
		<OrderMenu />
		<NavigationMenu><slot /></NavigationMenu>
	{:else}
		<div
			style="background-image: radial-gradient(hsla(var(--bc)/.2) .5px,hsla(var(--b2)/1) .5px); background-size: 5px 5px;"
			class="h-screen min-h-screen w-full bg-base-200 bg-top p-4"
		>
			<slot />
		</div>
	{/if}
</Notifications>
