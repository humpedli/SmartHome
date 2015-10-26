'use strict';

/**
 * Constant for weather characteristics
 */
angular.module('smartHome')
	.constant('WEATHER_CHARACTERISTICS', [
		{
			value: 'clear',
			label: 'tiszta idő'
		},
		{
			value: 'partly-cloudy',
			label: 'részben felhős idő'
		},
		{
			value: 'cloudy',
			label: 'felhős idő'
		},
		{
			value: 'rain',
			label: 'esős idő'
		},
		{
			value: 'sleet',
			label: 'ónos esős idő'
		},
		{
			value: 'rain',
			label: 'havas idő'
		},
		{
			value: 'wind',
			label: 'szeles idő'
		},
		{
			value: 'fog',
			label: 'ködös idő'
		},
		{
			value: 'hail',
			label: 'jégesős idő'
		},
		{
			value: 'thunderstorm',
			label: 'viharos idő'
		}
	]);
