import type { App } from "obsidian";

export const openToTheRight = (app: App, filePath: string) => {
	app.workspace.openLinkText(filePath, "", "split", {
		active: false,
	});
};

export const openInNewTab = async (
	app: App,
	filePath: string,
	active: boolean
) => {
	const isOpen = app.workspace.getLeavesOfType("markdown").some((leaf) => {
		const viewState = leaf.getViewState();
		return viewState.state?.file === filePath;
	});

	if (isOpen) {
		return;
	}

	app.workspace.openLinkText(filePath, "", "tab", {
		active,
	});
};
