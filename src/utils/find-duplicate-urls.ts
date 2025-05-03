import type { App } from "obsidian";

export const findDuplicateUrls = async (
	app: App
): Promise<Map<string, string[]>> => {
	const urlMap = new Map<string, string[]>();
	const files = app.vault.getMarkdownFiles();

	for (const file of files) {
		const content = await app.vault.cachedRead(file);
		const matches = matchUrls(content);
		if (matches) {
			for (const url of matches) {
				if (!urlMap.has(url)) {
					urlMap.set(url, []);
				}
				urlMap.get(url)?.push(file.path);
			}
		}
	}

	const sortedUrlMap = new Map(
		[...urlMap.entries()].sort((a, b) => a[0].localeCompare(b[0]))
	);
	return sortedUrlMap;
};

const matchUrls = (content: string) => {
	const urlRegex = /(?:https?:\/\/)(?:[^\s\)]+)/g;
	const matches = content.match(urlRegex);
	return matches;
};
