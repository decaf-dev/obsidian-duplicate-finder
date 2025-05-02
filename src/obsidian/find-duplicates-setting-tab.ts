import { App, PluginSettingTab } from "obsidian";
import FindDuplicatesPlugin from "src/main";

export class FindDuplicatesSettingTab extends PluginSettingTab {
	plugin: FindDuplicatesPlugin;

	constructor(app: App, plugin: FindDuplicatesPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
	}
}
