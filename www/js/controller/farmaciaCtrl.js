angular.module('atiempo.farmaciaCtrl', [])
.controller('farmaciaCtrl', function ($scope, $ionicModal, $state) {

	$scope.openViewAddMedicina = function(){

	    $state.go('solicitud-medicina');

	}

	$scope.datosMedicina = function(){

	    $state.go('datos-medicina');

	}

	$scope.addOtherMedicina = function(){

	    console.log('ok');

	}

	$scope.envMedic = function(){

	    $state.go('enviar-medicina');

	}

	$scope.enviar = function(){

	    $state.go('farmacia');

	}

	$scope.solidMedci = function(){

	    $state.go('solicitud-medicina');

	}

	$scope.$on("$ionicView.beforeEnter", function(event){
	   // handle event

		$scope.showLoading(1000);

	});

	$scope.$on("$ionicView.enter", function(event){
	   // handle event
	   
	   $scope.hideLoading();

	});


	$ionicModal.fromTemplateUrl('my-modal.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	}).then(function(modal) {
	    $scope.modal = modal;
	});

	$scope.openModal = function() {

	    $scope.modal.show();

	}
	$scope.closeModal = function() {

	    $scope.modal.hide();

	}



})