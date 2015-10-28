'use strict';

angular
	.module('smartHome')
	.filter('tempColorFilter', tempColorFilter);


/**
 * Temp color filter (chroma)
 */
/*@ngInject*/
function tempColorFilter($window) {
	return function (temp) {
		// Generate color scale
		// http://gka.github.io/palettes/#colors=darkblue,blue,green,gold,red,firebrick|steps=60|bez=0|coL=0
		var chroma = $window.chroma.scale(['darkblue', 'blue', 'green', 'gold', 'red', 'firebrick']).domain([-20,40]);

		if(angular.isDefined(temp)) {
			return chroma(temp).hex();
		}

		// Default is black
		return '#000000';
	};

}
