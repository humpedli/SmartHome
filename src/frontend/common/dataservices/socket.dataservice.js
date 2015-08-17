'use strict';

angular.module('smartHome')
	.factory('SocketDataService', SocketDataService);

/**
 * This is the service for socket.io handling
 * @param $window
 * @param socketFactory
 * @param ENV
 * @constructor
 */
/*@ngInject*/
function SocketDataService($window, socketFactory, ENV) {
	return socketFactory({
		prefix: 'raspberry',
		ioSocket: $window.io.connect(ENV.socketEndpoint)
	});
}
