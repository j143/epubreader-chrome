"use strict";

document.onreadystatechange = function () {

    if (document.readyState !== "complete")
        return;

    var reader;
    var upload = document.getElementById('upload');

    upload.addEventListener('change', function(e) {

        if (e.target.files.length === 0)
            return;

        var readerUrl = chrome.runtime.getURL("index.html");
        chrome.tabs.update({ url: readerUrl });
    });

    if (location.href.includes("?bookPath")) {

        reader = ePubReader(location.href, {
            restore: true
        });

        return;
    }

    var storage = new EPUBJS.storage();

    storage.init(function () {

        storage.get(function (data) {

            if (data !== undefined) {

                reader = ePubReader(data, { restore: true });

            } else {

                reader = ePubReader('https://s3.amazonaws.com/moby-dick/', {

                    restore: true
                });
            }
        });
    });

    window.reader = reader;
};