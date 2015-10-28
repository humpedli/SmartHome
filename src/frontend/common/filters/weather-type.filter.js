'use strict';

angular
	.module('smartHome')
	.filter('weatherTypeFilter', weatherTypeFilter);


/**
 * Weather type filter for forecast.io
 */
/*@ngInject*/
function weatherTypeFilter(WEATHER_CHARACTERISTICS, Utils) {
	return function (icon) {
		var weatherTypes = WEATHER_CHARACTERISTICS;

		for(var i = 0; i < weatherTypes.length; i++) {
			if(weatherTypes[i].value === icon) {
				return Utils.capitalizeFirstLetter(weatherTypes[i].label);
			}
		}

		return '';
	};

}
