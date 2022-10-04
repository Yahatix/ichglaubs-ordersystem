<script lang="ts">
	import db, { type TProduct } from '$lib/db';
	import { curr_formatter } from '$lib/utils';

	export let product: TProduct;

	const public_image_path = db.products.getImage(product.image_path);
</script>

<div class="card w-96 bg-base-100 shadow-xl">
	<figure><img src={public_image_path} alt={product.name} width="384" height="384" /></figure>
	<div class="card-body">
		<h2 class="card-title">{product.name}</h2>
		<p>{curr_formatter.format(product.price)}</p>
	</div>
</div>
