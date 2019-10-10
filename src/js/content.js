"use strict";

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        if (location.href.includes("?bookPath=data"))
        {
            window.reader = ePubReader(location.href, {
                restore: true,
                encoding: 'base64'
            });
        }
        else if (location.href.includes("?bookPath"))
        {
            window.reader = ePubReader(location.href, {
                restore: true
            });
        }

        var $upload = $("#upload");

        $upload.change(function(e) {
            if (e.target.files.length === 0)
                return;

            var file = e.target.files[0];
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function(e) {
                var readerUrl = chrome.runtime.getURL("index.html") + "?bookPath=" + e.target.result;
                chrome.tabs.update({ url: readerUrl });
            };
            fileReader.onerror = function() {
                console.log(fileReader.error);
            };
        });

        $("#upload-book").click(function() {
            $upload.click();
        });
    }
};