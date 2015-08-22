'use strict';

angular.module('smartHome')
	.controller('SettingsController', SettingsController);

/**
 * Controller for settings
 * @param $modal
 * @param $window
 * @param SensorDataService
 * @param Utils
 */
/*@ngInject*/
function SettingsController($modal, $window, $log, $q, $scope, SensorDataService, Utils) {

	// controllerAs with vm
	var vm = this;

	vm.settingsTabs = {
		thermalSensors: {
			title: 'Hőmérséklet érzékelők',
			template: Utils.getTemplateUrl('SettingsThermalSensorsTab')
		}
	};

	vm.getSensors = function() {
		vm.sensors = SensorDataService.query();
		$log.debug('Thermal sensor list loaded');
	};

	vm.addSensor = function() {
		var modal = $modal({
			title: 'Új érzékelő hozzáadása',
			contentTemplate: Utils.getTemplateUrl('SettingsAddThermalSensorModal')
		});

		modal.$scope.vm = {
			formData: {},
			addSensor: function(formData) {
				SensorDataService.save(formData).$promise.then(function() {
					vm.getSensors();

					$log.debug('Thermal sensor added: ' + formData.sensorid);
					modal.hide();
				});
			}
		};
	};

	vm.moveSensor = function(sensor, direction) {
		// declare variables
		var currentSensor = sensor;
		var currentSensorIndex = vm.sensors.indexOf(sensor);
		var tempSensor = angular.copy(currentSensor); // copy without binding
		var otherSensor; // initial value: undefined

		// determine other sensor based on direction
		if(currentSensorIndex > 0 && direction === 'up') {
			otherSensor = vm.sensors[currentSensorIndex - 1];
		} else if(currentSensorIndex < vm.sensors.length && direction === 'down') {
			otherSensor = vm.sensors[currentSensorIndex + 1];
		}

		// this block only runs if there are switchable sensor positions
		if(angular.isDefined(otherSensor)) {
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
	};

	vm.editSensor = function(sensor) {
		if(angular.isDefined(sensor.name)) {
			sensor.$save();
			$log.debug('Thermal sensor edited: ' + sensor.sensorid);
		}
	};

	vm.removeSensor = function(sensor) {
		var modal = $modal({
			title: 'Érzékelő eltávolítása',
			contentTemplate: Utils.getTemplateUrl('SettingsRemoveThermalSensorModal'),
		});

		modal.$scope.vm = {
			sensor: sensor,
			removeSensor: function() {
				sensor.$remove().then(function() {
					var sensorIndex = vm.sensors.indexOf(sensor);
					vm.sensors.splice(sensorIndex, 1);

					$log.debug('Thermal sensor deleted: ' + sensor.sensorid);
					modal.hide();
				});
			}
		};
	};

	vm.getSensors();

}
