'use strict';

angular
	.module('smartHome')
	.directive('onlyRealNumber', onlyRealNumber);

/**
 * Directive which allows only real number entered in input field
 */
/*@ngInject*/
function onlyRealNumber() {
	return {
		require: '?ngModel',
		restrict: 'A',
		link: function(scope, element, attrs, ngModelCtrl) {

			/* Code snippet from GitHub
			 * https://github.com/nitishkumarsingh13/Angularjs-Directive-Accept-Number-Only
			 * */
			scope.$watch(attrs.ngModel, function(newValue, oldValue) {

				var splitArray = String(newValue).split('');

				if(splitArray[0] === '-') {
					newValue = String(newValue).replace('-', '');
					ngModelCtrl.$setViewValue(newValue);
					ngModelCtrl.$render();
				}

				if(splitArray[0] === '.') {
					newValue = String(newValue).replace('.', '');
					ngModelCtrl.$setViewValue(newValue);
					ngModelCtrl.$render();
				}

				var n = String(newValue).split('.');
				if(n[1]) {
					var n2 = n[1].slice(0, 2);
					newValue = [n[0], n2].join('.');
					ngModelCtrl.$setViewValue(newValue);
					ngModelCtrl.$render();
				}


				if (splitArray.length === 0) {
					return;
				}
				if (splitArray.length === 1 && (splitArray[0] === '-' || splitArray[0] === '.' )) {
					return;
				}
				if (splitArray.length === 2 && newValue === '-.') {
					return;
				}

				/*Check it is number or not.*/
				if (isNaN(newValue)) {
					ngModelCtrl.$setViewValue(oldValue);
					ngModelCtrl.$render();
				}
			});

		}
	};
}
