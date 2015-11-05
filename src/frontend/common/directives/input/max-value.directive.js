'use strict';

angular.module('smartHome')
	.directive('maxValue', maxValue);


/**
 * Directive for input max value
 */
function maxValue() {
	return {
		require: '?ngModel',
		restrict: 'A',
		link: function (scope, element, attrs, ngModelCtrl) {
			var maxValue;

			// parse attribute
			function parseAttribute(attribute) {
				if (angular.isUndefinedOrNull(attribute)) {
					maxValue = undefined;
				}
				else {
					maxValue = parseFloat(Number(attribute));
				}
			}
			parseAttribute(attrs.maxValue);

			// validate function
			function validate(val) {
				if (angular.isDefined(maxValue) && angular.isDefined(val)) {
					if (val === '' || isNaN(parseFloat(Number(val)))) {
						return val;
					}
					if (parseFloat(Number(val)) > maxValue) {
						ngModelCtrl.$setViewValue(String(maxValue));
						ngModelCtrl.$render();
						return String(maxValue);
					}
				}
				return val;
			}

			ngModelCtrl.$parsers.push(validate);

			//if max value changes, we refresh the max value and re-validate the input
			scope.$watch(attrs.maxValue, function(val) {
				parseAttribute(val);
				validate(ngModelCtrl.$viewValue);
			});
		}
	};
}
