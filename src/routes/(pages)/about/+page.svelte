<script>
	import Typer from '$lib/components/typer.svelte';

	import { draw, fly } from 'svelte/transition';

	let showSquiggle = false;
	let showBio = false;

	setTimeout(() => {
		showSquiggle = true;
	}, 1200);

	setTimeout(() => {
		showBio = true;
	}, 3000);
</script>

<div class="about">
	<div class="mono"><Typer>Hello, There!</Typer></div>
	<div class="title name-line">
		<Typer delay={1000}>My name is</Typer>
		<div class="name">
			<strong><Typer delay={1600}>Ryan Salik</Typer></strong>

			{#if showSquiggle}
				<svg xmlns="http://www.w3.org/2000/svg">
					<style type="text/css">
						.squiggly-line {
							fill: none;
							stroke-width: 4;
						}
					</style>
					<path
						in:draw={{ duration: 1000, delay: 1000 }}
						class="squiggly-line"
						d="M1.4,6c0,0,9-9,18,0s18,0,18,0s9-9,18,0s18,0,18,0s9-9,18,0s18,0,18,0s9-9,18,0,18,0,18,0s9-9,18,0,18,0,18,0s9-9,18,0,18,0,18,0s9-9,18,0,18,0,18,0s9-9,18,0,18,0,18,0s9-9,18,0,18,0,18,0"
					/>
				</svg>
			{/if}
		</div>
	</div>

	<br />
	<br />

	{#if showBio}
		<div class="bio" in:fly={{ y: 100, duration: 400 }}>
			I am a senior in high school planning on majoring in Computer Science in college.
			<br />
			<br />
			Some of my current interests are:
			<ul>
				<li>Web Development</li>
				<li>Computer Graphics</li>
				<li>Game Development</li>
			</ul>
		</div>
	{/if}
</div>

<style lang="scss">
	.about {
		font-size: 1.5em;

		.title {
			font-size: 2.5em;
			font-weight: normal;
		}

		.name-line {
			position: relative;

			display: flex;
			flex-direction: row;
		}

		.name {
			margin-left: 0.2em;
			svg {
				position: absolute;

				overflow: hidden;

				max-width: 5.25em;

				stroke: $accent;
			}
		}
	}
</style>
