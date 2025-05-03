import { App, PluginSettingTab } from "obsidian";
import DuplicateFinderPlugin from "src/main";

export class DuplicateFinderSettingTab extends PluginSettingTab {
	plugin: DuplicateFinderPlugin;

	constructor(app: App, plugin: DuplicateFinderPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
	}
}
