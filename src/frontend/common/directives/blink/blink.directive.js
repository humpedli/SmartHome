'use strict';

angular
	.module('smartHome')
	.directive('blink', blink);

/**
 * Directive blinks the content
 */
/*@ngInject*/
function blink($timeout) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {},
		link: function(scope, element, attrs) {
			var delay = angular.isDefined(attrs.delay) ? Number(attrs.delay) : 500;

			function showElement() {
				element.css('visibility', 'visible');
				$timeout(hideElement, delay);
			}

			function hideElement() {
				element.css('visibility', 'hidden');
				$timeout(showElement, delay);
			}
			showElement();
		},
		template: '<span ng-transclude></span>',
		replace: true
	};
}
