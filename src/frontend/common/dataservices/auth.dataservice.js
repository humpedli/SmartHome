'use strict';

angular.module('smartHome')
	.factory('AuthDataService', AuthDataService);

/**
 * This is the Auth resource
 * @param $resource
 * @param ENV
 * @constructor
 */
/*@ngInject*/
function AuthDataService($resource, ENV) {
	return $resource(ENV.apiEndpoint + 'auth', {}, {
		'login': {method: 'POST'},
		'validate': {method: 'GET'},
		'logout': {method: 'DELETE'}
	});
}
