'use strict';

/**
 * Constant for condition types
 */
angular.module('smartHome')
	.constant('CONDITION_TYPES', [
		{
			id: 'TEMP',
			label: 'a hőmérséklet'
		},
		{
			id: 'DAY',
			label: 'a jelenlegi nap'
		},
		{
			id: 'DATE',
			label: 'a jelenlegi dátum'
		},
		{
			id: 'TIME',
			label: 'a jelenlegi idő'
		},
		{
			id: 'RELAY',
			label: 'egy másik relé'
		},
		{
			id: 'WEATHER',
			label: 'az időjárás-jelentés alapján'
		}
	]);
