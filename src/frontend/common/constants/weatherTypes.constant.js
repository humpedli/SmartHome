'use strict';

/**
 * Constant for weather types
 */
angular.module('smartHome')
	.constant('WEATHER_TYPES', [
		{
			id: 'TEMP_CURRENT',
			label: 'kinti hőmérséklet',
			onlyHourly: true,
			onlyDaily: false
		},
		{
			id: 'TEMP_MAX',
			label: 'kinti maximum hőmérséklet',
			onlyHourly: false,
			onlyDaily: true
		},
		{
			id: 'TEMP_MIN',
			label: 'kinti minimum hőmérséklet',
			onlyHourly: false,
			onlyDaily: true
		},
		{
			id: 'HUMIDITY',
			label: 'relatív páratartalom',
			onlyHourly: false,
			onlyDaily: false
		},
		{
			id: 'WIND_SPEED',
			label: 'szél sebessége',
			onlyHourly: false,
			onlyDaily: false
		},
		{
			id: 'PRECIP_PROBABILITY',
			label: 'csapadék esélye',
			onlyHourly: false,
			onlyDaily: false
		},
		{
			id: 'WEATHER_TYPE',
			label: 'időjárás jellege',
			onlyHourly: false,
			onlyDaily: false
		}
	]);
