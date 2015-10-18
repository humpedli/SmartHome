'use strict';

angular.module('smartHome')
	.controller('RelayMainCondition', RelayMainCondition);

/**
 * Controller for relay main condition directive
 */
/*@ngInject*/
function RelayMainCondition($scope, $log, OPERATIONS) {

	// controllerAs with vm
	var vm = this;

	// Wired functions
	vm.addSubCondition = addSubCondition;
	vm.removeSubCondition = removeSubCondition;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.operations = OPERATIONS;
		vm.relays = $scope.$parent.vm.relays;
		vm.sensors = $scope.$parent.vm.sensors;

		loadExistingAutomation();
	}
	init();

	/**
	 * Load existing automation (helper)
	 */
	function loadExistingAutomation() {
		var existingSubConditions = [];
		angular.copy(vm.ngModel.subConditions, existingSubConditions);
		vm.ngModel.subConditions = [];

		for(var i = 0; i < existingSubConditions.length; i++) {
			addSubCondition(existingSubConditions[i]);
		}

		if(existingSubConditions.length === 0) {
			addSubCondition();
		}

		$log.debug('Automation loaded (sub part)');
	}

	/**
	 * Adds an extra empty subCondition to the mainCondition's subConditions list
	 */
	function addSubCondition(existingDTO) {
		var subConditionDTO = {
			conditionType: null,
			condition: null,
			conditionid: null,
			conditionValue1: null,
			conditionValue2: null
		};

		vm.ngModel.subConditions.push({
			template: '<relay-sub-condition ng-model="subCondition.dto"></relay-sub-condition>',
			dto: (angular.isDefined(existingDTO) ? existingDTO : subConditionDTO)
		});
	}

	/**
	 * Removes a subCondition with the specified index
	 */
	function removeSubCondition(index) {
		vm.ngModel.subConditions.splice(index, 1);
	}

}
