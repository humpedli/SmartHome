'use strict';

angular.module('mobileApp')
    .factory('AuthService', AuthService);

/**
 * Auth service - it handles login, logout and authorize functions,
 * this is the connection between Principal and AuthServerProvider
 * @param $rootScope
 * @param $q
 * @param $log
 * @param Principal
 * @param AuthServerService
 */
/*@ngInject*/
function AuthService($rootScope, $q, $log, Principal, AuthServerService) {
    var name = 'AuthService';

    /**
     * Login a user with credentials
     * @param credentials
     * @returns {*}
     */
    function login(credentials) {
        return $q(function (resolve, reject) {
            $log.debug(name + ': Logging in with credentials...');
            AuthServerService.login(credentials).then(function (data) {
                //If the login was successful
                if (data._LOGIN_PASSED_ !== undefined) {
                    $log.debug(name + ': Login was successful.');
                    return resolve(authorize());
                }

                //If there was an error
                else {
                    $log.error(data._ERROR_MESSAGE_);
                    return reject(data._ERROR_MESSAGE_);
                }
            }).catch(function (error) {
                $log.error(name + ': ' + error);
                return reject(error);
            });
        });
    }

    function logout() {
        $log.debug(name + ': Logging out...');
        AuthServerService.logout().then(function () {
            $log.debug(name + ': Logged out!');
            Principal.authenticate(null);
            $rootScope.$broadcast('event:logout');
        });
    }

    function authorize() {
        return Principal.getIdentity();
    }

    return {
        login: login,
        logout: logout,
        authorize: authorize
    };
}
