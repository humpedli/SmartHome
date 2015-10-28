'use strict';

angular.module('smartHome')
	.controller('WeatherHourlyChartController', WeatherHourlyChartController);

/**
 * Controller for weather hourly chart directive
 */
/*@ngInject*/
function WeatherHourlyChartController($window) {

	// controllerAs with vm
	var vm = this;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.weather = vm.ngModel;

		generateChartConfig();
	}
	init();

	/**
	 * Generates chart config object
	 */
	function generateChartConfig() {
		vm.chartConfig = {
			options: {
				chart: {
					type: 'spline'
				},
				tooltip: {
					valueSuffix: vm.unit,
					style: {
						padding: 10,
						fontWeight: 'bold'
					}
				},
				legend: {
					enabled: false
				},
				colors: [vm.color]
			},
			series: [],
			title: {
				text: null
			},
			xAxis: {
				categories: []
			},
			yAxis: {
				title: {
					text: vm.yAxisText
				}
			},
			size: {
				height: vm.height
			}
		};

		generateData();
	}

	/**
	 * Generates data for chart
	 */
	function generateData() {
		var hourlyDataLabels = [];
		var hourlyDataValues = { name: vm.seriesTitle, data: [] };

		for(var m = 12; m >= 1; m--) {
			if(angular.isDefined(vm.weather['tm' + m])) {
				hourlyDataLabels.push($window.moment(vm.weather['tm' + m].datatime).format('H') + 'h');
				hourlyDataValues.data.push(vm.weather['tm' + m][vm.seriesType]);
			}
		}

		if(angular.isDefined(vm.weather['t'])) {
			hourlyDataLabels.push($window.moment(vm.weather['t'].datatime).format('H') + 'h');
			hourlyDataValues.data.push({
				y: vm.weather['t'][vm.seriesType],
				marker: {
					fillColor: '#d9534f',
					radius: 6
				}
			});
		}

		for(var p = 1; p <= 12; p++) {
			if(angular.isDefined(vm.weather['tp' + p])) {
				hourlyDataLabels.push($window.moment(vm.weather['tp' + p].datatime).format('H') + 'h');
				hourlyDataValues.data.push(vm.weather['tp' + p][vm.seriesType]);
			}
		}

		vm.chartConfig.xAxis.categories = hourlyDataLabels;
		vm.chartConfig.series = [hourlyDataValues];
	}

}
