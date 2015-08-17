'use strict';

angular
    .module('smartHome')
    .run(SmartHomeInit);

/**
 * This function runs when the app starts
 */
/*@ngInject*/
function SmartHomeInit($rootScope, $state, $window, Principal, AuthService) {

    // event listener - before state change
    $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;

        // authorize current user
        if (Principal.isIdentityResolved()) {
            AuthService.authorize();
        }
    });

    // event listener - after state changed
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toStateParams, fromState, fromStateParams) {
        $rootScope.previousStateName = fromState.name;
        $rootScope.previousStateParams = fromStateParams;
    });

    // event listener - if a request response with 401, then redirect to logout
    $rootScope.$on('event:auth-loginRequired', function () {
        $state.go('login');
    });

    // go to login page after logout
    $rootScope.$on('event:logout', function () {
        $state.go('login');
    });

    // function to handle app back button states
    $rootScope.back = function () {
        if ($state.get($rootScope.previousStateName) === null || $rootScope.previousStateName === 'logout') {
            $state.go('dashboard');
        } else {
            $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
        }
    };

}
