'use strict';

angular.module('smartHome')
	.controller('RelaySubCondition', RelaySubCondition);

/**
 * Controller for relay sub condition directive
 */
/*@ngInject*/
function RelaySubCondition($scope, CONDITIONS, CONDITION_TYPES, DAY_OPTIONS, OPERATIONS) {

	// controllerAs with vm
	var vm = this;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.conditions = CONDITIONS;
		vm.conditionTypes = CONDITION_TYPES;
		vm.dayOptions = DAY_OPTIONS;
		vm.operations = OPERATIONS;
		vm.relays = $scope.$parent.vm.relays;
		vm.sensors = $scope.$parent.vm.sensors;
	}
	init();

}
