(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('UserService', UserService);
 
    function UserService($http, $localStorage, $log, $window, jwtHelper) {
        var service = {};
 
        service.Create = Create;
 
        return service;
 
        function Create(korisnik, callBack) {
           
           $http.post('/api/user/', korisnik).success(function (data) {
			   callBack(data);
               console.log(data);
		   });
           
        }
 
       
    }
 
})();
 