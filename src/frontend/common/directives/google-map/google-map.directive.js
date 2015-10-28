'use strict';

angular.module('smartHome')
	.directive('googleMap', googleMap);


/**
 * Directive for google map
 */
function googleMap() {
	var name = 'google-map';

	return {
		templateUrl: 'views/' + name + '.tpl.html',
		restrict: 'E',
		scope: {
			ngModel: '=',
			width: '@',
			height: '@',
			zoom: '@'
		},
		controller: 'GoogleMapController',
		controllerAs: 'vm',
		bindToController: true
	};
}
