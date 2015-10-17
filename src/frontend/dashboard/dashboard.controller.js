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
function DashboardController(sensorsData, relaysData, SocketDataService) {

	// controllerAs with vm
	var vm = this;

	// Wired functions
	vm.switchRelay = switchRelay;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.switches = [];

		vm.sensors = sensorsData;
		vm.relays = relaysData;

		// ToDo: implement this completely
		SocketDataService.on('relay1.message', function (data) {
			vm.switches['1a'] = data.status;
		});
	}
	init();

	/**
	 * Switches relay status
	 * @param relayId
	 * @param relayType
	 */
	function switchRelay(relayId, relayType) {
		// ToDo: implement this completely
		if(relayId === 1 && relayType === 'a') {
			SocketDataService.emit('relay1.trigger', { signal: vm.switches['1a'] });
		}
	}

}
