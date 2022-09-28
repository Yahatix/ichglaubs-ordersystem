<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let errors: Record<string, string> = {};
	export let values: Record<string, string> = {};
	export let message: string = '';
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			loading = false;
			await applyAction(result);
			if (result.type === 'redirect') {
				await invalidateAll();
			}
		};
	};
</script>

<section class="mt-6 pt-6">
	{#if Object.keys(errors).length > 0}
		<div class="notification is-danger block">{errors.form}</div>
	{/if}
	{#if message}
		<div class="notification is-primary block">{message}</div>
	{/if}

	<form method="post" use:enhance={handleSubmit} class="flex flex-col items-center gap-2">
		<h1 class="text-xl font-bold">Sign up</h1>
		<div class="form-control w-full max-w-xs">
			<label for="email" class="label">
				<span class="label-text">Email</span>
			</label>
			<input
				id="email"
				name="email"
				value={values?.email ?? ''}
				class="input input-bordered w-full max-w-xs"
				type="email"
				placeholder="Email"
				required
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="email" class="label">
				<span class="label-text">Password</span>
			</label>
			<input
				id="password"
				name="password"
				value={values?.password ?? ''}
				class="input input-bordered w-full max-w-xs"
				type="password"
				placeholder="Password"
				required
			/>
		</div>
		<button disabled={loading} class="btn mt-2 w-full max-w-xs">Sign up</button>
		<div class="mt-6">
			<p class="has-text-centered">
				Already have an account? <a href="/">Sign in</a>
			</p>
		</div>
	</form>
</section>
