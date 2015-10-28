'use strict';

angular.module('smartHome')
	.factory('WeatherDataService', WeatherDataService);

/**
 * This is the resource for weather handling
 * @param $resource
 * @param ENV
 * @constructor
 */
/*@ngInject*/
function WeatherDataService($resource, ENV) {
	return $resource(ENV.apiEndpoint + 'weather/:timeid', {timeid: '@timeid'}, { query: { isArray: false } });
}
