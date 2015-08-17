'use strict';

angular
	.module('smartHome')
	.config(LogoutRouteConfig);

/**
 * Logout state
 */
/*@ngInject*/
function LogoutRouteConfig($stateProvider) {

	var name = 'logout';

	$stateProvider
		.state(name, {
			url: '/' + name,
			resolve: {
				/*@ngInject*/
				'logout': function (AuthService) {
					AuthService.logout();
				}
			}
		});
}
