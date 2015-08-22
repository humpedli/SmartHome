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
function SettingsController($modal, $window, $log, SensorDataService, Utils) {

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
	};

	vm.addSensor = function() {
		$modal({
			title: 'Új érzékelő hozzáadása',
			contentTemplate: Utils.getTemplateUrl('SettingsAddThermalSensorModal')
		});

		/*vm.sensors.push({
			sensorid: '',
			name: '',
			position: (vm.sensors.length + 1),
			lastvalue: 0,
			lasttime: $window.moment().format('YYYY-DD-MM HH:mm:ss')
		});*/
	};

	vm.moveSensor = function(index, direction) {
		console.log(index);
		if(index > 0 && direction === 'up') {
			var currentSensor = vm.sensors[index];
			var otherSensor = vm.sensors[(index - 1)];

			currentSensor.position = otherSensor.position;
			otherSensor.position = currentSensor.position;

			currentSensor.$save();
			otherSensor.$save();

			vm.getSensors();
		}

		if(index < vm.sensors.length && direction === 'down') {

		}
	};

	vm.deleteSensor = function(index) {
		vm.sensors.splice(index, 1);
		$log.debug('Thermal sensor deleted: ' + index);
	};

	vm.getSensors();

}
