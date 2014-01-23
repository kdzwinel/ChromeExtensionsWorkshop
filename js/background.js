(function () {
    "use strict";

    function countDangerousPollutants(pollutants) {
        return pollutants.filter(function (pollutant) {
            return (pollutant.normPercent > 100);
        }).length;
    }

    function updateBadge(data) {
        var count = countDangerousPollutants(data.pollutants);

        chrome.browserAction.setBadgeText({text: '' + count});
        chrome.browserAction.setBadgeBackgroundColor({
            color: (count > 0) ? '#FF0000' : '#00FF00'
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

    function showNotification(title, msg) {
        //ATM only osx, windows and chrome os support chrome.notifications
        if (chrome.notifications) {
            chrome.notifications.create("smog msg", {
                type: "basic",
                title: title,
                message: msg,
                iconUrl: 'img/icon_64.png'
            }, function () {});
        } else if (window.Notification) {
            //we use default HTML5 notifications for Linux
            var n = new Notification(title, {body: msg});
            n.onclick = showForecastPage;
        }
    }

    function checkForStatusChanges(newData) {
        var deferred = new $.Deferred();

        chrome.storage.local.get(function (oldData) {
            //only show notifications if these are enabled by user
            if (oldData.settings && oldData.settings.notifications) {
                if (oldData && oldData.pollutants) {
                    var oldValue = countDangerousPollutants(oldData.pollutants),
                        newValue = countDangerousPollutants(newData.pollutants);

                    if (oldValue === 0 && newValue > 0) {
                        showNotification("Smog Notification", "Pollution just got really bad, consider staying at home (" + newValue + " pollutant(s) exceeded their norms).");
                    } else if (newValue === 0 && oldValue > 0) {
                        showNotification("Smog Notification", "It's safe to go outside again. There are no pollutants that exceed their norms at the moment.");
                    }
                }
            }

            deferred.resolve(newData);
        });

        return deferred.promise();
    }

    function showForecastPage() {
        chrome.tabs.create({
            url: 'http://www.malopolska.pl/Obywatel/EKO-prognozaMalopolski/Malopolska/Strony/default.aspx',
            active: true
        });
    }

    function checkIfSettingsChanged(changes, area) {
        if (area === 'local' && changes.settings) {
            //resets the alarm if interval was changed
            if (changes.settings.oldValue.updateInterval !== changes.settings.newValue.updateInterval) {
                chrome.alarms.create("Get pollution info", {
                    periodInMinutes: changes.settings.newValue.updateInterval
                });
            }
            //reloads data if station changed
            if (changes.settings.oldValue.station !== changes.settings.newValue.station) {
                updateData();
            }
        }
    }

    function loadStationName() {
        var deferred = new $.Deferred();

        chrome.storage.local.get('settings', function (data) {
            if (data.settings && data.settings.station) {
                deferred.resolve(data.settings.station);
            } else {
                //default value
                deferred.resolve('krakow-krasinskiego');
            }
        });

        return deferred.promise();
    }

    function loadPollutionData(station) {
        return $.when($.getJSON('http://smogalert.pl/api/stats/' + station));
    }

    function updateData() {
        loadStationName()
            .then(loadPollutionData)
            .then(checkForStatusChanges)
            .done(saveData)
            .done(updateBadge)
            .fail(loadingFailed);
    }

    //this runs only once - when extension is loaded/installed/enabled, everything outside this callback runs every time
    //background page is reloaded
    chrome.runtime.onInstalled.addListener(function () {
        chrome.alarms.create("Get pollution info", {
            periodInMinutes: 60
        });

        //load data right away
        updateData();
    });

    //load data every X minutes
    chrome.alarms.onAlarm.addListener(updateData);

    chrome.storage.onChanged.addListener(checkIfSettingsChanged);

    if (chrome.notifications) {
        chrome.notifications.onClicked.addListener(showForecastPage);
    }
})();