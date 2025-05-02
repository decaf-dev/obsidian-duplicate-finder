<script lang="ts">
	import type { App } from "obsidian";
	import { findDuplicateUrls } from "src/find-duplicate-urls";
	import { onMount } from "svelte";

	interface AppProps {
		obsidianApp: App;
	}

	const { obsidianApp }: AppProps = $props();

	let duplicateUrls: Map<string, string[]> = $state(new Map());

	onMount(async () => {
		duplicateUrls = await findDuplicateUrls(obsidianApp);
	});
</script>

<div>
	<h1 class="wtf">Find Duplicates</h1>
	{#each Array.from(duplicateUrls.entries()) as [url, files]}
		<div>
			<h2>{url}</h2>
			<p>{files.length} files</p>
		</div>
	{/each}
</div>

<style>
	:global(h1) {
		font-size: 1rem;
	}
	:global(.wtf) {
		color: red;
	}
</style>
