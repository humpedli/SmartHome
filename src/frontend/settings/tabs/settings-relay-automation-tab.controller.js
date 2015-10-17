'use strict';

angular.module('smartHome')
	.controller('SettingsRelayAutomationTabController', SettingsRelayAutomationTabController);

/**
 * Controller for settings relay automation tab
 */
/*@ngInject*/
function SettingsRelayAutomationTabController($modal, $log, AutomationDataService, Utils) {

	// controllerAs with vm
	var vm = this;

	// Wired functions
	vm.addMainCondition = addMainCondition;
	vm.removeMainCondition = removeMainCondition;
	vm.isRelayNotSelectedYet = isRelayNotSelectedYet;
	vm.refreshSelectedRelayList = refreshSelectedRelayList;
	vm.save = save;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.mainConditions = [];
		vm.selectedRelays = []; // NOT USED YET!

		loadExistingAutomation();
	}
	init();

	function loadExistingAutomation() {
		// ToDo: need to implement if backend is ready, now we are showing an empty condition DTO on the page
		addMainCondition();
		$log.debug('Automation loaded');
	}

	/**
	 * Adds an extra empty mainCondition to the mainConditions list
	 */
	function addMainCondition() {
		var mainConditionDTO = {
			relay: null,
			operation: null,
			subConditions: []
		};

		vm.mainConditions.push({
			template: '<relay-main-condition ng-model="mainCondition.dto"></relay-main-condition>',
			dto: mainConditionDTO
		});
	}

	/**
	 * Removes a mainCondition with the specified index
	 */
	function removeMainCondition(index) {
		vm.mainConditions.splice(index, 1);
	}

	/**
	 * NOT USED YET!
	 * Determines if relay is already added or not
	 * @param relay - relay DTO object
	 */
	function isRelayNotSelectedYet(relay) {
		if(angular.isDefined(relay)) {
			return (vm.selectedRelays.indexOf(relay.relayid) === -1);
		}

		return true;
	}

	/**
	 * NOT USED YET!
	 * Refreshes already selected relay list
	 * @param relay - relay DTO object
	 */
	function refreshSelectedRelayList(relay) {
		if(angular.isDefined(relay)) {
			if (isRelayNotSelectedYet(relay)) {
				vm.selectedRelays.push(relay.relayid);
			} else {
				vm.selectedRelays.splice(vm.selectedRelays.indexOf(relay.relayid), 1);
			}
		}
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

		if(angular.isUndefinedOrNull(subCondition.connectedWithPrevious)) {
			errorList.push('A(z) <b>' + (i + 1) + '.</b> feltétel csoport <b>' + (j + 1) +
				'.</b> feltételénél nincs kiválasztva kapcsolódás!');
		}
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
				// ToDo: reload automation list
				// loadExistingAutomation();

				$log.debug('Automation saved');
			});
		}
	}

}
