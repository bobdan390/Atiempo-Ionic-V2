angular.module('atiempo.regisCtrl', [])

.controller('regisCtrl', function ($scope, $state, $ionicActionSheet, loginServices, dataRegisServices) {

	$scope.$on("$ionicView.beforeEnter", function(event){

		$scope.usuario = {value:''};
		$scope.nombre = {value:dataRegisServices.data.nombre};
		$scope.email = {value:dataRegisServices.data.email};
		$scope.clave = {value:''};
		$scope.repClave = {value:''};
		$scope.showLoading(1000);

	});

	$scope.$on("$ionicView.enter", function(event){

		$scope.hideLoadin();

	});

	$scope.back = function(){

		$state.go('verificar');

	}

	$scope.registrar = function(data){

		$scope.showLoading(30000);

		loginServices.registro(data).success(function (data){

			if( data.data == 'Usuario creado correctamente' ){

				$scope.usuario = {value:''};
				$scope.nombre = {value:''};
				$scope.email = {value:''};
				$scope.clave = {value:''};
				$scope.repClave = {value:''};
				$scope.hideLoading();

				$state.go('login');

				$ionicActionSheet.show({
					destructiveText: data.data,
					titleText: 'Mensaje de validación',
					cancelText: 'Ok',
					destructiveButtonClicked: function() {

					}
				});

			}else {

				$scope.hideLoading();

				$ionicActionSheet.show({
					destructiveText: 'Problemas al crear al usuario',
					titleText: 'Mensaje de validación',
					cancelText: 'Ok',
					destructiveButtonClicked: function() {

					}
				});

			}

		});

	}

})