"use strict";

document.onreadystatechange = function () {

    if (document.readyState !== "complete")
        return;

    var storage = new EPUBJS.storage();
    var upload = document.getElementById('upload');

    upload.addEventListener('change', function(e) {

        if (e.target.files.length === 0)
            return;
        
        if (window.FileReader) {

            var fr = new FileReader();
            fr.onload = function (e) {

                window.reader = ePubReader(e.target.result, { restore: true });

                storage.init(function () {

                    storage.clear();
                    storage.set(e.target.result);
                });
            };
            fr.readAsArrayBuffer(e.target.files[0]);

            if (location.href.includes("?bookPath")) {
            
                var readerUrl = chrome.runtime.getURL("index.html");
                chrome.tabs.update({ url: readerUrl });
            }

        } else {

            alert("Your browser does not support the required features.\n" +
                "Please use a modern browser such as Google Chrome, or Mozilla Firefox.");
        }
    });

    if (location.href.includes("?bookPath")) {

        window.reader = ePubReader(location.href, {
            restore: true
        });

        return;
    }

    storage.init(function () {

        storage.get(function (data) {

            if (data !== undefined) {

                window.reader = ePubReader(data, { restore: true });

            } else {

                window.reader = ePubReader('https://s3.amazonaws.com/moby-dick/', {

                    restore: true
                });
            }
        });
    });
};