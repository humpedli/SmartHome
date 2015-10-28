'use strict';

angular
	.module('smartHome')
	.config(WeatherRouteConfig);


/**
 * Weather state config
 */
/*@ngInject*/
function WeatherRouteConfig($stateProvider) {

	var name = 'weather';

	$stateProvider
		.state(name, {
			parent: 'app',
			url: '/' + name,
			views: {
				'content@': {
					templateUrl: 'views/' + name + '.tpl.html',
					controller: 'WeatherController',
					controllerAs: 'vm'
				}
			},
			resolve: {
				/*@ngInject*/
				'weatherData': function (WeatherDataService) {
					return WeatherDataService.query().$promise;
				},
				'settingsData': function (SettingsDataService) {
					return SettingsDataService.query().$promise;
				}
			}
		});

}
