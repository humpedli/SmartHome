'use strict';

angular.module('smartHome')
	.controller('SettingsRelayAutomationTabController', SettingsRelayAutomationTabController);

/**
 * Controller for settings relay automation tab
 */
/*@ngInject*/
function SettingsRelayAutomationTabController($modal, $log, SensorDataService, RelayDataService,
											  AutomationDataService, Utils) {

	// controllerAs with vm
	var vm = this;

	// Wired functions
	vm.getSensorsList = getSensorsList;
	vm.getRelaysList = getRelaysList;
	vm.addMainCondition = addMainCondition;
	vm.removeMainCondition = removeMainCondition;
	vm.save = save;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.mainConditions = [];

		getSensorsList();
		getRelaysList();
		loadExistingAutomation();
	}
	init();

	/**
	 * Gets all sensor data from backend
	 */
	function getSensorsList() {
		SensorDataService.query(function(data) {
			vm.sensors = data;
			$log.debug('Thermal sensor list loaded');
		});
	}

	/**
	 * Gets all relay data from backend
	 */
	function getRelaysList() {
		RelayDataService.query(function(data) {
			vm.relays = data;
			$log.debug('Relay list loaded');
		});
	}

	/**
	 * Load existing automation helper
	 */
	function loadExistingAutomation() {
		AutomationDataService.query().$promise.then(function (data) {
			for(var i = 0; i < data.length; i++) {
				addMainCondition(data[i]);
			}

			if(data.length === 0) {
				addMainCondition();
			}
		});

		$log.debug('Automation loaded (main part)');
	}

	/**
	 * Adds an extra empty mainCondition to the mainConditions list
	 */
	function addMainCondition(existingDTO) {
		var mainConditionDTO = {
			relay: null,
			operationid: null,
			operation: null,
			subConditions: []
		};

		vm.mainConditions.push({
			template: '<relay-main-condition ng-model="mainCondition.dto"></relay-main-condition>',
			dto: (angular.isDefined(existingDTO) ? existingDTO : mainConditionDTO)
		});
	}

	/**
	 * Removes a mainCondition with the specified index
	 */
	function removeMainCondition(index) {
		vm.mainConditions.splice(index, 1);
	}

	/**
	 * Validates the conditions list
	 */
	function validate() {
		var errorList = [];

		for(var i = 0; i < vm.mainConditions.length; i++) {
			var mainCondition = vm.mainConditions[i].dto;

			errorList = errorList.concat(validateMainCondition(mainCondition, i));

			for(var j = 0; j < mainCondition.subConditions.length; j++) {
				var subCondition = mainCondition.subConditions[j].dto;

				errorList = errorList.concat(validateSubCondition(subCondition, i, j));
			}
		}

		if(errorList.length > 0) {
			$modal({
				title: 'Hiba!',
				content: errorList.join('<br>'),
				templateUrl: Utils.getTemplateUrl('ModalWithoutFooter')
			});

			return false;
		} else {
			return true;
		}
	}

	/**
	 * Validates a main condition
	 */
	function validateMainCondition(mainCondition, i) {
		var errorList = [];

		if(angular.isUndefinedOrNull(mainCondition.relay)) {
			errorList.push('A(z) <b>' + (i + 1) + '.</b> feltétel csoportban nincs kiválasztva relé!');
		}
		if(angular.isUndefinedOrNull(mainCondition.operation)) {
			errorList.push('A(z) <b>' + (i + 1) + '.</b> feltétel csoportban nincs kiválasztva művelet!');
		}

		return errorList;
	}

	/**
	 * Validates a sub condition
	 */
	function validateSubCondition(subCondition, i, j) {
		var errorList = [];

		if(angular.isUndefinedOrNull(subCondition.conditionType)) {
			errorList.push('A(z) <b>' + (i + 1) + '.</b> feltétel csoport <b>' + (j + 1) +
				'.</b> feltételénél nincs kiválasztva kategória!');
		}
		if(angular.isUndefinedOrNull(subCondition.condition) && subCondition.conditionType !== 'RELAY') {
			errorList.push('A(z) <b>' + (i + 1) + '.</b> feltétel csoport <b>' + (j + 1) +
				'.</b> feltételénél nincs kiválasztva feltétel!');
		}
		if(!angular.isUndefinedOrNull(subCondition.conditionType)) {
			if (subCondition.conditionType === 'TEMP') {
				if (angular.isUndefinedOrNull(subCondition.conditionValue1)) {
					errorList.push('A(z) <b>' + (i + 1) + '.</b> feltétel csoport <b>' + (j + 1) +
						'.</b> feltételénél nincs kiválasztva érzékelő!');
				}
				if (angular.isUndefinedOrNull(subCondition.conditionValue2)) {
					errorList.push('A(z) <b>' + (i + 1) + '.</b> feltétel csoport <b>' + (j + 1) +
						'.</b> feltételénél nincs kiválasztva hőmérséklet!');
				}
			} else if(subCondition.conditionType === 'RELAY') {
				if (angular.isUndefinedOrNull(subCondition.conditionValue1)) {
					errorList.push('A(z) <b>' + (i + 1) + '.</b> feltétel csoport <b>' + (j + 1) +
						'.</b> feltételénél nincs kiválasztva relé!');
				}
				if (angular.isUndefinedOrNull(subCondition.conditionValue2)) {
					errorList.push('A(z) <b>' + (i + 1) + '.</b> feltétel csoport <b>' + (j + 1) +
						'.</b> feltételénél nincs kiválasztva állapot!');
				}
			} else {
				if(angular.isUndefinedOrNull(subCondition.conditionValue1)) {
					errorList.push('A(z) <b>' + (i + 1) + '.</b> feltétel csoport <b>' + (j + 1) +
						'.</b> feltételénél nincs kiválasztva érték!');
				}
			}
		}

		return errorList;
	}

	/**
	 * Saves the conditions list
	 */
	function save() {
		if(validate()) {
			AutomationDataService.save(vm.mainConditions).$promise.then(function () {
				vm.mainConditions = [];
				loadExistingAutomation();

				$log.debug('Automation saved');
			});
		}
	}

}
