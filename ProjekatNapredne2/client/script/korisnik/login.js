'use strict';

angular.module('app') // ... omitted code
	.controller('LoginCtrl', ['$scope', '$localStorage', '$http', '$window', '$log', '_', '$rootScope', 'LoginResources',
	   function($scope, $localStorage, $http, $window, $log, _, $rootScope, LoginResources) {

        
            $scope.isLogin = false;
            $scope.korisnik={};
            
            $scope.login = function () {
                
                LoginResources.login($scope.korisnik.mail, $scope.korisnik.sifra, callBack);
                
            };

            function callBack(success) {
                if (success.error == 'email') {
                    $scope.messageLogin = success.error;
                    //window.location = '#/'
                } else if(success.error == 'sifra'){
                    $scope.messageLogin = success.error;
                    
                }  else if(success.success == true) {
                    $log.info('success!');
                    //console.log(success.token);
                    
                    window.location = '#/';
                    
                    
                    
                }
            }
	 
	}]);