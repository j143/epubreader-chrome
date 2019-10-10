chrome.contextMenus.create({
	title: "Open Reader",
	contexts: ["page_action"],
	onclick: function() {
		chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
	}
});