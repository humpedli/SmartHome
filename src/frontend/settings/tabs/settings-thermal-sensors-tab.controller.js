'use strict';

angular.module('smartHome')
	.controller('SettingsThermalSensorsTabController', SettingsThermalSensorsTabController);

/**
 * Controller for settings thermal sensors tab
 */
/*@ngInject*/
function SettingsThermalSensorsTabController($modal, $log, SensorDataService, Utils) {

	// controllerAs with vm
	var vm = this;

	// Wired functions
	vm.getSensorsList = getSensorsList;
	vm.addSensor = addSensor;
	vm.editSensor = editSensor;
	vm.removeSensor = removeSensor;
	vm.moveSensor = moveSensor;

	/**
	 * Constructor, initialize
	 */
	function init() {
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
	 * Opens the new sensor popup and calls backend endpoint
	 */
	function addSensor() {
		var modal = $modal({
			title: 'Új érzékelő hozzáadása',
			templateUrl: Utils.getTemplateUrl('SettingsAddThermalSensorModal')
		});

		// modal ViewModel data
		modal.$scope.vm = {
			formData: {},
			addSensor: function (formData) {
				SensorDataService.save(formData).$promise.then(function () {
					getSensorsList();

					$log.debug('Thermal sensor added: ' + formData.sensorid);
					modal.hide();
				});
			}
		};
	}

	/**
	 * Edits sensor name (called by ng-change)
	 * @param sensor - sensor DTO object
	 */
	function editSensor(sensor) {
		if (angular.isDefined(sensor.name)) {
			sensor.$save();
			$log.debug('Thermal sensor edited: ' + sensor.sensorid);
		}
	}

	/**
	 * Opens the remove sensor popup and calls backend endpoint
	 * @param sensor - sensor DTO object
	 */
	function removeSensor(sensor) {
		var modal = $modal({
			title: 'Érzékelő eltávolítása',
			templateUrl: Utils.getTemplateUrl('SettingsRemoveThermalSensorModal'),
		});

		// modal ViewModel data
		modal.$scope.vm = {
			sensor: sensor,
			removeSensor: function () {
				sensor.$remove().then(function () {
					var sensorIndex = vm.sensors.indexOf(sensor);
					vm.sensors.splice(sensorIndex, 1);

					$log.debug('Thermal sensor deleted: ' + sensor.sensorid);
					modal.hide();
				});
			}
		};
	}

	/**
	 * Moves sensor position in the list and calls backend endpoint
	 * @param sensor - sensor DTO object
	 * @param direction - up/down position change
	 */
	function moveSensor(sensor, direction) {
		// declare variables
		var currentSensor = sensor;
		var currentSensorIndex = vm.sensors.indexOf(sensor);
		var tempSensor = angular.copy(currentSensor); // copy without binding
		var otherSensor; // initial value: undefined

		// determine other sensor based on direction
		if (currentSensorIndex > 0 && direction === 'up') {
			otherSensor = vm.sensors[currentSensorIndex - 1];
		} else if (currentSensorIndex < vm.sensors.length && direction === 'down') {
			otherSensor = vm.sensors[currentSensorIndex + 1];
		}

		// this block only runs if there are switchable sensor positions
		if (angular.isDefined(otherSensor)) {
			// determine other sensor index
			var otherSensorIndex = vm.sensors.indexOf(otherSensor);

			// switch position between the two sensor
			currentSensor.position = otherSensor.position;
			otherSensor.position = tempSensor.position;

			// switch the two sensors in the array (this will fix index problem)
			vm.sensors[currentSensorIndex] = otherSensor;
			vm.sensors[otherSensorIndex] = currentSensor;

			// backend save
			currentSensor.$save();
			otherSensor.$save();

			$log.debug('Thermal sensor position changed: ' + sensor.sensorid);
		}
	}

}
