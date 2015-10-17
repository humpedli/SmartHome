'use strict';

/**
 * Constant for condition day options
 */
angular.module('smartHome')
	.constant('DAY_OPTIONS', [
		{
			value: 'monday',
			label: 'hétfő'
		},
		{
			value: 'tuesday',
			label: 'kedd'
		},
		{
			value: 'wednesday',
			label: 'szerda'
		},
		{
			value: 'thursday',
			label: 'csütörtök'
		},
		{
			value: 'friday',
			label: 'péntek'
		},
		{
			value: 'saturday',
			label: 'szombat'
		},
		{
			value: 'sunday',
			label: 'vasárnap'
		},
		{
			value: 'weekday',
			label: 'hétköznap'
		},
		{
			value: 'weekend',
			label: 'hétvége'
		}
	]);
