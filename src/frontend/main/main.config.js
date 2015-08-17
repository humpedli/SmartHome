'use strict';

angular
	.module('smartHome')
	.config(SmartHomeConfig);

/**
 * Module configuration
 */
/*@ngInject*/
function SmartHomeConfig($urlRouterProvider, $httpProvider, 
    httpRequestInterceptorCacheBusterProvider, $logProvider, ENV) {

    httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*api.*/], true); // cache buster for api calls

    $urlRouterProvider.otherwise('/app/dashboard'); // the main path

    // Loading interceptors
    $httpProvider.interceptors.push('LoaderInterceptor');
    $httpProvider.interceptors.push('AuthInterceptor');

    // Disable logging in production mode
    $logProvider.debugEnabled(!ENV.production);

}