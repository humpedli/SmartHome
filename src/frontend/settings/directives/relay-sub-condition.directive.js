'use strict';

angular.module('smartHome')
	.directive('relaySubCondition', relaySubCondition);


/**
 * Directive for relay sub condition
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
		controller: 'RelaySubConditionController',
		controllerAs: 'vm',
		bindToController: true
	};
}
