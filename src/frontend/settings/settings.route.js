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
			}
		});

}
