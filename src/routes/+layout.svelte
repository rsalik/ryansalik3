<script lang="ts">
	import '../styles/style.scss';
	import { page } from '$app/stores';

	import { fade } from 'svelte/transition';

	import pages from '$lib/pages.json';
	import projects from '$lib/projects.json';
	import { contentWidth, contentHeight } from '$lib/stores';

	let pagename = '';

	const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

	// Avoid type error
	function projectOf(s: string) {
		return projects[s as keyof typeof projects];
	}

	$: {
		if ($page.url.pathname !== '/') {
			let s = $page.url.pathname.split('/')[1];

			pagename = s.charAt(0).toUpperCase() + s.slice(1);
		} else {
			pagename = '';
		}
	}
</script>

<div class="page">
	<div class="bar">
		<div class="wrapper">
			<a href="/"><div class="title">Ryan Salik</div></a>
			<br />
			<div class="tabs">
				{#each pages as page, i}
					<a href={'/' + page.toLowerCase()} class="tab mono" class:active={page === pagename}
						><span>0{i + 1}</span> {page}</a
					>
				{/each}
			</div>
		</div>
	</div>
	{#if $contentWidth > 768}
		<div class="spacer v" />
	{:else}
		<div class="spacer h" />
	{/if}

	<div class="content-wrapper">
		<div class="content" bind:clientWidth={$contentWidth} bind:clientHeight={$contentHeight}>
			{#if pages.includes(pagename)}
				<div class="title pg-title mono">
					<span>0{pages.indexOf(pagename) + 1}</span>
					{pagename}
				</div>
			{:else if pagename === 'Project'}
				<div class="title pg-title mono">
					<span>02{ALPHABET[Object.keys(projects).indexOf($page.url.pathname.split('/')[2])]}</span>
					{projectOf($page.url.pathname.split('/')[2]).name}
				</div>
			{/if}

			<div class="flex">
				<slot />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	$barW: max(27vw, 400px);

	.page {
		display: flex;
		flex-direction: row;

		box-sizing: border-box;
		width: 100vw;
		min-height: 100vh;

		background: $bkg;

		@media screen and (max-width: $mobile) {
			flex-direction: column;
		}

		.bar {
			position: relative;
			z-index: 2;

			box-sizing: border-box;
			width: $barW;
			padding: 2rem 1rem;

			background: $bkg;

			@media screen and (max-width: $mobile) {
				width: 100%;
				padding: 1rem;
			}

			.wrapper {
				position: sticky;
				top: 1em;

				display: flex;
				align-items: center;
				flex-direction: column;
			}
		}

		@media screen and (max-width: $mobile) {
			.tabs {
				display: flex;
			}
		}

		.tab {
			font-size: 1.3em;

			width: 90%;
			margin: 0.2rem 0;
			padding: 0.5em;

			transition: all 0.2s ease-in-out;
			text-decoration: inherit;

			color: rgba($accent, 0.6);
			background: rgba($accent, 0.2);

			@extend %border-radius;

			@media screen and (max-width: $mobile) {
				font-size: 0.7em;

				display: inline-block;

				width: 25vw;
				margin: 0 0.2rem;
			}

			&:hover,
			&:focus,
			&.active {
				cursor: pointer;

				color: $bkg;
				background: $accent;

				span {
					color: $bkg;
				}
			}

			span {
				transition: inherit;

				color: rgba($accent, 1);
			}
		}
	}

	.content-wrapper {
		box-sizing: border-box;
		width: 100%;
	}

	.content-wrapper {
		padding: 2em;
	}

	.content {
		display: flex;
		flex-direction: column;

		box-sizing: border-box;
		width: 100%;
		height: 100%;
	}

	.pg-title {
		color: rgba($accent, 0.6);

		span {
			color: $accent;
		}
	}
</style>
