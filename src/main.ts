import { Plugin } from "obsidian";
import { DUPLICATE_FINDER_VIEW } from "./constants";
import DuplicateFinderView from "./obsidian/duplicate-finder-view";

interface DuplicateFinderSettings {}

const DEFAULT_SETTINGS: DuplicateFinderSettings = {};

export default class DuplicateFinderPlugin extends Plugin {
	settings: DuplicateFinderSettings = DEFAULT_SETTINGS;

	async onload() {
		await this.loadSettings();

		this.registerView(
			DUPLICATE_FINDER_VIEW,
			(leaf) => new DuplicateFinderView(leaf, this)
		);

		this.addCommand({
			id: "open",
			name: "Open finder",
			callback: async () => {
				this.openFinderView();
			},
		});

		this.addRibbonIcon("file-search", "Open finder", async () => {
			this.openFinderView();
		});

		// TODO add when needed
		// this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	private openFinderView() {
		const leaves = this.app.workspace.getLeavesOfType(
			DUPLICATE_FINDER_VIEW
		);
		if (leaves.length !== 0) {
			const leaf = leaves[0];
			this.app.workspace.revealLeaf(leaf);
		} else {
			this.app.workspace.getLeaf("tab").setViewState({
				type: DUPLICATE_FINDER_VIEW,
				active: true,
			});
		}
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
