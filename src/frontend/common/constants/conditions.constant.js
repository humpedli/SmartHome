'use strict';

/**
 * Constant for conditions
 */
angular.module('smartHome')
	.constant('CONDITIONS', [
		{
			sign: '==',
			label: 'egyenlő',
			labelPast: 'egyenlő volt',
			labelFuture: 'egyenlő lesz',
			boolComparable: true
		},
		{
			sign: '!=',
			label: 'nem egyenlő',
			labelPast: 'nem volt egyenlő',
			labelFuture: 'nem lesz egyenlő',
			boolComparable: true
		},
		{
			sign: '>',
			label: 'nagyobb, mint',
			labelPast: 'nagyobb volt, mint',
			labelFuture: 'nagyobb lesz, mint',
			boolComparable: false
		},
		{
			sign: '>=',
			label: 'nagyobb vagy egyenlő, mint',
			labelPast: 'nagyobb vagy egyenlő volt, mint',
			labelFuture: 'nagyobb vagy egyenlő lesz, mint',
			boolComparable: false
		},
		{
			sign: '<',
			label: 'kisebb, mint',
			labelPast: 'kisebb volt, mint',
			labelFuture: 'kisebb lesz, mint',
			boolComparable: false
		},
		{
			sign: '<=',
			label: 'kisebb vagy egyenlő, mint',
			labelPast: 'kisebb vagy egyenlő volt, mint',
			labelFuture: 'kisebb vagy egyenlő lesz, mint',
			boolComparable: false
		}
	]);
