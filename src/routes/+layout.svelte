<script lang="ts">
	import './app.css'
	import favicon from '$lib/assets/favicon.svg'
	import Nav from '$lib/components/Nav.svelte'
	import { track_visit } from '$lib/client/track'

	let { children } = $props()

	$effect(() => {
		track_visit()
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Website mit Besuchszähler</title>
</svelte:head>

<div class="container">
	<Nav />
	{@render children()}
</div>

<style>
	.container {
		max-width: 600px;
		margin-inline: auto;
		padding-inline: 1rem;
	}
</style>
