<script lang="ts">
	import db, { type TProduct } from '$lib/db';
	import { getNotificationsContext } from 'svelte-notifications';
	const { addNotification } = getNotificationsContext();

	let product: TProduct;
	let fileEl: HTMLInputElement;

    const createProduct = () => {
        db.products.new(product)
    }

	const uploadFile = () => {
		if (!fileEl.files) return;
		db.products.uploadImage(fileEl.files[0]).then((res) => {
			if (res.error) {
				addNotification({
					text: res.error.message,
					type: 'error',
					position: 'bottom-center'
				});
				return;
			}
			addNotification({
				text: 'Datei erfolgreich hochgeladen',
				type: 'success',
				position: 'bottom-center',
				removeAfter: 2000
			});
		});
	};
</script>

<input class="" bind:this={fileEl} type="file" name="" />
<button class="btn" on:click={uploadFile}>Upload</button>
