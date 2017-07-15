angular.module('atiempo.viajesCtrl', [])
.controller('viajesCtrl', function ($scope, $state, $ionicModal, $filter, fechasEspServices, viajesServices, jwtHelper, store) {

	$scope.allViajes = function(){

		viajesServices.listarViajes(store.get("token")).then(function(data){

			$scope.listViajes = data.data.data;

		})

	}

	$scope.formatDate = function(date){

		var dateOut = new Date(date);

		return dateOut;

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
			$scope.showLoading(1000);

			$scope.allViajes();

			console.log(jwtHelper.decodeToken(store.get("token")));

		}

	});

	$scope.$on("$ionicView.enter", function(event){
	   // handle event
	   
	   $scope.hideLoading();

	});

	$scope.back = function(){

		$state.go('logged');

	}

	$scope.openViewSolicitarViaje = function () {
		
		//$state.go('solicitar-viaje');
		$state.go('datos-viaje');

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