<script lang="ts">
	import { debounce } from "lodash";
	import { Menu, type App } from "obsidian";
	import { deleteFile } from "src/utils/delete-file";
	import { findDuplicateUrls } from "src/utils/find-duplicate-urls";
	import { openInNewTab, openToTheRight } from "src/utils/open-file";
	import { onMount } from "svelte";

	interface AppProps {
		obsidianApp: App;
	}

	const { obsidianApp }: AppProps = $props();

	let duplicateUrlMap: Map<string, string[]> = $state(new Map());
	let searchValue = $state("");

	let filteredDuplicateUrlMap = $derived(
		new Map(
			Array.from(duplicateUrlMap.entries()).filter(([_, files]) =>
				files.some((file) =>
					file.toLowerCase().includes(searchValue.toLowerCase()),
				),
			),
		),
	);

	let duplicateUrlCount = $derived(
		Array.from(filteredDuplicateUrlMap.entries()).filter(
			([_, files]) => files.length > 1,
		).length,
	);

	const handleInputChange = debounce((event: Event) => {
		searchValue = (event.target as HTMLInputElement).value;
	}, 100);

	function handleItemClick(filePath: string) {
		openInNewTab(obsidianApp, filePath, true);
	}

	function handleItemContextMenuClick(event: MouseEvent, filePath: string) {
		const menu = new Menu();
		menu.setUseNativeMenu(true);
		menu.addItem((item) => {
			item.setTitle("Open in new tab");
			item.onClick(() => openInNewTab(obsidianApp, filePath, false));
		});
		menu.addItem((item) => {
			item.setTitle("Open to the right");
			item.onClick(() => openToTheRight(obsidianApp, filePath));
		});
		menu.addSeparator();
		menu.addItem((item) => {
			item.setTitle("Delete file");
			item.onClick(async () => {
				await deleteFile(obsidianApp, filePath);
				duplicateUrlMap = await findDuplicateUrls(obsidianApp);
			});
		});
		menu.showAtMouseEvent(event);
	}

	onMount(async () => {
		duplicateUrlMap = await findDuplicateUrls(obsidianApp);
	});
</script>

<div>
	<h1>Duplicate Finder</h1>
	<p>Duplicate URLs: {duplicateUrlCount}</p>
	<input
		type="search"
		placeholder="Filter by file name..."
		value={searchValue}
		oninput={handleInputChange}
	/>
	<hr />
	<div class="accordion-list-container">
		{#each Array.from(filteredDuplicateUrlMap.entries()) as [url, files]}
			{#if files.length > 1}
				<div class="accordion">
					<details>
						<summary>{url} ({files.length} files)</summary>
						{#each files as file}
							<div
								role="button"
								tabindex="0"
								class="accordion-item"
								onkeydown={(event) => {
									if (event.key === "Enter") {
										handleItemClick(file);
									}
								}}
								onclick={() => handleItemClick(file)}
								oncontextmenu={(event) =>
									handleItemContextMenuClick(event, file)}
							>
								{file}
							</div>
						{/each}
					</details>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	h1 {
		font-size: 2rem;
	}

	hr {
		margin: 1.1rem 0;
	}

	.accordion-item {
		padding: 8px 16px;
		border-bottom: 1px solid #e0e0e0;
	}

	.accordion-item:hover {
		background-color: var(--background-modifier-hover);
	}

	summary {
		padding-bottom: 6px;
	}

	.accordion-list-container {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
