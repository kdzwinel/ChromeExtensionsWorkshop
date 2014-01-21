(function () {
    "use strict";

    function updateBadge(data) {
        var danger = 0;

        for (var i = 0, l = data.pollutants.length; i < l; i++) {
            var pollutant = data.pollutants[i];

            if (pollutant.normPercent > 100) {
                danger++;
            }
        }

        chrome.browserAction.setBadgeText({text: '' + danger});
        chrome.browserAction.setBadgeBackgroundColor({
            color: (danger > 0) ? '#FF0000' : '#00FF00'
        });
    }

    function saveData(data) {
        //append download date
        data.downloadDate = (new Date()).toString();

        chrome.storage.local.set(data);

        console.log('Data updated.', new Date());
    }

    function loadingFailed() {
        console.warn('Data loading failed.', new Date());
    }

    function updateData() {
        $.getJSON('http://smogalert.pl/api/stats/krakow-krasinskiego')
            .done(saveData)
            .done(updateBadge)
            .fail(loadingFailed);
    }

    //this runs only once - when extension is loaded/installed/enabled, everything outside this callback runs every time
    //background page is reloaded
    chrome.runtime.onInstalled.addListener(function(){
        chrome.alarms.create("Get pollution info", {
            periodInMinutes: 60
        });

        //load data right away
        updateData();
    });

    //load data every X minutes
    chrome.alarms.onAlarm.addListener(updateData);
})();