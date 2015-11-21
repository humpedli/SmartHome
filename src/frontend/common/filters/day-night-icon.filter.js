'use strict';

angular
	.module('smartHome')
	.filter('dayNightIconFilter', dayNightIconFilter);


/**
 * Day-night icon filter for forecast.io icons
 */
/*@ngInject*/
function dayNightIconFilter($window) {
	return function (icon, sunrise, sunset) {
		if(icon === 'clear' || icon === 'partly-cloudy') {
			var sunriseDate = parseInt($window.moment(sunrise).format('Hmm').replace(/^0+/, ''));
			var sunsetDate = parseInt($window.moment(sunset).format('Hmm').replace(/^0+/, ''));
			var currentDate = parseInt($window.moment().format('Hmm').replace(/^0+/, ''));

			if(sunriseDate < currentDate && sunsetDate > currentDate) {
				return icon + '-day';
			} else {
				return icon + '-night';
			}
		}

		return icon;
	};

}
