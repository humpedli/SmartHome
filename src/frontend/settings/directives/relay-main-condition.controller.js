'use strict';

angular.module('smartHome')
	.controller('RelayMainCondition', RelayMainCondition);

/**
 * Controller for relay main condition directive
 */
/*@ngInject*/
function RelayMainCondition(RelayDataService, $log, OPERATIONS) {

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

		getRelaysList();
		addSubCondition();
	}
	init();

	/**
	 * Gets all relay data from backend
	 */
	function getRelaysList() {
		vm.relays = RelayDataService.query();
		$log.debug('Relay list loaded');
	}

	/**
	 * Adds an extra empty subCondition to the mainCondition's subConditions list
	 */
	function addSubCondition() {
		var subConditionDTO = {
			connectedWithPrevious: null,
			conditionType: null,
			conditionValue1: null,
			conditionValue2: null
		};

		vm.ngModel.subConditions.push({
			template: '<relay-sub-condition ng-model="subCondition.dto"></relay-sub-condition>',
			dto: subConditionDTO
		});
	}

	/**
	 * Removes a subCondition with the specified index
	 */
	function removeSubCondition(index) {
		vm.ngModel.subConditions.splice(index, 1);
	}

}
