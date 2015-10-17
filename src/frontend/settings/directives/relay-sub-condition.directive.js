'use strict';

angular.module('smartHome')
	.directive('relaySubCondition', relaySubCondition);


/**
 * Directive for relay sub condition
 * @returns {*}
 * @constructor
 */
function relaySubCondition() {
	var name = 'relay-sub-condition';

	return {
		templateUrl: 'views/' + name + '.tpl.html',
		restrict: 'E',
		scope: {
			ngModel: '=',
			ngChange: '&'
		},
		controller: 'RelaySubCondition',
		controllerAs: 'vm',
		bindToController: true
	};
}
