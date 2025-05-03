import { ItemView, WorkspaceLeaf } from "obsidian";
import { DUPLICATE_FINDER_VIEW } from "src/constants";
import type DuplicateFinderPlugin from "src/main";
import { mount, unmount } from "svelte";
import SvelteApp from "../svelte/index.svelte";

export default class DuplicateFinderView extends ItemView {
	svelteApp: ReturnType<typeof mount> | null;
	plugin: DuplicateFinderPlugin;

	constructor(leaf: WorkspaceLeaf, plugin: DuplicateFinderPlugin) {
		super(leaf);
		this.svelteApp = null;
		this.plugin = plugin;
		this.navigation = true;
	}

	getIcon(): string {
		return "file-search";
	}

	getViewType(): string {
		return DUPLICATE_FINDER_VIEW;
	}
	getDisplayText(): string {
		return "Duplicate Finder";
	}

	async onOpen() {
		const { contentEl } = this;
		this.svelteApp = mount(SvelteApp, {
			target: contentEl,
			props: { obsidianApp: this.app },
		});
	}

	async onClose() {
		if (this.svelteApp) {
			unmount(this.svelteApp);
		}
	}
}
