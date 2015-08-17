'use strict';

angular.module('smartHome')
	.controller('MenuController', MenuController);

/**
 * Controller for menu
 * @param $rootScope
 */
/*@ngInject*/
function MenuController($rootScope) {

	// controllerAs with vm
	var vm = this;

	vm.authenticated = $rootScope.authenticated;

}
