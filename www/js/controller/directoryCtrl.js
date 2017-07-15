angular.module('atiempo.directoryCtrl', [])

.controller('directoryCtrl', function ($scope, $state, $ionicScrollDelegate, especialidadesServices, estadosServices, profesionalesServices, store) {

	$scope.sesionActive;
	$scope.showDirec = {value:true};
	$scope.showProf = {value:true};
	$scope.estado = {value:''};
	$scope.ciudad = {value:''};
	$scope.especialidad = {value:''};
	$scope.profesionales = [];

	$scope.$on("$ionicView.enter", function(event){

		$scope.hideLoading();
		$scope.sesionActive = store.get("token") ? true : false;
		$scope.showDirec = {value:true};
		$scope.showProf = {value:true};

	});

	$scope.$on("$ionicView.beforeEnter", function(event){
		// handle event

		$scope.showLoading(1000);

	});

	$scope.back = function(){

		if ( store.get("token") ) {

			$state.go('logged');

		}else{

			$state.go('app');

		}

	}

	estadosServices.listarEstados().success(function (data){

	    $scope.showLoading(10000);

	    if (data.status) {

	    	$scope.estados = data.data;

	        $scope.hideLoading();

	    }

	});

	$scope.consult = function (tipo, data) {

		if ( tipo === 'ta' ) {

			$scope.typeAtencion = data;

		}else if( tipo === 'stado' ){

			$scope.stdo = data;

		}else if ( tipo === 'ciud' ) {

			$scope.ciud = data;

		}


	}

	$scope.$watch('typeAtencion', function(newValue, oldValue, scope) {
		
		if ( angular.isDefined(newValue) && newValue != '' ) {

			$scope.showLoading(10000);

			especialidadesServices.listarEspec(newValue).success(function (data){

	            $scope.listEspc = data.data;

	            if (data.status) {

	            	$scope.ciud = '';

	            	$scope.hideLoading();

	            }

	        });

		}

	});

	$scope.$watch('stdo', function(newValue, oldValue, scope) {
		
		if ( angular.isDefined(newValue) && newValue != '' ) {

			$scope.showLoading(10000);

			profesionalesServices.listarCiudades(newValue).success(function (data){

	            $scope.ciudades = data.data;

	            if (data.status) {

	            	$scope.ciud = '';

	            	$scope.hideLoading();

	            }

	        });

		}

	});

	$scope.$watch('ciudad.value', function(newValue, oldValue, scope) {

		if ( angular.isDefined(newValue) && newValue != '' ) {

			$scope.showLoading(10000);

			profesionalesServices.listProf(newValue).success(function (data){

	            $scope.profesionales = data.data;

	            if (data.status) {

	            	$scope.hideLoading();

	            }

	        });

		}

	});

	$scope.scrollSmallToTop = function() {

		$ionicScrollDelegate.scrollBottom(true);

	};

	$scope.getDirec = function (data) {

		$scope.direccion = data;

	}

})