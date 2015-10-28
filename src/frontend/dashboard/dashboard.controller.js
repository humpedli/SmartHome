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
		});
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
