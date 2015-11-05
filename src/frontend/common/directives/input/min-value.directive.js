'use strict';

angular.module('smartHome')
	.directive('minValue', minValue);


/**
 * Directive for input min value
 */
function minValue() {
	return {
		require: '?ngModel',
		restrict: 'A',
		link: function (scope, element, attrs, ngModelCtrl) {
			var minValue;

			// parse attribute
			function parseAttribute(attribute) {
				if (angular.isUndefinedOrNull(attribute)) {
					minValue = undefined;
				}
				else {
					minValue = parseFloat(Number(attribute));
				}
			}
			parseAttribute(attrs.minValue);

			// validate function
			function validate(val) {
				if (angular.isDefined(minValue) && angular.isDefined(val)) {
					if (val === '' || isNaN(parseFloat(Number(val)))) {
						return val;
					}
					if (parseFloat(Number(val)) < minValue) {
						ngModelCtrl.$setViewValue(String(minValue));
						ngModelCtrl.$render();
						return String(minValue);
					}
				}
				return val;
			}

			ngModelCtrl.$parsers.push(validate);

			//if min value changes, we refresh the min value and re-validate the input
			scope.$watch(attrs.minValue, function(val) {
				parseAttribute(val);
				validate(ngModelCtrl.$viewValue);
			});
		}
	};
}
