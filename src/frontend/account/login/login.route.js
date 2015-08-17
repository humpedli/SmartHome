'use strict';

angular
	.module('smartHome')
	.config(LoginRouteConfig);

/**
 * Login state
 */
/*@ngInject*/
function LoginRouteConfig($stateProvider) {

	var name = 'login';

	$stateProvider
		.state(name, {
			url: '/' + name,
			views: {
				'content@': {
					templateUrl: 'views/' + name + '.tpl.html',
					controller: 'LoginController',
					controllerAs: 'vm'
				}
			}
		});

}
