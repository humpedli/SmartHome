'use strict';

angular.module('smartHome')
	.controller('DashboardController', DashboardController);

/**
 * Controller for dashboard
 * @param sensorsData
 * @param relaysData
 * @param SocketDataService
 */
/*@ngInject*/
function DashboardController($window, $log, sensorsData, relaysData, SocketDataService, RelayDataService,
							 SensorDataService) {

	// controllerAs with vm
	var vm = this;

	// Global variables
	var chroma;

	// Wired functions
	vm.switchRelayState = switchRelayState;
	vm.switchRelayStatus = switchRelayStatus;
	vm.getSensorLedStatus = getSensorLedStatus;
	vm.getSensorColorByTemp = getSensorColorByTemp;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.relays = relaysData;
		vm.sensors = sensorsData;

		// Generate color scale
		// http://gka.github.io/palettes/#colors=darkblue,blue,green,gold,red,firebrick|steps=60|bez=0|coL=0
		chroma = $window.chroma.scale(['darkblue', 'blue', 'green', 'gold', 'red', 'firebrick']).domain([-20,40]);

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
		});
		$log.debug('Relay list loaded');
	}

	/**
	 * Refreshes all sensor data from backend
	 */
	function refreshSensorsList() {
		SensorDataService.query(function(data) {
			vm.sensors = data;
		});
		$log.debug('Thermal sensor list loaded');
	}

	/**
	 * Switches relay state
	 * @param relay - Relay object
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
	 * @param relay - Relay object
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
	 * @param sensor - Sensor object
	 */
	function getSensorLedStatus(sensor) {
		if(angular.isDefined(sensor)) {
			var sensorLastTime = $window.moment(sensor.lasttime);
			var currentTime = $window.moment();

			return currentTime.diff(sensorLastTime, 'seconds') < 120;
		}
	}

	/**
	 * Determines sensor color by temp
	 * @param sensor - Sensor object
	 */
	function getSensorColorByTemp(sensor) {
		if(angular.isDefined(sensor)) {
			return chroma(sensor.lastvalue).hex();
		}
	}

}
