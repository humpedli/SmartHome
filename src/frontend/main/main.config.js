'use strict';

angular
	.module('smartHome')
	.config(SmartHomeConfig);

/**
 * Module configuration
 */
/*@ngInject*/
function SmartHomeConfig($urlRouterProvider, $httpProvider, $locationProvider,
    httpRequestInterceptorCacheBusterProvider, $logProvider, ENV) {

	// Setup cache buster for api calls
    httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*api.*/], true);

	// Define the main URL path
    $urlRouterProvider.otherwise('/app/dashboard');

    // Enable interceptors
    $httpProvider.interceptors.push('LoaderInterceptor');
    $httpProvider.interceptors.push('AuthInterceptor');

    // Disable logging in production mode
    $logProvider.debugEnabled(!ENV.production);

	// Enable pure URL-s (only in production mode, because it requires htaccess file)
	$locationProvider.html5Mode(ENV.production);
}
