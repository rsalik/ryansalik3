<script lang="ts">
	import { onMount } from 'svelte';
	import { createNoise2D } from 'simplex-noise';

	let canvas: HTMLCanvasElement;
	let t = 0;

	const simplex = createNoise2D();

	let w = 1000,
		h = 1000;

	onMount(() => {
		draw();
	});

	function n(x: number, y: number) {
		return simplex(x / 100, y / 100);
	}

	function draw() {
		const ctx = canvas?.getContext('2d');
		if (!ctx) return;

		ctx.strokeStyle = 'rgba(255, 250, 205, 0.5)';
		ctx.lineWidth = 4;

		const inc = 20;

		ctx.clearRect(0, 0, w * 2, h * 2);

		for (let y = 2; y < h * 2.5; y += inc) {
			for (let x = 0; x < w * 2; x += inc) {
				ctx.beginPath();
				ctx.moveTo(x, y + (n(x + t, y + t / 2.5) * inc) / 2);
				ctx.lineTo(x + inc, y + (n(x + inc + t, y + t / 2.5) * inc) / 2);
				ctx.stroke();
			}
		}

		setTimeout(() => {
			t += 0.3;
			draw();
		}, 10);
	}
</script>

<canvas bind:this={canvas} width={`2000px`} height={`2000px`} />

<style lang="scss">
	canvas {
		width: 100%;
		height: 100%;

		aspect-ratio: unset;
		@extend %border-radius;
	}
</style>
