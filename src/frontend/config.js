(function () { 
 return angular.module('smartHome')
.constant('ENV', {"name":"development","production":false,"apiEndpoint":"/api/","socketEndpoint":"192.168.1.250:9000"});

})();
