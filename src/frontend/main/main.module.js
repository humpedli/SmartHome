'use strict';

angular
	.module('smartHome', [
		'ngResource', // angular-resource
		'ui.router', // angular-ui-router - https://github.com/angular-ui/ui-router
		'mgcrea.ngStrap', // angular-strap - http://mgcrea.github.io/angular-strap/
		'ngSanitize', // angular-sanitize by AngularStrap
		'ngCacheBuster', // angular-cache-buster
		'angularMoment', // angular-moment,
		'toggle-switch', // angular-toggle-switch - https://github.com/cgarvis/angular-toggle-switch
		'btford.socket-io', // angular-socket-io - https://github.com/btford/angular-socket-io
		'highcharts-ng', // angular-highcharts - https://github.com/pablojim/highcharts-ng
		'angular-skycons' // angular-skycons (forecast.io icons) - https://github.com/projectweekend/angular-skycons
	]);
