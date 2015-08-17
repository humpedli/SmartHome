'use strict';


angular.module('mobileApp')
    .factory('AuthServerService', AuthServerService);

/**
 * @desc AuthServerService service - it handles login, logout http requests, and the oauth token
 * @required localStorage module, Base64 service, ENV constant for api endpoint address
 */
/*@ngInject*/
function AuthServerService($q, $log, $http, ENV, Utils) {
    var name = 'AuthServerService';

    var endpoints = {
        login: ENV.apiEndpoint + 'login',
        logout: ENV.apiEndpoint + 'logout'
    };

    return {
        login: login,
        logout: logout
    };

    /**
     * Send a login request
     * @param credentials
     * @returns {*}
     */
    function login(credentials) {
        return $q(function (resolve, reject) {
            $log.debug(name + ': Sending login request');

            var params = {
                timeZone: '',
                loginForRole: 'consultant',
                USERNAME: credentials.username,
                PASSWORD: credentials.password,
                JavaScriptEnabled: 'Y'
            };

            $http.post(endpoints.login, Utils.toQueryString(params), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).success(function (response) {
                return resolve(response);
            }).catch(function () {
                return reject('There was a network error during login!');
            });
        });
    }

    /**
     * Log out the current user
     * @returns {HttpPromise}
     */
    function logout() {
        return $http.post(endpoints.logout);
    }
}
