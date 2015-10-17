'use strict';

/**
 * Constant for condition connection types
 */
angular.module('smartHome')
	.constant('CONNECTION_TYPES', [
		{
			value: 'and',
			label: 'és'
		},
		{
			value: 'or',
			label: 'vagy'
		}
	]);
