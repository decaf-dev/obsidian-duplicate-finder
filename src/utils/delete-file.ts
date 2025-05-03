import { App, Notice } from "obsidian";

export const deleteFile = async (app: App, filePath: string) => {
	const file = app.vault.getFileByPath(filePath);
	if (file) {
		await app.vault.delete(file);
	} else {
		new Notice("Cannot delete file, file not found");
	}
};
