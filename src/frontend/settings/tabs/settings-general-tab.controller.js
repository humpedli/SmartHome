'use strict';

angular.module('smartHome')
	.controller('SettingsGeneralTabController', SettingsGeneralTabController);

/**
 * Controller for settings general tab
 */
/*@ngInject*/
function SettingsGeneralTabController($modal, $log, SettingsDataService, GoogleDataService, Utils) {

	// controllerAs with vm
	var vm = this;

	// Wired functions
	vm.clearCoordinates = clearCoordinates;
	vm.validateAddress = validateAddress;
	vm.getGoogleMapsUrl = getGoogleMapsUrl;

	/**
	 * Constructor, initialize
	 */
	function init() {
		getSettings();
	}
	init();

	/**
	 * Gets all relay data from backend
	 */
	function getSettings() {
		SettingsDataService.query(function(data) {
			vm.settings = data;
			$log.debug('Settings loaded');
		});
	}

	/**
	 * Validates address
	 */
	function clearCoordinates() {
		vm.settings.CITY_LATITUDE = null;
		vm.settings.CITY_LONGITUDE = null;
	}

	/**
	 * Get static google maps url
	 */
	function getGoogleMapsUrl(latitude, longitude) {
		if(!angular.isUndefinedOrNull(latitude) && !angular.isUndefinedOrNull(longitude)) {
			return 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude +
				'&zoom=9&size=640x300&scale=2&maptype=roadmap&markers=color:red%7C' + latitude + ',' + longitude;
		}

		return null;
	}

	/**
	 * Validates address
	 */
	function validateAddress() {
		clearCoordinates();

		GoogleDataService.getCoordinatesByAddress(vm.settings.CITY_NAME)
			.then(function (data) {
				if(!angular.isUndefinedOrNull(data) &&
					!angular.isUndefinedOrNull(data[0]) &&
					!angular.isUndefinedOrNull(data[0].geometry) &&
					!angular.isUndefinedOrNull(data[0].geometry.location)) {
						vm.settings.CITY_LATITUDE = data[0].geometry.location.lat;
						vm.settings.CITY_LONGITUDE = data[0].geometry.location.lng;

						$log.debug('Address validated');
				}
			})
			.catch(function (error) {
				$modal({
					title: 'Hiba!',
					content: 'Érvénytelen városnév!',
					templateUrl: Utils.getTemplateUrl('ModalWithoutFooter')
				});

				$log.error('Address invalid: ' + error);
			});
	}

}
