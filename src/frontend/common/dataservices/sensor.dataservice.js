'use strict';

angular.module('smartHome')
	.factory('SensorDataService', SensorDataService);

/**
 * This is the resource for sensor handling
 * @param $resource
 * @param ENV
 * @constructor
 */
/*@ngInject*/
function SensorDataService($resource, ENV) {
	return $resource(ENV.apiEndpoint + 'sensors', {}, {
		'get': {method: 'GET'},
		'query': {method: 'GET', isArray: true}
	});
}
