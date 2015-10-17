'use strict';

angular
	.module('smartHome')
	.config(DashboardRouteConfig);


/**
 * Dashboard state config
 */
/*@ngInject*/
function DashboardRouteConfig($stateProvider) {

	var name = 'dashboard';

	$stateProvider
		.state(name, {
			parent: 'app',
			url: '/' + name,
			views: {
				'content@': {
					templateUrl: 'views/' + name + '.tpl.html',
					controller: 'DashboardController',
					controllerAs: 'vm'
				}
			},
			resolve: {
				/*@ngInject*/
				'sensorsData': function (SensorDataService) {
					return SensorDataService.query();
				},
				/*@ngInject*/
				'relaysData': function (RelayDataService) {
					return RelayDataService.query();
				}
			}
		});

}
