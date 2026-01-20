<script lang="ts">
	import '../../../../app.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div
	style="background-image: radial-gradient(hsla(var(--bc)/.2) .5px,hsla(var(--b2)/1) .5px); background-size: 5px 5px;"
	class="h-screen min-h-screen w-full bg-base-200 bg-top p-4"
>
	{@render children?.()}
</div>
