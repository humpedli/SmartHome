'use strict';

/**
 * Constant for conditions
 */
angular.module('smartHome')
	.constant('CONDITIONS', [
		{
			sign: '==',
			label: 'egyenlő',
			boolComparable: true
		},
		{
			sign: '!=',
			label: 'nem egyenlő',
			boolComparable: true
		},
		{
			sign: '>',
			label: 'nagyobb, mint',
			boolComparable: false
		},
		{
			sign: '>=',
			label: 'nagyobb vagy egyenlő, mint',
			boolComparable: false
		},
		{
			sign: '<',
			label: 'kisebb, mint',
			boolComparable: false
		},
		{
			sign: '<=',
			label: 'kisebb vagy egyenlő, mint',
			boolComparable: false
		}
	]);
