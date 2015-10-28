'use strict';

angular
	.module('smartHome')
	.config(SettingsRouteConfig);

/**
 * Settings state config
 */
/*@ngInject*/
function SettingsRouteConfig($stateProvider) {

	var name = 'settings';

	$stateProvider
		.state(name, {
			parent: 'app',
			url: '/' + name,
			views: {
				'content@': {
					templateUrl: 'views/' + name + '.tpl.html',
					controller: 'SettingsController',
					controllerAs: 'vm'
				}
			},
			resolve: {
				/*@ngInject*/
				'sensorsData': function (SensorDataService) {
					return SensorDataService.query().$promise;
				},
				/*@ngInject*/
				'relaysData': function (RelayDataService) {
					return RelayDataService.query().$promise;
				},
				/*@ngInject*/
				'settingsData': function (SettingsDataService) {
					return SettingsDataService.query().$promise;
				}
			}
		});

}
