'use strict';


angular
    .module('app', [
        'ngResource',
        'ngRoute',
        'ngStorage',
        'restangular',
        'ui.bootstrap',
        'lodash',
        'angular-jwt'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html'
            })

            .otherwise({
                redirectTo: '/'
            });
        
    }])

    .run(['Restangular', '$log', '$rootScope', '$http', '$location', '$localStorage', 'LoginResources', function(Restangular, $log, $rootScope, $http, $location, $localStorage, LoginResources) {
        Restangular.setBaseUrl("api");
        Restangular.setErrorInterceptor(function(response) {
            if (response.status === 500) {
                $log.info("internal server error");
                return true; // greska je obradjena
            }
            return true; // greska nije obradjena
        });


        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = $localStorage.currentUser.token;
        }
        $rootScope.logout = function () {
        	LoginResources.logout();
        }
        $rootScope.getCurrentUserRole = function () {
            if (!LoginResources.getCurrentUser()){
              return undefined;
            }
            else{
              return LoginResources.getCurrentUser().rola;
            }
        }
        $rootScope.isLoggedIn = function () {
            if (LoginResources.getCurrentUser()){
              return true;
            }
            else{
              return false;
            }
        }
        $rootScope.getCurrentState = function () {
          return $state.current.name;
        }
    }]);