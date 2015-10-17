'use strict';

angular.module('smartHome')
	.factory('RelayDataService', RelayDataService);

/**
 * This is the resource for relay handling
 * @param $resource
 * @param ENV
 * @constructor
 */
/*@ngInject*/
function RelayDataService($resource, ENV) {
	return $resource(ENV.apiEndpoint + 'relays/:relayid', {relayid: '@relayid'});
}
