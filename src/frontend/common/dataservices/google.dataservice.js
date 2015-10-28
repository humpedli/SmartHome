'use strict';

angular.module('smartHome')
	.factory('GoogleDataService', GoogleDataService);

/**
 * This is the Google dataservice
 * @param $resource
 * @param ENV
 * @constructor
 */
/*@ngInject*/
function GoogleDataService($q, $http) {
	var endpoints = {
		locationHelper: 'http://maps.googleapis.com/maps/api/geocode/json'
	};

	/*
	 Public functions
	 */
	return {
		getCoordinatesByAddress: getCoordinatesByAddress
	};

	/**
	 * Get coordinates by address
	 * @param address
	 * @returns {*}
	 */
	function getCoordinatesByAddress(address) {
		return $q(function (resolve, reject) {
			$http.get(endpoints.locationHelper, {
				params: {
					address: address
				}
			})
				.success(function (data) {
					if(data.results.length > 0) {
						resolve(data.results);
					} else {
						reject(data.status);
					}
				})
				.error(function (error) {
					reject(error);
				});
		});
	}
}
