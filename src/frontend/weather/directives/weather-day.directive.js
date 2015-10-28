'use strict';

angular.module('smartHome')
	.directive('weatherDay', weatherDay);


/**
 * Directive for day weather
 */
function weatherDay() {
	var name = 'weather-day';

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
