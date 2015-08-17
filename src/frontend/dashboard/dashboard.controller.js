'use strict';

angular.module('smartHome')
	.controller('DashboardController', DashboardController);

/**
 * Controller for dashboard
 * @param $log
 */
/*@ngInject*/
function DashboardController(SensorDataService, SocketDataService) {

	// controllerAs with vm
	var vm = this;

	vm.sensors = SensorDataService.query();

	SocketDataService.on('relay1.message', function (data) {
		vm.sw1 = data.status;
	});

	vm.switch = function() {
		SocketDataService.emit('relay1.trigger', { signal: vm.sw1 });
	};

}
