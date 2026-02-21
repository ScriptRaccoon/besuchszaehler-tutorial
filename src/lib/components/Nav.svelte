<script lang="ts">
	import { get_visits } from '$lib/client/track'

	let counter = $state<number | undefined>(undefined)

	$effect(() => {
		get_visits().then((result) => {
			counter = result
		})
	})
</script>

<nav>
	<ul>
		<li>
			<a href="/">Startseite</a>
		</li>
		<li>
			<a href="/blog">Blog</a>
		</li>
		<li>
			<a href="/infos">Infos</a>
		</li>
	</ul>

	<span class="secondary">
		{#if counter !== undefined}
			{counter} Besuche
		{:else}
			&ndash; Besuche
		{/if}
	</span>
</nav>

<style>
	nav {
		padding-block: 1rem;
		display: flex;
		justify-content: space-between;
	}

	ul {
		list-style-type: none;
		display: flex;
		gap: 1rem;
	}
</style>
