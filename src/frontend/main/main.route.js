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
            data: {
                roles: ['ROLE_USER']
            },
            views: {
                'menu': {
                    templateUrl: 'views/menu.tpl.html',
                    controller: 'MenuController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                /*@ngInject*/
                'authorize': ['AuthService',
                    function (AuthService) {
                        return AuthService.authorize();
                    }
                ]
            }
        });

}
