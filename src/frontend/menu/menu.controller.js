'use strict';

angular.module('smartHome')
	.controller('MenuController', MenuController);

/**
 * Controller for menu
 */
/*@ngInject*/
function MenuController($rootScope, SocketDataService) {

	// controllerAs with vm
	var vm = this;

	SocketDataService.on('connect', function () {
		$rootScope.isLiveData = true;
	});

	SocketDataService.on('disconnect', function () {
		$rootScope.isLiveData = false;
	});

}
