(function () {
    "use strict";

    var $form = $('form'),
        $stationInput = $form.find('#station'),
        $updateIntervalInput = $form.find('#updateInterval'),
        $notificationsInput = $form.find('#notifications');

    var defaults = {
            station: 'krakow-krasinskiego',
            updateInterval: 60,
            notifications: true
        },
        settings = null;

    function loadSettings() {
        var deferred = new $.Deferred();

        chrome.storage.local.get('settings', function (data) {
            settings = data.settings ? data.settings : {};
            settings = $.extend({}, defaults, settings);
            deferred.resolve(settings);
        });

        return deferred.promise();
    }

    function saveSettings(newSettings) {
        settings = newSettings;

        chrome.storage.local.set({
            settings: newSettings
        }, function () {});
    }

    function loadStations(settings) {
        var deferred = new $.Deferred();

        if (!settings.stations) {
            $.getJSON('http://smogalert.pl/api/stations')
                .done(function (data) {
                    settings.stations = data;
                    saveSettings(settings);
                    deferred.resolve(settings);
                })
                .fail(function () {
                    deferred.reject();
                });
        } else {
            deferred.resolve(settings);
        }

        return deferred.promise();
    }

    function showError() {
        $form.remove();
        //TODO make something nicer than alert() here
        alert('Error loading list of stations. Try again later.');
    }

    function hideLoader() {
        $('body').removeClass('loading');
    }

    function onSettingsChanged() {
        //validate interval
        var interval = parseInt($form.find('#updateInterval').val(), 10);
        if (isNaN(interval) || interval < 15 || interval > 180) {
            $form.find('#updateInterval').val('' + settings.updateInterval);
            return;
        }

        saveSettings({
            station: $stationInput.val(),
            notifications: $notificationsInput.is(':checked'),
            updateInterval: interval,
            stations: settings.stations
        });
    }

    function showForm(settings) {
        var options = [];

        settings.stations.forEach(function (station) {
            var option = $('<option/>')
                .text(station.address + " (" + station.cityArea + ")")
                .attr('value', station._id);

            options.push(option);
        });

        $stationInput.append(options).val(settings.station);
        $updateIntervalInput.val('' + settings.updateInterval);

        if (settings.notifications) {
            $notificationsInput.attr('checked', 'checked');
        } else {
            $notificationsInput.removeAttr('checked');
        }

        $form.on('change', 'input, select', onSettingsChanged);
    }

    loadSettings()
        .then(loadStations)
        .done(showForm)
        .fail(showError)
        .always(hideLoader);
})();