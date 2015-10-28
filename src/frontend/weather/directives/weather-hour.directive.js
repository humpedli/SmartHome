'use strict';

angular.module('smartHome')
	.directive('weatherHour', weatherHour);


/**
 * Directive for hour weather
 */
function weatherHour() {
	var name = 'weather-hour';

	return {
		templateUrl: 'views/' + name + '.tpl.html',
		restrict: 'E',
		scope: {
			ngModel: '=',
			color: '=',
			title: '@'
		}
	};
}
