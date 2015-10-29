'use strict';

angular.module('smartHome')
	.controller('SettingsGeneralTabController', SettingsGeneralTabController);

/**
 * Controller for settings general tab
 */
/*@ngInject*/
function SettingsGeneralTabController($scope, $modal, $log, SettingsDataService, GoogleDataService, Utils) {

	// controllerAs with vm
	var vm = this;

	// Wired functions
	vm.clearCoordinates = clearCoordinates;
	vm.validateAddress = validateAddress;
	vm.save = save;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.settings = $scope.$parent.vm.settings;
	}
	init();

	/**
	 * Gets all relay data from backend
	 */
	function refreshSettings() {
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
					templateUrl: Utils.getTemplateUrl('ModalWithFooter')
				});

				$log.error('Address invalid: ' + error);
			});
	}

	/**
	 * Saves settings data on backend
	 */
	function save() {
		if(!angular.isUndefinedOrNull(vm.settings)) {
			SettingsDataService.save(vm.settings).$promise.then(function () {
				refreshSettings();
				$log.debug('Settings saved');

				$modal({
					title: 'Sikeres mentés',
					content: 'Sikeresen elmentettük a módosításokat!',
					templateUrl: Utils.getTemplateUrl('ModalWithFooter')
				});
			}).catch(function () {
				$modal({
					title: 'Hiba',
					content: 'Hiba történt a módosítások mentése közben!',
					templateUrl: Utils.getTemplateUrl('ModalWithFooter')
				});
			});
		}
	}

}
