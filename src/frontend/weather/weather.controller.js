'use strict';

angular.module('smartHome')
	.controller('WeatherController', WeatherController);

/**
 * Controller for weather
 */
/*@ngInject*/
function WeatherController($window, $log, weatherData, WeatherDataService) {

	// controllerAs with vm
	var vm = this;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.weather = weatherData;

		vm.hourlyWeatherConfig = {
			options: {
				chart: {
					type: 'spline'
				},
				tooltip: {
					valueSuffix: '°C',
					style: {
						padding: 10,
						fontWeight: 'bold'
					}
				},
				legend: {
					enabled: false
				}
			},
			series: [],
			title: {
				text: 'Külső hőmérséklet (óránként)'
			},
			xAxis: {
				categories: []
			},
			yAxis: {
				title: {
					text: 'Hőmérséklet (°C)'
				}
			},
			size: {
				height: 313
			}
		};

		generateHourlyTemperatureData();
	}
	init();

	/**
	 * Refreshes all weather data from backend
	 */
	function refreshWeather() {
		WeatherDataService.query(function(data) {
			vm.weather = data;
			$log.debug('Weather loaded');

			generateHourlyTemperatureData();
		});
	}

	/**
	 * Generates hourly temperature data for HighCharts
	 */
	function generateHourlyTemperatureData() {
		var hourlyDataLabels = [];
		var hourlyDataValues = { name: 'Hőmérséklet', data: [] };

		for(var m = 12; m >= 1; m--) {
			if(angular.isDefined(vm.weather['tm' + m])) {
				hourlyDataLabels.push($window.moment(vm.weather['tm' + m].datatime).format('H') + 'h');
				hourlyDataValues.data.push(vm.weather['tm' + m].tempcurrent);
			}
		}

		if(angular.isDefined(vm.weather['t'])) {
			hourlyDataLabels.push($window.moment(vm.weather['t'].datatime).format('H') + 'h');
			hourlyDataValues.data.push({
				y: vm.weather['t'].tempcurrent,
				marker: {
					fillColor: '#d9534f',
					radius: 6
				}
			});
		}

		for(var p = 1; p <= 12; p++) {
			if(angular.isDefined(vm.weather['tp' + p])) {
				hourlyDataLabels.push($window.moment(vm.weather['tp' + p].datatime).format('H') + 'h');
				hourlyDataValues.data.push(vm.weather['tp' + p].tempcurrent);
			}
		}

		vm.hourlyWeatherConfig.xAxis.categories = hourlyDataLabels;
		vm.hourlyWeatherConfig.series = [hourlyDataValues];
	}

}
