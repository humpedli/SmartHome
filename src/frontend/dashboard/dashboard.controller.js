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
function DashboardController($log, sensorsData, relaysData, SocketDataService, RelayDataService,
							 SensorDataService) {

	// controllerAs with vm
	var vm = this;

	// Wired functions
	vm.switchRelayState = switchRelayState;
	vm.switchRelayStatus = switchRelayStatus;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.relays = relaysData;
		vm.sensors = sensorsData;

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
		RelayDataService.save({
			relayid: relay.relayid,
			subfunction: 'state',
			state: relay.state
		}).$promise.then(function () {
				SocketDataService.emit('Relays::change', relay);
			});
	}

	/**
	 * Switches relay status
	 * @param relay - Relay object
	 */
	function switchRelayStatus(relay) {
		RelayDataService.save({
			relayid: relay.relayid,
			subfunction: 'status',
			status: relay.status
		}).$promise.then(function () {
				SocketDataService.emit('Relays::change', relay);
			});
	}

}
