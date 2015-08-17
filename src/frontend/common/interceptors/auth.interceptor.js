'use strict';

angular.module('smartHome')
	.factory('AuthInterceptor', AuthInterceptor);

/**
 * Interceptor for authentication
 * @param $rootScope
 * @param $q
 * @constructor
 */
/*@ngInject*/
function AuthInterceptor($rootScope, $q) {

	return {
		response: function (response) {
			if (response.status === 401) {
				$rootScope.$broadcast('Auth:loginRequired');
			}

			return response || $q.when(response);
		},
		responseError: function (response) {
			if (response.status === 401) {
				$rootScope.$broadcast('Auth:loginRequired');
			}

			return $q.reject(response);
		}
	};

}
