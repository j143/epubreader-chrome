"use strict";

document.onreadystatechange = function () {

    if (document.readyState !== "complete")
        return;

    if (location.href.includes("?bookPath=data")) {
        
        window.reader = ePubReader(location.href, {
            restore: true,
            encoding: 'base64'
        });

    } else if (location.href.includes("?bookPath")) {

        window.reader = ePubReader(location.href, {
            restore: true
        });
    }

    // this part of the code actually duplicates the basic implementation of 
    // the upload controller: https://github.com/intity/epubjs-reader/blob/master/src/controllers/upload_controller.js

    var upload = document.getElementById('upload');

    upload.addEventListener('change', function(e) {

        if (e.target.files.length === 0)
            return;

        var file = e.target.files[0];
        var fileReader = new FileReader();

        fileReader.readAsArrayBuffer(file);
        fileReader.onload = function (e) {
            window.reader = ePubReader(e.target.result, {
                restore: true
            });
        };

        // the issue of loading epub from base64 format is still not closed: https://github.com/futurepress/epub.js/issues/731

        // fileReader.readAsDataURL(file);
        // fileReader.onload = function(e) {
        //     var readerUrl = chrome.runtime.getURL("index.html") + "?bookPath=" + e.target.result;
        //     chrome.tabs.update({ url: readerUrl });
        // };

        fileReader.onerror = function() {
            console.log(fileReader.error);
        };
    });
};