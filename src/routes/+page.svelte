<script>
	import CanvasBkg from '$lib/components/canvasBkg.svelte';
	import { fly } from 'svelte/transition';
</script>

<div class="canvas">
	<CanvasBkg />
</div>

<style lang="scss">
	.canvas {
		position: relative;

		overflow: hidden;

		width: 100%;
		height: calc(100vh - 4em);
	}
</style>
