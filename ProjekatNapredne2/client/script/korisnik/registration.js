'use strict';

angular.module('app') // ... omitted code
	.controller('RegistrationCtrl', ['$scope', '$localStorage', '$http', '$window', '_', '$rootScope', 'UserService', 'FlashService',
	   function($scope, $localStorage, $http, $window, _, $rootScope, UserService, FlashService) {

        
            $scope.isLogin = false;
       //     $scope.korisnik={};
            $scope.register = register;
            
            $scope.register = function () {
                
                UserService.Create($scope.korisnik, callBack);
                
            };
			
			function callBack(success) {
				if(success.success == true) {
					console.log('sacuvano');
				}
			}

	}]);