'use strict';

angular.module('smartHome')
	.controller('DashboardController', DashboardController);

/**
 * Controller for dashboard
 */
/*@ngInject*/
function DashboardController($window, $log, sensorsData, relaysData, weatherData, SocketDataService, RelayDataService,
							 SensorDataService, WeatherDataService) {

	// controllerAs with vm
	var vm = this;

	// Wired functions
	vm.switchRelayState = switchRelayState;
	vm.switchRelayStatus = switchRelayStatus;
	vm.getSensorLedStatus = getSensorLedStatus;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.relays = relaysData;
		vm.sensors = sensorsData;
		vm.weather = weatherData;

		// If relays are changed by node script, refresh the data on frontend
		SocketDataService.on('Relays::changed', function () {
			refreshRelaysList();
		});

		// If sensors are changed by node script, refresh the data on frontend
		SocketDataService.on('Sensors::changed', function () {
			refreshSensorsList();
		});

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
	 * Refreshes all relay data from backend
	 */
	function refreshRelaysList() {
		RelayDataService.query(function(data) {
			vm.relays = data;
			$log.debug('Relay list loaded');
		});
	}

	/**
	 * Refreshes all sensor data from backend
	 */
	function refreshSensorsList() {
		SensorDataService.query(function(data) {
			vm.sensors = data;
			$log.debug('Thermal sensor list loaded');
		});
	}

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
		console.log(weatherData);

		for(var m = 12; m >= 1; m--) {
			if(angular.isDefined(weatherData['tm' + m])) {
				hourlyDataLabels.push($window.moment(weatherData['tm' + m].datatime).format('H') + 'h');
				hourlyDataValues.data.push(weatherData['tm' + m].tempcurrent);
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

	/**
	 * Switches relay state
	 * @param relay - relay DTO object
	 */
	function switchRelayState(relay) {
		if(angular.isDefined(relay)) {
			RelayDataService.save({
				relayid: relay.relayid,
				subfunction: 'state',
				state: relay.state
			}).$promise.then(function () {
					SocketDataService.emit('Relays::change', relay);
				});
		}
	}

	/**
	 * Switches relay status
	 * @param relay - relay DTO object
	 */
	function switchRelayStatus(relay) {
		if(angular.isDefined(relay)) {
			RelayDataService.save({
				relayid: relay.relayid,
				subfunction: 'status',
				status: relay.status
			}).$promise.then(function () {
					SocketDataService.emit('Relays::change', relay);
				});
		}
	}

	/**
	 * Determines sensor led status
	 * @param sensor - sensor DTO object
	 */
	function getSensorLedStatus(sensor) {
		if(angular.isDefined(sensor)) {
			var sensorLastTime = $window.moment(sensor.lasttime);
			var currentTime = $window.moment();

			return currentTime.diff(sensorLastTime, 'seconds') < 120;
		}
	}

}
