'use strict';

angular.module('smartHome')
	.service('Principal', Principal);

/**
 * Principal service to handle authenticated state and roles
 * @param $rootScope
 * @param $q
 * @param $log
 * @param AuthDataService
 */
/*@ngInject*/
function Principal($rootScope, $q, $log, AuthDataService) {

	var name = 'Principal';
	var _this = this;

	this.identity = undefined;
	this.authenticated = false;

	/**
	 * Check if the identity is resolved.
	 */
	this.isIdentityResolved = function () {
		return this.identity !== undefined;
	};

	/**
	 * Check if the user is authenticated
	 */
	this.isAuthenticated = function () {
		return this.authenticated;
	};

	/**
	 * Authenticate the user
	 * @param identity
	 */
	this.authenticate = function (identity) {
		if (identity === null) {
			return this.invalidate();
		}

		$log.debug(name + ': Authenticated!');

		this.identity = identity;
		this.authenticated = $rootScope.authenticated = true;
	};

	/**
	 * Invalidate authentication
	 */
	this.invalidate = function () {
		$log.debug(name + ': Authentication invalidated!');

		this.identity = undefined;
		this.authenticated = false;
	};

	/**
	 * Get the identity
	 */
	this.getIdentity = function () {
		return $q(function (resolve, reject) {
			// check and see if we have retrieved the identity data from the server.
			// if we have, reuse it by immediately resolving
			if (_this.isIdentityResolved()) {
				return resolve(_this.identity);
			}

			// otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
			AuthDataService.validate().$promise
				.then(function (identity) {
					_this.authenticate(identity);
					return resolve(_this.identity);
				})
				.catch(function (error) {
					$rootScope.$broadcast('Auth:loginRequired');
					return reject(error);
				});
		});
	};

}
