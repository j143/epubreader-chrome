chrome.webRequest.onBeforeRequest.addListener(function(data) {
	return { "redirectUrl": chrome.runtime.getURL("index.html") + "?bookPath=" + data.url };
},
{
	"urls": ["*://*/*.epub", "*://*/*.EPUB"],
	"types": ["main_frame"]
}, 
["blocking"]);