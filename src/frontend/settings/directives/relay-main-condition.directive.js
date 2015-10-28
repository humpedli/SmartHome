'use strict';

angular.module('smartHome')
	.directive('relayMainCondition', relayMainCondition);


/**
 * Directive for relay main condition
 */
function relayMainCondition() {
	var name = 'relay-main-condition';

	return {
		templateUrl: 'views/' + name + '.tpl.html',
		restrict: 'E',
		scope: {
			ngModel: '=',
			ngChange: '&'
		},
		controller: 'RelayMainConditionController',
		controllerAs: 'vm',
		bindToController: true
	};
}
