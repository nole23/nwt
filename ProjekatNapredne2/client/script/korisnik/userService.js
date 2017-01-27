(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('UserService', UserService);
 
    function UserService($http, $localStorage, $log, $window, jwtHelper) {
        var service = {};
 
        service.Create = Create;
 
        return service;
 
        function GetAll(korisnik, callBack) {
           $http.post('/api/users', korisnik).success(function (data) {
			   callBack(data);
		   });
        }
 
       
    }
 
})();
 