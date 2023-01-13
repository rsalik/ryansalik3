<script lang="ts">
	import { onMount } from 'svelte';

	export let speed: number = 40;
	export let delay: number = 100;

	let text = '';
	let span: HTMLSpanElement;

	$: {
		text = span?.innerText || '';
	}

	let i = 0;
	let done = true;

	onMount(() => {
		i = 0;

		setTimeout(() => {
			done = false;
			const interval = setInterval(() => {
				if (i < text.length) {
					i++;
				} else {
					done = true;
					clearInterval(interval);
				}
			}, speed);
		}, delay);
	});
</script>

<span class="typer" class:done>{text.slice(0, i)}</span>
<span style:display="none" bind:this={span}><slot /></span>

<style lang="scss">
	.typer {
		display: flex;

		&:not(.done)::after {
			height: 100%;
			margin-left: 0.2em;

			content: '_';
			animation: blink 1s step-end infinite;

			background-color: $color;

			@keyframes blink {
				50% {
					opacity: 0;
				}
			}

			@media (prefers-reduced-motion: reduce) {
				animation: none;
			}
		}
	}
</style>
