/**
 * 
 */

angular.module('app')
	.factory('AplikacijaResource', ['Restangular', '_', function(Restangular, _) {
		'use stict';
		var retVal = {};
        var aplikacija = [];
        var aplikacije = [];
        var korisnici = [];
        var greska = [];


        retVal.getAplication = function(id) {
		
            return Restangular.one(""+id).get().then(function(item) {
                aplikacija = item;
                return aplikacija;
            });
        }

        retVal.getAllMyAplication = function() {
            return Restangular.all('user/app/all').getList().then(function(items) {
                aplikacija = items;
                return aplikacija;
            })
        }

        retVal.getAllApplication = function() {
            return Restangular.all('application/all').getList().then(function(data) {
                aplikacije = data;
                return aplikacije;
                
            })
        }

        retVal.getKorisnici = function() {
            return Restangular.all('users/all').getList().then(function(items) {
                korisnici = items;
                return korisnici;
            })
        }

        retVal.addNewAdmin = function(mail, domen, callBack) {
            var link ='/user/new/'+domen+'/'+mail;
            var podatak = {
                mail: mail
            };
            return Restangular.one(link).put().then(function(success) {
                callBack(success);
            })
        }

        retVal.getAllError = function(domen) {
            var link = "/error/heandle/"+domen;
            return Restangular.all(link).getList().then(function(items) {
                greska = items; 
                return greska;
            })
        }
		
		return retVal;
		
	}]);