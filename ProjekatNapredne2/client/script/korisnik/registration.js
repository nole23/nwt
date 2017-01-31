'use strict';

angular.module('app') // ... omitted code
	.controller('RegistrationCtrl', ['$scope', 'UserService', '$window',
	   function($scope, UserService, $window) {
            
            $scope.register = function () {
                
                UserService.Create($scope.korisnik, callBack);
                
            };
			
			function callBack(success) {
				if(success.success == false) {
					$scope.messageUser = success.msg;
				} else if(success.success = true) {
					document.getElementById("sacuvano").style.display = "";
				}
			}

	}]);