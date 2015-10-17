'use strict';

angular.module('smartHome')
	.controller('RelaySubCondition', RelaySubCondition);

/**
 * Controller for relay sub condition directive
 */
/*@ngInject*/
function RelaySubCondition(SensorDataService, $log, CONDITIONS, CONDITION_TYPES, CONNECTION_TYPES, DAY_OPTIONS) {

	// controllerAs with vm
	var vm = this;

	// Wired functions
	vm.getSensorsList = getSensorsList;
	vm.getTempValuesArray = getTempValuesArray;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.conditions = CONDITIONS;
		vm.conditionTypes = CONDITION_TYPES;
		vm.connectionTypes = CONNECTION_TYPES;
		vm.dayOptions = DAY_OPTIONS;

		getSensorsList();
	}
	init();

	/**
	 * Gets all sensor data from backend
	 */
	function getSensorsList() {
		vm.sensors = SensorDataService.query();
		$log.debug('Thermal sensor list loaded');
	}

	/**
	 * Generates temperature values, and stores it in an array, then returns it
	 */
	function getTempValuesArray() {
		var array = [];
		for (var i = -20; i <= 40; i += 0.5) {
			array.push(i);
		}
		return array;
	}

}
