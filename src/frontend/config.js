(function () { 
 return angular.module('mobileApp')
.constant('ENV', {"name":"development","production":false,"apiEndpoint":"/backofficemobile/control/","mockApiEndpoint":"http://localhost:8100/nobackend/"});

})();
