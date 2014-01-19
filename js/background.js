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

    chrome.alarms.create("Get pollution info", {
        periodInMinutes: 5
    });

    //load data right away
    updateData();

    //load data every X minutes
    chrome.alarms.onAlarm.addListener(updateData);
})();