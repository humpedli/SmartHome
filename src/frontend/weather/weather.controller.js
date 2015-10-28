'use strict';

angular.module('smartHome')
	.controller('WeatherController', WeatherController);

/**
 * Controller for weather
 */
/*@ngInject*/
function WeatherController($log, weatherData, settingsData, WeatherDataService) {

	// controllerAs with vm
	var vm = this;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.weather = weatherData;
		vm.settings = settingsData;
	}
	init();

	/**
	 * Refreshes all weather data from backend
	 */
	function refreshWeather() {
		WeatherDataService.query(function(data) {
			vm.weather = data;
			$log.debug('Weather loaded');
		});
	}

}
