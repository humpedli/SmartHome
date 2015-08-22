'use strict';

angular.module('smartHome')
	.controller('SettingsController', SettingsController);

/**
 * Controller for settings
 * @param $window
 * @param SensorDataService
 * @param Utils
 */
/*@ngInject*/
function SettingsController($window, SensorDataService, Utils) {

	// controllerAs with vm
	var vm = this;

	vm.sensors = SensorDataService.query();

	vm.settingsTabs = {
		thermalSensors: {
			title: 'Hőmérséklet érzékelők',
			template: Utils.getTemplateUrl('SettingsThermalSensorsTab')
		}
	};

	vm.addSensor = function() {
		vm.sensors.push({
			sensorid: '',
			name: '',
			position: (vm.sensors.length + 1),
			lastvalue: 0,
			lasttime: $window.moment().format('YYYY-DD-MM HH:mm:ss')
		});
	};

	vm.moveSensor = function(index, direction) {
		console.log(index);
		if(index > 0 && direction === 'up') {
			var tempPosition = vm.sensors[index].position;

			vm.sensors[index].position = tempPosition - 1;
			vm.sensors[(index - 1)].position = tempPosition;
		}

		if(index < vm.sensors.length && direction === 'down') {

		}
	};

	vm.deleteSensor = function(index) {
		vm.sensors.splice(index, 1);
	};

}
