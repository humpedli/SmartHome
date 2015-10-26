'use strict';

angular.module('smartHome')
	.directive('minValue', minValue);


/**
 * Directive for input min value
 * @returns {{templateUrl: string, restrict: string}}
 * @constructor
 */
function minValue() {
	return {
		require: '?ngModel',
		restrict: 'A',
		link: function (scope, element, attrs, ngModelCtrl) {
			var minValue = scope.$eval(attrs.minValue);

			function validate(val) {

				if (val === '') {
					return 0;
				}

				// Check if entered value can be parsed
				if (isNaN(parseFloat(val))) {
					return NaN;
				}

				if (parseFloat(val) < parseFloat(minValue)) {
					ngModelCtrl.$setViewValue(minValue);
					ngModelCtrl.$render();
					return minValue;
				} else {
					return val;
				}
			}

			ngModelCtrl.$parsers.push(validate);

			//if min value changes, we refresh the min value and revalidate the input value
			scope.$watch(attrs.minValue, function() {
				minValue = scope.$eval(attrs.minValue);
				validate(ngModelCtrl.$viewValue);
			});

			// on focus we refresh the min value
			element.on('focus', function() {
				var attrValue = scope.$eval(attrs.minValue);

				if(!isNaN(attrValue)) {
					minValue = attrValue;
				}
			});


		}
	};
}
