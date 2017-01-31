/**
 * 
 */

'use strict';

angular.module('app') // ... omitted code
	.controller('AddAppCtrl', ['$scope', '$localStorage', '$http', '$window', '$log', '_', '$rootScope', '$routeParams',
	   function($scope, $localStorage, $http, $window, $log, _, $rootScope, $routeParams) {

		  

		   /**
			* Dodavanje nove aplikacije na sistem
		    */
           $scope.ok=function () {
			   var naziv =  $scope.aplikacija;

			   if(naziv == null) {
				   document.getElementById("nista").style.display = "";
			   } else {
				   if(naziv.naziv == null){
					   $scope.messageNaziv = false;
				   } else if(naziv.domen == null) {
					   $scope.messageDomen = false;
				   } else {
					   
					   $http.post('api/aplication', naziv)
							.success(function (response) {
								console.log(response);
								$scope.messageSave = response;
								window.location = '#/aplication/'+naziv.domen;
							}).error(function(resi) {
								console.log(resi);
								document.getElementById("duplikat").style.display = "";
							})
				   }
				   
			   }
			   
		   };
	}])
	.controller('AplicationCtrl', ['$scope', '$uibModal', '$timeout', '$routeParams', '$log', '_', 'AplikacijaResource',
	   function($scope, $uibModal, $timeout, $routeParams, $log, _, AplikacijaResource) {

		   console.log('domen aplikacije je '+$routeParams.domen);

		   /**
			* Ispis aplikacije sa datim domenom
		    */
		   AplikacijaResource.getAplication($routeParams.domen).then(function (resource) {
			   $scope.aplkacija = resource;
			   console.log(resource);
		   });

		   /**
			* Iscitavanje svih dogadjaja za datu aplikaciju
		    */
		   AplikacijaResource.getAllError($routeParams.domen).then(function(items) {
			   $scope.errorApp = items;
			  
		   })

          
	}])
	.controller('AllMyAppCtrl', ['$scope', '$uibModal', '$timeout', '$routeParams', '$log', '_', 'AplikacijaResource',
	   function($scope, $uibModal, $timeout, $routeParams, $log, _, AplikacijaResource) {

		   /**
			* Ispis svih aplikacija za koje sam odgovoran
		    */
		   AplikacijaResource.getAllMyAplication().then(function(items) {
			   $scope.aplikacija = items;
		   })
	}])

	.controller('AllAppCtrl', ['$scope', '$uibModal', '$timeout', '$routeParams', '$log', '_', 'AplikacijaResource',
	   function($scope, $uibModal, $timeout, $routeParams, $log, _, AplikacijaResource) {

		   /**
			* Ispis svih aplikacija koje su prijavljene na sistemu
		    */
		   AplikacijaResource.getAllApplication().then(function(items) {
			   $scope.aplikacija = items;
			   console.log(items);
		   })
	}])

	.controller('AppUserCtrl', ['$scope', '$uibModal', '$timeout', '$routeParams', '$log', '_', 'AplikacijaResource',
	   function($scope, $uibModal, $timeout, $routeParams, $log, _, AplikacijaResource) {

		   console.log('domen aplikacije je '+$routeParams.domen);
		   $scope.aplikacija = $routeParams.domen;

		   /**
			* Ispis svih korisnika iz baze
		    */
		   AplikacijaResource.getKorisnici().then(function (data) {
			   $scope.korisnici = data;
		   })

		   /**
			* Dodavanje novog odgovornog za datu aplikaciju
		    */
		   $scope.dodati = function(mail) {
			   AplikacijaResource.addNewAdmin(mail, $routeParams.domen, callBack);
		   }

		   /**
			* Povratna vrednost uspjesnog cuvanja
		    */
		   function callBack(success) {
			   if(success.success == true) {
				   $scope.mesages = true;
			   } else if (success.msg == 'postoji') {
				   $scope.messagePostiji = true;
			   }
		   };

		   
	}])


	