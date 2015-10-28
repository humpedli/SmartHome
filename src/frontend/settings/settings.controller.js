'use strict';

angular.module('smartHome')
	.controller('SettingsController', SettingsController);

/**
 * Controller for settings
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
			general: {
				title: 'Általános',
				template: Utils.getTemplateUrl('SettingsGeneralTab')
			},
			thermalSensors: {
				title: 'Hőmérséklet érzékelők',
				template: Utils.getTemplateUrl('SettingsThermalSensorsTab')
			},
			relays: {
				title: 'Relék',
				template: Utils.getTemplateUrl('SettingsRelaysTab')
			},
			relayAutomation: {
				title: 'Relé automatizáció',
				template: Utils.getTemplateUrl('SettingsRelayAutomationTab')
			}
		};
	}
	init();

}
