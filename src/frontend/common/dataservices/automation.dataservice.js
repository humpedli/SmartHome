'use strict';

angular.module('smartHome')
	.factory('AutomationDataService', AutomationDataService);

/**
 * This is the resource for relay automation handling
 * @param $resource
 * @param ENV
 * @constructor
 */
/*@ngInject*/
function AutomationDataService($resource, ENV) {
	return $resource(ENV.apiEndpoint + 'automation');
}
