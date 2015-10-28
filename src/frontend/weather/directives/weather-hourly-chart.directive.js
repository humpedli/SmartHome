'use strict';

angular.module('smartHome')
	.directive('weatherHourlyChart', weatherHourlyChart);


/**
 * Directive for weather hourly chart
 */
function weatherHourlyChart() {
	var name = 'weather-hourly-chart';

	return {
		templateUrl: 'views/' + name + '.tpl.html',
		restrict: 'E',
		scope: {
			chartId: '@',
			height: '@',
			unit: '@',
			color: '@',
			yAxisText: '@',
			seriesTitle: '@',
			seriesType: '@',
			ngModel: '='
		},
		controller: 'WeatherHourlyChartController',
		controllerAs: 'vm',
		bindToController: true
	};
}
