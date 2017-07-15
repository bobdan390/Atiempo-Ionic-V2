angular.module('atiempo.loginCtrl', ["ngCordova"])

.controller('loginCtrl', function ($scope, $state, $ionicActionSheet, $filter, loginServices, store, jwtHelper, authServices) {

	$scope.online = '';

	$scope.login = function(datos) {


		loginServices.login(datos).success(function (data){

			$scope.showLoading(1000);

			if ( data.mensajes.msnConsult == 'Datos correctos' ) {

				store.set('token', data.data.token);

				$state.go('logged');

			}else{

				$scope.msnConsult = data.mensajes.msnConsult;

				$scope.msnPassword = data.mensajes.msnPassword ? data.mensajes.msnPassword : '';

				$scope.msnUsuario = data.mensajes.msnUsuario ? data.mensajes.msnUsuario+'<br>' : '';

				// Show the action sheet
				$ionicActionSheet.show({
					destructiveText: $scope.msnConsult+'<br>'+$scope.msnUsuario+$scope.msnPassword,
					titleText: 'Problemas durante la authenticación',
					cancelText: 'Ok'
				});

			}

		});

	}

	$scope.register_ = function(){

		$state.go('webview');
		/*
		 var ref = cordova.InAppBrowser.open('http://grupomlk1.dyndns.org:8000/a-net/public/register#step-1', '_self', 'location=no');
		 ref.addEventListener('loadstart', function(event) {  });
         ref.addEventListener('loadstop', function(event) {  });
         ref.addEventListener('loaderror', function(event) {  });
         ref.addEventListener('exit', function(event) { });
         */
	}

})
