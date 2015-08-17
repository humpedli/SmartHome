'use strict';

angular
	.module('smartHome')
	.directive('loader', Loader);

/**
 * Directive for loader
 */
/*@ngInject*/
function Loader($timeout) {

	var name = 'loader';

	return {
		templateUrl: 'views/' + name + '.tpl.html',
		restrict: 'E',
		link: function (scope, element) {
			var delay = 200;
			var timer = null;

			scope.$on('loader:Show', function() {
				showLoading();
			});
			scope.$on('loader:Hide', function() {
				hideLoading();
			});

			/* Code snippet from StackOverFlow
			 * http://stackoverflow.com/questions/27842299/can-ng-show-directive-be-used-with-a-delay
			 * */

			var showLoading = function () {
				//If showing is already in progress just wait
				if (timer) {
					return;
				}

				timer = $timeout(displayElement.bind(this, true), delay);
			};

			var hideLoading = function () {
				// If the timer is in progress we need to cancel it to ensure everything stays in sync
				if (timer) {
					$timeout.cancel(timer);
				}

				timer = null;

				displayElement(false);
			};

			var displayElement = function (display) {
				if(display) {
					element.css({'display': ''});
				} else {
					element.css({'display': 'none'});
				}
			};

			/*
			 * ---------
			 * */
		}
	};

}
