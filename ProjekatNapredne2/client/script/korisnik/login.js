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
                if (success.msg == 'email') {
                    $scope.messageLogin = success.error;
                    //window.location = '#/'
                    console.log(success.msg);
                } else if(success.msg == 'sifra'){
                    $scope.messageLogin = success.error;
                    console.log(success.msg);
                }  else if(success.success == true) {
                    $log.info('success!');
                    //console.log(success.token);
                    console.log(success);
                    window.location = '#/';
                    
                    
                    
                }
            }
            
            $scope.myProfile = function() {
                LoginResources.myProfile($scope, callBackPrfile);
            }
	}])
    