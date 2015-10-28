'use strict';

angular
	.module('smartHome')
	.config(MainRouteConfig);


/**
 * Main state (abstract route)
 */
/*@ngInject*/
function MainRouteConfig($stateProvider) {

	var name = 'app';

	$stateProvider
		.state(name, {
			url: '/' + name,
			abstract: true,
			views: {
				'menu': {
					templateUrl: 'views/menu.tpl.html',
					controller: 'MenuController',
					controllerAs: 'vm'
				}
			},
			resolve: {
				/*@ngInject*/
				'authorize': function (AuthService) {
					return AuthService.authorize().$promise;
				}
			}
		});

}
