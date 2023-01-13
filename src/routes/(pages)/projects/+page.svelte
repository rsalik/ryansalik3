<script lang="ts">
	import projects from '$lib/projects.json';

	$: projs = Object.keys(projects) as (keyof typeof projects)[];
</script>

<div class="projects">
	{#each projs as project}
		<a href="/project/{project}" class="project">
			<div class="img" style="--url: url('{projects[project].image}')" />
			<div class="name mono">{projects[project].name}</div>
			<div class="desc">{projects[project].description}</div>
		</a>
	{/each}
</div>
<br />

<style lang="scss">
	.projects {
		display: grid;

		grid-template-columns: repeat(auto-fill, minmax(20vw, 1fr));
		gap: 1em;

		.project {
			box-sizing: border-box;
			width: 100%;
			padding: 1em;

			transition: all 0.4s ease-in-out;

			border: 2px solid transparent;

			@extend %border-radius;

			&:hover {
				cursor: pointer;

				border: 2px solid $accent;

				.img {
					background-size: auto 110%;

					&::after {
						opacity: 1;
						background-size: auto 110%;
					}
				}
			}

			.img {
				position: relative;
				z-index: 1;

				width: 100%;
				padding-bottom: 100%;

				transition: all 0.3s ease-in-out;

				background-image: linear-gradient($accent, $accent), var(--url);
				background-repeat: no-repeat;
				background-position: center;
				background-size: auto 101%;

				@extend %border-radius;
				background-blend-mode: color;

				&::after {
					position: absolute;
					z-index: 2;
					top: 0;
					left: 0;

					width: 100%;
					height: 100%;

					content: '';
					transition: all 0.3s ease-in-out;

					opacity: 0;
					background-image: var(--url);
					background-repeat: no-repeat;
					background-position: center;
					background-size: auto 101%;

					@extend %border-radius;
				}
			}

			.name {
				font-size: 2em;

				margin: 0.5em 0;
			}
		}
	}
</style>
