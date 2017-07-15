angular.module('atiempo.documentsCtrl', [])
.controller('documentsCtrl', function ($scope, $ionicModal, $state, docsServices) {

	$scope.choices = $scope.choice;

	$scope.listarDocumentos = function(){

		docsServices.listarDocs().then(function(data){

			console.log(data);

			//$scope.docsList = data.data;

		})

	}

	$scope.$on("$ionicView.beforeEnter", function(event){
	   	// handle event

		$scope.showLoading(1000);
		$scope.listarDocumentos();

	});

	$scope.$on("$ionicView.enter", function(event){
	   // handle event
	   
	   $scope.hideLoading();

	});

	$scope.lockDocts = function() {
		
		$state.go('lock-documents');

	}

})