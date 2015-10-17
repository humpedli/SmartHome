'use strict';

angular.module('smartHome')
	.controller('SettingsRelayAutomationTabController', SettingsRelayAutomationTabController);

/**
 * Controller for settings relay automation tab
 */
/*@ngInject*/
function SettingsRelayAutomationTabController() {

	// controllerAs with vm
	var vm = this;

	// Wired functions
	vm.addMainCondition = addMainCondition;
	vm.save = save;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.mainConditions = [];

		addMainCondition();
	}
	init();

	/**
	 * Adds an extra empty mainCondition to the mainConditions list
	 */
	function addMainCondition() {
		var mainConditionDTO = {
			relay: '2',
			operation: null,
			subConditions: []
		};

		vm.mainConditions.push({
			template: '<relay-main-condition ng-model="mainCondition.dto"></relay-main-condition>',
			dto: mainConditionDTO
		});
	}

	/**
	 * Saves the conditions list
	 */
	function save() {
		console.log(vm.mainConditions);
	}

}
