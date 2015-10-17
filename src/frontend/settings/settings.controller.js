'use strict';

angular.module('smartHome')
	.controller('SettingsController', SettingsController);

/**
 * Controller for settings
 * @param Utils
 */
/*@ngInject*/
function SettingsController(Utils) {

	// controllerAs with vm
	var vm = this;

	/**
	 * Constructor, initialize
	 */
	function init() {
		// tabs DTO object
		vm.settingsTabs = {
			thermalSensors: {
				title: 'Hőmérséklet érzékelők',
				template: Utils.getTemplateUrl('SettingsThermalSensorsTab')
			},
			relayAutomation: {
				title: 'Relé automatizáció',
				template: Utils.getTemplateUrl('SettingsRelayAutomationTab')
			}
		};
	}
	init();

}
