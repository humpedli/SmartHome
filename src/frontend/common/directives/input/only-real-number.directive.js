'use strict';

angular.module('smartHome')
	.directive('onlyRealNumber', onlyRealNumber);


/**
 * Directive which allows only real number entered in input field
 */
function onlyRealNumber() {
	return {
		require: '?ngModel',
		restrict: 'A',
		link: function(scope, element, attrs, ngModelCtrl) {
			var resetToZero;

			// parse attribute
			function parseAttribute(attribute) {
				if (angular.isUndefinedOrNull(attribute)) {
					resetToZero = undefined;
				}
				else {
					resetToZero = Boolean(attribute);
				}
			}
			parseAttribute(attrs.resetToZero);

			// validate function
			function validate(val) {
				if (angular.isDefined(val)) {
					var numString = String(val).replace(/[^0-9.\-]*/g, ''); // only accept 0-9 and . and -
					numString = numString.replace(/^\./g, ''); // cannot be started with .
					numString = numString.replace(/\.(.*?)\./g, '\.$1'); // more points are not allowed
					numString = numString.replace(/\-(.*?)\-/g, '\-$1'); // more minus are not allowed

					// more than 2 decimals are not allowed
					var splitNum = numString.split('.');
					if(splitNum.length > 1) {
						numString = splitNum[0] + '.' + splitNum[1].substr(0, 2);
					}

					// remove minus sign, if it is not at string start
					var indexOfMinus = numString.indexOf('-');
					if(indexOfMinus > 0) {
						numString = numString.slice(0, indexOfMinus) + numString.slice(indexOfMinus + 1);
					}

					if (String(val) !== numString) {
						ngModelCtrl.$setViewValue(numString);
						ngModelCtrl.$render();
						return numString;
					}
				}
				return val;
			}

			ngModelCtrl.$parsers.push(validate);

			// ignore if user hits space
			element.bind('keypress', function(event) {
				if(event.keyCode === 32) {
					event.preventDefault();
				}
			});

			// if user leaves the input empty, then reset it to zero
			element.on('blur', function () {
				if (resetToZero && element.val() === '') {
					ngModelCtrl.$setViewValue('0');
					ngModelCtrl.$render();
				}

				// remove . if there is no decimal after that
				var elem = element.val();
				if(elem.substr(elem.length - 1) === '.') {
					ngModelCtrl.$setViewValue(elem.substr(0, (elem.length - 1)));
					ngModelCtrl.$render();
				}
			});

			//if reset-to-zero changes, we refresh the resetToZero value
			scope.$watch(attrs.resetToZero, function(val) {
				parseAttribute(val);
			});

		}
	};
}
