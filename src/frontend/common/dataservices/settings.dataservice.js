'use strict';

angular.module('smartHome')
	.factory('SettingsDataService', SettingsDataService);

/**
 * This is the resource for settings handling
 * @param $resource
 * @param ENV
 * @constructor
 */
/*@ngInject*/
function SettingsDataService($resource, ENV) {
	return $resource(ENV.apiEndpoint + 'settings/:settingid', {settingid: '@settingid'}, { query: { isArray: false } });
}
