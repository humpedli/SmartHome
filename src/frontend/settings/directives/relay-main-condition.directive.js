'use strict';

angular.module('smartHome')
	.directive('relayMainCondition', relayMainCondition);


/**
 * Directive for relay main condition
 * @returns {*}
 * @constructor
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
		controller: 'RelayMainCondition',
		controllerAs: 'vm',
		bindToController: true
	};
}
