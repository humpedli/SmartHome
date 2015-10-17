'use strict';

angular
	.module('smartHome')
	.controller('LoginController', LoginController);

/**
 * Controller for login
 * @param $state
 * @param $modal
 * @param AuthDataService
 */
/*@ngInject*/
function LoginController($state, $modal, AuthService) {

	// controllerAs with vm
	var vm = this;

	// Wired functions
	vm.login = login;

	/**
	 * Constructor, initialize
	 */
	function init() {

	}
	init();

	function login() {
		AuthService.login({
			username: vm.username,
			password: vm.password
		})
			.then(function () {
				$state.go('dashboard');
			})
			.catch(function () {
				$modal({
					title: 'Hiba',
					content: 'A bejelentkezés nem sikerült!\n' +
					'Hibás felhasználónév vagy jelszó!'
				});
			});
	}
	
}
