import { Plugin } from "obsidian";
import FindDuplicatesModal from "./obsidian/find-duplicates-modal";

interface FindDuplicatesSettings {}

const DEFAULT_SETTINGS: FindDuplicatesSettings = {};

export default class FindDuplicatesPlugin extends Plugin {
	settings: FindDuplicatesSettings = DEFAULT_SETTINGS;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: "open-find-duplicates",
			name: "Open Find Duplicates",
			callback: () => {
				new FindDuplicatesModal(this.app).open();
			},
		});
		// // This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
