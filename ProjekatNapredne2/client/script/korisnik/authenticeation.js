/**
 * 
 */

(function () {
    angular
        .module('app')
        .factory('LoginResources', Service);

    function Service($http, $localStorage, $log, $window, jwtHelper) {
        var service = {};

        service.login = login;
        service.logout = logout;
        service.getCurrentUser = getCurrentUser;
        service.myProfile = myProfile;

        return service;

        function login(email, sifra, callback) {
            $http.post('/api/authenticate/', { mail: email, sifra: sifra })
                .success(function (response) {
                    // ukoliko postoji token, prijava je uspecna
                   if (response.token) {
                        // korisnicko ime, token i rola (ako postoji) cuvaju se u lokalnom skladištu
                        
                        var tokenPayload = jwtHelper.decodeToken(response.token);
                        var currentUser = { email: email, token: response.token };

                        $localStorage.currentUser = currentUser;
                        $http.defaults.headers.common.Authorization = response.token;
                        
                        

                        callback(response);
                    } else {
                        // callback za neuspesan login
                        callback(response);
                    }
                   
                });
        }

        function logout() {
            // uklonimo korisnika iz lokalnog skladišta
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
            
        }

        function getCurrentUser() {
            return $localStorage.currentUser;
        }

        function myProfile() {
            console.log();
        }
        
    }
})();