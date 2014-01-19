$(document).ready(function(){
    "use strict";

    var $city = $('#city'),
        $pollutants = $('#pollutants'),
        $body = $('body');

    function showStats(data) {
        $city.text(data.city);

        var items = [];
        for(var i= 0,l=data.pollutants.length; i<l; i++) {
            var pollutant = data.pollutants[i];

            var $li = $('<tr>'),
                $name = $('<td/>').addClass('name').text(pollutant.pollutant),
                $normPercent = $('<td/>').addClass('norm-percent').text(pollutant.normPercent + '%');

            if(pollutant.normPercent > 100) {
                $normPercent.addClass('warning');
            }

            $li.append($name).append($normPercent);
            items.push($li);
        }

        $pollutants.empty().append(items);
    }

    function showError() {
        $body.addClass('error');
    }

    function hideLoader() {
        $body.removeClass('loading');
    }

    $.getJSON('http://smogalert.pl/api/stats/krakow-krasinskiego')
        .done(showStats)
        .fail(showError)
        .always(hideLoader);
});