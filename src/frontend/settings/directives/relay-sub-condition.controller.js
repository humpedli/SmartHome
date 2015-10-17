'use strict';

angular.module('smartHome')
	.controller('RelaySubCondition', RelaySubCondition);

/**
 * Controller for relay sub condition directive
 */
/*@ngInject*/
function RelaySubCondition(SensorDataService, RelayDataService, $log, CONDITIONS, CONDITION_TYPES, CONNECTION_TYPES,
						   DAY_OPTIONS, OPERATIONS) {

	// controllerAs with vm
	var vm = this;

	// Wired functions
	vm.getSensorsList = getSensorsList;
	vm.getTempValuesArray = getTempValuesArray;
	vm.conditionTypeChanged = conditionTypeChanged;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.conditions = CONDITIONS;
		vm.conditionTypes = CONDITION_TYPES;
		vm.connectionTypes = CONNECTION_TYPES;
		vm.dayOptions = DAY_OPTIONS;
		vm.operations = OPERATIONS;

		getSensorsList();
		getRelaysList();
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
	 * Gets all relay data from backend
	 */
	function getRelaysList() {
		vm.relays = RelayDataService.query();
		$log.debug('Relay list loaded');
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

	/**
	 * Called, if condition type is changed
	 * This function sets default values, for specified condition types
	 */
	function conditionTypeChanged(conditionType) {
		if(conditionType === 'TEMP') {
			vm.ngModel.conditionValue2 = 0;
		} else {
			vm.ngModel.conditionValue2 = undefined;
		}
	}

}
