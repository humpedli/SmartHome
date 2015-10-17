'use strict';

/**
 * Constant for relay operations
 */
angular.module('smartHome')
	.constant('OPERATIONS', [
		{
			operation: 'on',
			label: 'kapcsoljon be',
			label2: 'be van kapcsolva'
		},
		{
			operation: 'on',
			label: 'kapcsoljon ki',
			label2: 'ki van kapcsolva'
		}
	]);
