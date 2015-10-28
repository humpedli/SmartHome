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
			var sunriseDate = $window.moment(sunrise).format('Hm').replace(/^0+/, '');
			var sunsetDate = $window.moment(sunset).format('Hm').replace(/^0+/, '');
			var currentDate = $window.moment().format('Hm').replace(/^0+/, '');

			if(sunriseDate < currentDate && sunsetDate > currentDate) {
				return icon + '-day';
			} else {
				return icon + '-night';
			}
		}

		return icon;
	};

}
