<script>
	import '../app.css';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	
	import IoIosHome from 'svelte-icons/io/IoIosHome.svelte';
	import IoMdMoon from 'svelte-icons/io/IoMdMoon.svelte';
	import IoMdSunny from 'svelte-icons/io/IoMdSunny.svelte';

	import theme from '$lib/stores/theme';

	const toggleTheme = () => {
		$theme = $theme === 'dracula' ? 'light' : 'dracula';
	};
</script>

<svelte:head>
	<title>Ich Glaub's</title>
</svelte:head>

<div
	data-theme={$theme}
	style="background-image: radial-gradient(hsla(var(--bc)/.2) .5px,hsla(var(--b2)/1) .5px); background-size: 5px 5px;"
	class="min-h-screen w-full bg-base-200 bg-top p-4 pt-20"
>
	<button on:click={() => goto('/')} class="absolute top-3 left-3">
		<div class="h-10 w-10 fill-current">
			<IoIosHome />
		</div>
	</button>
	{#if $theme === 'dracula'}
		<button on:click={toggleTheme} class="absolute top-3 right-3">
			<div transition:fade class="h-10 w-10 fill-current">
				<IoMdMoon />
			</div>
		</button>
	{:else}
		<button on:click={toggleTheme} class="absolute top-3 right-3">
			<div transition:fade class="h-10 w-10 fill-current">
				<IoMdSunny />
			</div>
		</button>
	{/if}
	<slot />
</div>
