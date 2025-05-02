import { App, Modal } from "obsidian";
import { mount, unmount } from "svelte";
import SvelteApp from "../svelte/index.svelte";

export default class FindDuplicatesModal extends Modal {
	svelteApp: ReturnType<typeof mount> | null = null;

	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		this.svelteApp = mount(SvelteApp, {
			target: contentEl,
			props: { obsidianApp: this.app },
		});
	}

	onClose() {
		if (this.svelteApp) {
			unmount(this.svelteApp);
		}
	}
}
