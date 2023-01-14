<script lang="ts">
	import { contentWidth } from '$lib/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	let { project, prev, next } = data;

	$: {
		project = data.project;
		prev = data.prev;
		next = data.next;
	}

	let mPrev = { x: -20000, y: 0 };
	let mNext = { x: -20000, y: 0 };
	let prevBar: HTMLElement;
	let nextBar: HTMLElement;

	function handleMousemove(event: MouseEvent) {
		const prevRect = prevBar.getBoundingClientRect();
		mPrev.x = event.clientX - prevRect.left;
		mPrev.y = event.clientY - prevRect.top;

		if (event.clientX < prevRect.x) mPrev.x = -20000;
		if (mPrev.y > prevRect.bottom) mPrev.y = -20000;

		const nextRect = nextBar.getBoundingClientRect();
		mNext.x = event.clientX - nextRect.left;
		mNext.y = event.clientY - nextRect.top;

		if (event.clientX < nextRect.x) mNext.x = -20000;
		if (mNext.y < 0) mNext.y = -20000;
	}
</script>

<svelte:body on:mousemove={handleMousemove} />

<div class="proj">
	{#if project !== undefined}
		<img src={project.image} alt="" />
	{/if}

	<div class="desc">{project.description}</div>

	<div class="btns">
		<a class="btn repo mono" href={project.repoLink}> Repository </a>

		{#if project.webLink.includes('heroku')}
			<div class="btn web mono disabled">Visit</div>
			<div class="heroku mono">
				Heroku has disabled free-tier dynos, so this project is currently unavailable online.
			</div>
		{:else}
			<a class="btn web mono" href={project.webLink}>Visit</a>
		{/if}
	</div>
</div>

{#if $contentWidth > 768}
	<a href="/project/{prev}" class="close prev" bind:this={prevBar}>
		<div class="text mono">PREV_PROJECT</div>

		<div class="cir mono" style:top="{mPrev.y}px" style:left="{mPrev.x}px">
			<img src="/imgs/prev.svg" alt="" />
		</div>
	</a>

	<a href="/project/{next}" class="close next" bind:this={nextBar}>
		<div class="text mono">NEXT_PROJECT</div>

		<div class="cir mono" style:top="{mNext.y}px" style:left="{mNext.x}px">
			<img src="/imgs/next.svg" alt="" />
		</div>
	</a>
{/if}

<style lang="scss">
	.proj {
		width: 70%;

		@media screen and (max-width: $mobile) {
			width: 100%;
		}

		img {
			max-width: 80%;
			max-height: 60vh;
		}

		.desc {
			font-size: 1.6em;

			margin-top: 1em;
		}
	}

	.close {
		position: absolute;
		right: -2em;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 20%;
		height: calc(50% + 2em);
		//height: 100%;

		cursor: none;
		transition: all 0.2s ease-in;

		border-left: 1px dashed $gray;

		&.prev {
			top: -2em;

			.text {
				rotate: 90deg;
			}

			&::after {
				position: absolute;
				top: 0;
				right: 1em;
				bottom: 0;
				left: 1em;

				content: ' ';

				border-bottom: 1px solid $gray;
			}
		}

		&.next {
			bottom: -2em;

			.text {
				rotate: -90deg;
			}
		}

		&:hover {
			border-color: $accent;

			.text {
				color: $accent;
			}
		}

		.text {
			font-size: 1.5em;

			transition: all 0.2s ease-in;
			white-space: nowrap;

			color: mix($gray, white, 80%);
		}

		.cir {
			font-size: 1.5em;

			position: absolute;
			z-index: 10;
			top: 0;
			right: 0;

			display: flex;
			align-items: center;
			justify-content: center;

			width: 3em;
			height: 3em;

			transform: translate(-50%, -50%);

			color: $bkg;
			border-radius: 50%;
			background-color: $accent;

			img {
				width: 70%;
				height: 70%;
			}
		}
	}

	.btns {
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		margin: 1.5em 0;

		$disabled-color: mix($bkg, white, 60%);

		@media screen and (max-width: $mobile) {
			align-items: unset;
			flex-direction: column;
			justify-content: center;
		}

		.btn {
			font-size: 1.5em;

			display: flex;
			align-items: center;
			justify-content: center;

			width: 10em;
			height: 3em;

			transition: all 0.2s ease-in-out;

			color: $color;
			border: 1px solid $color;

			@extend %border-radius;
			$muted-accent: mix($accent, white, 70%);
			$disabled: repeating-linear-gradient(
			-45deg,
			$disabled-color,
			$disabled-color 1px,
			$bkg 1px,
			$bkg 10px
			);

			@media screen and (max-width: $mobile) {
				font-size: 1.2em;
			}

			&:hover {
				color: $bkg;
				background: $color;
			}

			&.web {
				margin-left: 1em;

				color: $muted-accent;
				border-color: $muted-accent;

				@media screen and (max-width: $mobile) {
					margin-top: 0.5em;
					margin-left: 0;
				}

				&:hover {
					color: $bkg;
					border-color: $accent;
					background: $accent;
				}
			}

			&.disabled {
				color: $disabled-color;
				border-color: $disabled-color;
				background: $disabled;

				&:hover {
					cursor: not-allowed;

					color: $disabled-color;
					border-color: $disabled-color;
					background: $disabled;
				}
			}
		}

		.heroku {
			font-size: 1em;

			width: 100%;
			margin-top: 1em;

			color: $color;
		}
	}
</style>
