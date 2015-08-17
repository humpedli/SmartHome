'use strict';

angular.module('mobileApp')
    .factory('AuthResource', AuthResource);


/**
 * This is the Auth resource
 * @param $resource
 * @param ENV
 * @constructor
 */
/*@ngInject*/
function AuthResource($resource, ENV) {
    return $resource(ENV.apiEndpoint + 'auth', {}, {
        'login': { method: 'POST' },
        'logout': { method: 'DELETE' }
    });
}