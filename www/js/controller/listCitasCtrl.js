angular.module('atiempo.listCitasCtrl', [])
.controller('listCitasCtrl', function ($scope, $state, $ionicActionSheet, $ionicModal, $filter, fechasEspServices, citasServices, jwtHelper, store) {

	$scope.allCitas = function(){

		citasServices.listarCitas(jwtHelper.decodeToken(store.get("token")).titular.cedula).then(function(data){

			$scope.listCitas = data.data.data;

		})

	}

	$scope.fechaSeteada = function(data){

		var mes = fechasEspServices.fecha($filter('date')(data,'MM'));

		return $filter('date')(data,'d')+' de '+mes;

	}

	$scope.$on("$ionicView.beforeEnter", function(event){
	   // handle event

		if(!store.get("token")){

			$state.go('login');

		}//else if(bool === true){

		//$state.go('login');

		//}
		else {

			$scope.nameCuenta = jwtHelper.decodeToken(store.get("token")).titular.nombre;

			$scope.showLoading(1000);

			$scope.allCitas();

			//console.log(jwtHelper.decodeToken(store.get("token")));

		}

	});

	$scope.$on("$ionicView.enter", function(event){
	   // handle event
	   $scope.hideLoading();

	});

	$scope.openViewContraCita = function() {

		//$state.go('solicitud-citas');
		$state.go('datos-cita');

	}

	$ionicModal.fromTemplateUrl('my-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	})

	$scope.openModal = function(data) {
		$scope.modal.show();
		$scope.dataModal = data;
		$scope.fechaModal = $scope.fechaSeteada(data.fecha);
	}
	$scope.closeModal = function() {
		$scope.modal.hide();
	}
	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	})
	// Execute action on hide modal
	$scope.$on('modal.hidden', function() {
		// Execute action
	})
	// Execute action on remove modal
	$scope.$on('modal.removed', function() {
		// Execute action
	})

})