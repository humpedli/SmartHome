'use strict';

/**
 * Constant for weather types
 */
angular.module('smartHome')
	.constant('WEATHER_TYPES', [
		{
			id: 'tempcurrent',
			label: 'kinti hőmérséklet',
			onlyHourly: true,
			onlyDaily: false
		},
		{
			id: 'tempmax',
			label: 'kinti maximum hőmérséklet',
			onlyHourly: false,
			onlyDaily: true
		},
		{
			id: 'tempmin',
			label: 'kinti minimum hőmérséklet',
			onlyHourly: false,
			onlyDaily: true
		},
		{
			id: 'humidity',
			label: 'relatív páratartalom',
			onlyHourly: false,
			onlyDaily: false
		},
		{
			id: 'windspeed',
			label: 'szél sebessége',
			onlyHourly: false,
			onlyDaily: false
		},
		{
			id: 'precipprobability',
			label: 'csapadék esélye',
			onlyHourly: false,
			onlyDaily: false
		},
		{
			id: 'weathertype',
			label: 'időjárás jellege',
			onlyHourly: false,
			onlyDaily: false
		}
	]);
