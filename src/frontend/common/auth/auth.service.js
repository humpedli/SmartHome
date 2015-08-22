'use strict';

angular.module('smartHome')
	.factory('AuthService', AuthService);

/**
 * Auth service - it handles login, logout and authorize functions,
 * this is the connection between Principal and AuthDataService
 * @param $rootScope
 * @param $q
 * @param $log
 * @param Principal
 * @param AuthDataService
 */
/*@ngInject*/
function AuthService($rootScope, $q, $log, Principal, AuthDataService) {
	var name = 'AuthService';

	/**
	 * Login a user with credentials
	 * @param credentials
	 */
	function login(credentials) {
		return $q(function (resolve, reject) {
			$log.debug(name + ': Logging in with credentials...');

			AuthDataService.login(credentials).$promise
				//If the login was successful
				.then(function () {
					return resolve(authorize());

				})
				//If there was an error
				.catch(function (error) {
					$log.error(name + ': ' + error);
					return reject(error);
				});
		});
	}

	/**
	 * Logout user
	 */
	function logout() {
		$log.debug(name + ': Logging out...');

		AuthDataService.logout().$promise
			.then(function () {
				$log.debug(name + ': Logged out!');

				Principal.authenticate(null);
				$rootScope.$broadcast('Auth:loginRequired');
			});
	}

	/**
	 * Authorize user
	 */
	function authorize() {
		return Principal.getIdentity();
	}

	return {
		login: login,
		logout: logout,
		authorize: authorize
	};
}
