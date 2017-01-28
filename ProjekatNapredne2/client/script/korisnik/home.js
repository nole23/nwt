(function () {
	app.controller('HomeCtrl', '$scope', function($scope ,$location, meanData, user){
		if(user.isLoggedIn()){

		  $scope.korisnik = {};

		  meanData.getLoggedUser()
		    .then(function(korisnik) {
		      $scope.korisnik = {
		      	mail: korisnik.data.mail,
		      	ime: korisnik.data.ime,
		      	prezime: korisnik.data.prezime
		   	 	}
		    }, function (e) {
		      console.log(e);
		    });

		    $scope.onLogout = function(){
		    	user.logout();
		    	$location.path('/');
		    }
		 }else{
		 	$location.path('/');
		 }
	});
})();