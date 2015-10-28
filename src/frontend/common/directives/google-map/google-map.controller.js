'use strict';

angular.module('smartHome')
	.controller('GoogleMapController', GoogleMapController);

/**
 * Controller for google map directive
 */
/*@ngInject*/
function GoogleMapController($scope) {

	// controllerAs with vm
	var vm = this;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.url = null;
	}
	init();

	/**
	 * Get static google maps url
	 */
	function getGoogleMapsUrl() {
		var latitude = vm.ngModel.CITY_LATITUDE;
		var longitude = vm.ngModel.CITY_LONGITUDE;
		var size = vm.width + 'x' + vm.height;
		var zoom = vm.zoom;

		if(!angular.isUndefinedOrNull(latitude) && !angular.isUndefinedOrNull(longitude)) {
			vm.url = 'https://maps.googleapis.com/maps/api/staticmap' +
				'?center=' + latitude + ',' + longitude +
				'&zoom=' + zoom +
				'&size=' + size +
				'&scale=2' +
				'&maptype=roadmap' +
				'&markers=color:0x337ab7|' + latitude + ',' + longitude +
				'&style=feature:administrative.province|element:all|visibility:off' +
				'&style=feature:landscape|element:all|visibility:on|color:0xf4f6f7' +
				'&style=feature:poi|element:all|saturation:-100|lightness:51|visibility:off|color:0xdee2e4' +
				'&style=feature:poi.business|element:labels.icon|visibility:off' +
				'&style=feature:road|element:labels|visibility:off' +
				'&style=feature:road.highway|element:all|saturation:-100|visibility:simplified' +
				'&style=feature:road.highway|element:labels|visibility:off' +
				'&style=feature:road.arterial|element:all|saturation:-100|lightness:30|visibility:on' +
				'&style=feature:road.local|element:all|saturation:-100|lightness:40|visibility:on' +
				'&style=feature:transit|element:all|saturation:-100|visibility:simplified' +
				'&style=feature:transit|element:labels|visibility:off' +
				'&style=feature:water|element:geometry|lightness:-25|saturation:-97|color:0xa4afb6' +
				'&style=feature:water|element:labels|visibility:on|lightness:-25|saturation:-100';
		} else {
			vm.url = null;
		}
	}

	$scope.$watch('vm.ngModel.CITY_LATITUDE', function(newVal, oldVal) {
		if(!angular.isUndefinedOrNull(newVal)) {
			getGoogleMapsUrl();
		}
	}, true);

}
