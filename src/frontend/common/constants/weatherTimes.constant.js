'use strict';

/**
 * Constant for weather times
 */
angular.module('smartHome')
	.constant('WEATHER_TIMES', [
		{
			id: 'yesterday',
			label: 'előző napon',
			past: true,
			future: false,
			day: true
		},
		{
			id: 'today',
			label: 'jelenlegi napon',
			past: false,
			future: false,
			day: true
		},
		{
			id: 'tomorrow',
			label: 'következő napon',
			past: false,
			future: true,
			day: true
		},
		{
			id: 'tomorrow_after',
			label: 'következő utáni napon',
			past: false,
			future: true,
			day: true
		},
		{
			id: 'tm12',
			label: 'előző 12 órában',
			past: true,
			future: false,
			day: false
		},
		{
			id: 'tm11',
			label: 'előző 11 órában',
			past: true,
			future: false,
			day: false
		},
		{
			id: 'tm10',
			label: 'előző 10 órában',
			past: true,
			future: false,
			day: false
		},
		{
			id: 'tm9',
			label: 'előző 9 órában',
			past: true,
			future: false,
			day: false
		},
		{
			id: 'tm8',
			label: 'előző 8 órában',
			past: true,
			future: false,
			day: false
		},
		{
			id: 'tm7',
			label: 'előző 7 órában',
			past: true,
			future: false,
			day: false
		},
		{
			id: 'tm6',
			label: 'előző 6 órában',
			past: true,
			future: false,
			day: false
		},
		{
			id: 'tm5',
			label: 'előző 5 órában',
			past: true,
			future: false,
			day: false
		},
		{
			id: 'tm4',
			label: 'előző 4 órában',
			past: true,
			future: false,
			day: false
		},
		{
			id: 'tm3',
			label: 'előző 3 órában',
			past: true,
			future: false,
			day: false
		},
		{
			id: 'tm2',
			label: 'előző 2 órában',
			past: true,
			future: false,
			day: false
		},
		{
			id: 'tm1',
			label: 'előző órában',
			past: true,
			future: false,
			day: false
		},
		{
			id: 't',
			label: 'jelenleg',
			past: false,
			future: false,
			day: false
		},
		{
			id: 'tp1',
			label: 'következő órában',
			past: false,
			future: true,
			day: false
		},
		{
			id: 'tp2',
			label: 'következő 2 órában',
			past: false,
			future: true,
			day: false
		},
		{
			id: 'tp3',
			label: 'következő 3 órában',
			past: false,
			future: true,
			day: false
		},
		{
			id: 'tp4',
			label: 'következő 4 órában',
			past: false,
			future: true,
			day: false
		},
		{
			id: 'tp5',
			label: 'következő 5 órában',
			past: false,
			future: true,
			day: false
		},
		{
			id: 'tp6',
			label: 'következő 6 órában',
			past: false,
			future: true,
			day: false
		},
		{
			id: 'tp7',
			label: 'következő 7 órában',
			past: false,
			future: true,
			day: false
		},
		{
			id: 'tp8',
			label: 'következő 8 órában',
			past: false,
			future: true,
			day: false
		},
		{
			id: 'tp9',
			label: 'következő 9 órában',
			past: false,
			future: true,
			day: false
		},
		{
			id: 'tp10',
			label: 'következő 10 órában',
			past: false,
			future: true,
			day: false
		},
		{
			id: 'tp11',
			label: 'következő 11 órában',
			past: false,
			future: true,
			day: false
		},
		{
			id: 'tp12',
			label: 'következő 12 órában',
			past: false,
			future: true,
			day: false
		}
	]);
