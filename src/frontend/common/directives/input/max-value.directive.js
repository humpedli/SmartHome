'use strict';

angular.module('smartHome')
	.directive('maxValue', maxValue);


/**
 * Directive for input max value
 * @returns {{templateUrl: string, restrict: string}}
 * @constructor
 */
function maxValue() {
	return {
		require: '?ngModel',
		restrict: 'A',
		link: function (scope, element, attrs, ngModelCtrl) {
			var maxValue = scope.$eval(attrs.maxValue);

			function validate(val) {

				if (val === '') {
					return 0;
				}

				// Check if entered value can be parsed
				if (isNaN(parseFloat(val))) {
					return NaN;
				}

				if (parseFloat(val) > parseFloat(maxValue)) {
					ngModelCtrl.$setViewValue(maxValue);
					ngModelCtrl.$render();
					return maxValue;
				} else {
					return val;
				}
			}

			ngModelCtrl.$parsers.push(validate);

			//if max value changes, we refresh the max value and revalidate the input value
			scope.$watch(attrs.maxValue, function() {
				var maxValue = scope.$eval(attrs.maxValue);
				validate(ngModelCtrl.$viewValue);
			});

			// on focus we refresh the max value
			element.on('focus', function() {
				var attrValue = scope.$eval(attrs.maxValue);

				if(!isNaN(attrValue)) {
					maxValue = attrValue;
				}
			});


		}
	};
}
