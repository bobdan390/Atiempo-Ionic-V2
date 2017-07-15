angular.module('atiempo.citasCtrl', [])
.controller('citasCtrl', function ($scope, $ionicModal, $state, $ionicActionSheet, ionicDatePicker, jwtHelper, store, dataContraServices, $filter, clinicaServices, especialidadesServices, tipoServicioServices, proMedicoServices) {

	$scope.listAllServ = function(){

		tipoServicioServices.allServ(store.get("token")).then(function(data){

	   		$scope.allServ = data.data.data;

		});

	}

	$scope.listAllEspec = function(){

		especialidadesServices.allEspec(store.get("token")).then(function(data){

	   		$scope.allEspec = data.data.data;

		});

	}

	$scope.listAll = function(){

		especialidadesServices.allEspecAndServ(store.get("token")).then(function(data){

	   		$scope.allEspec = data.data.data.esp;
			$scope.allServ = data.data.data.serv;

		});

	}

	//datos citas

	$scope.inputsData = function(){

		$scope.detailClaves = [];
		$scope.proveedores = [];
		$scope.fecha = {value: ''};
		$scope.telefono = {value: ''};
		$scope.motivoConsult = {value: ''};
		$scope.espec = {value: ''};
		$scope.tipoServ = {value: ''};
		$scope.procMedico = {value: ''};
		$scope.servAdic = {value: true};
		$scope.detailServ = {value: ''};
		//$scope.cantServ = {value: $scope.detailClaves.length};
		$scope.dataModal = {value: ''};
		$scope.observaciones = {value: ''};
		$scope.clinicaOMedico1 = {value: ''};
		$scope.clinicaOMedico2 = {value: ''};
		$scope.prov1 = {value: ''};
		$scope.prov2 = {value: ''};
		$scope.infoTra = {value: ''};

	}

	var ipObj1 = {
		callback: function (val) {  //Mandatory

			$scope.fecha.value = $filter('date')(val, "yyyy-MM-dd");

		},
		disabledDates: [            //Optional

		],
		//from: new Date(2012, 1, 1), //Optional
		//to: new Date(2016, 10, 30), //Optional
		inputDate: new Date(),      //Optional
		mondayFirst: false,          //Optional
		disableWeekdays: [0],       //Optional
		closeOnSelect: false,       //Optional
		templateType: 'modal'       //Optional
	};

	$scope.openDatePicker = function(){
		ionicDatePicker.openDatePicker(ipObj1);
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

			//$scope.listAllServ();

			//$scope.listAllEspec();

			$scope.inputsData();

			$scope.listAll();

			$scope.datosContra = jwtHelper.decodeToken(store.get("token"));

		}

	});

	$scope.$on("$ionicView.enter", function(event){
	   	// handle event
	   
	   	$scope.hideLoading();

		$scope.inputsData();

	});

	$scope.$watch('tipoServ.value', function(newValue, oldValue, scope) {

		if ( angular.isDefined(newValue) && newValue != '') {

			$scope.showLoading(30000);

			proMedicoServices.listarProMedico(angular.fromJson(newValue).codigo_servicio, angular.fromJson($scope.espec.value).codigo_especialidad, store.get("token")).success(function (data){

	            $scope.listProcMedicos = data.data;

	            if (data.status) {

	            	$scope.procMedico = {value: ''};

	            	$scope.hideLoading();

	            }

	        });

		}

	});

	$scope.$watch('prov1.value', function(newValue, oldValue, scope) {

		if ( angular.isDefined(newValue) && newValue != '') {

			proMedicoServices.montoServ(angular.fromJson($scope.procMedico.value).id, $scope.clinicaOMedico1.value.codigo_proveedor, store.get("token")).then(function(data){

				$scope.detailClaves.push({
					pre: true,
					prov: $scope.clinicaOMedico1.value,
					monto: data.data.data,
					tipoServ: angular.fromJson($scope.tipoServ.value),
					proMed: angular.fromJson($scope.procMedico.value)
				});

				$scope.infoTra.value = {
					pre: true,
					prov: $scope.clinicaOMedico1.value,
					monto: data.data.data,
					tipoServ: angular.fromJson($scope.tipoServ.value),
					proMed: angular.fromJson($scope.procMedico.value)
				};

			});

		}

	});

	$scope.$watch('prov2.value', function(newValue, oldValue, scope) {

		if ( angular.isDefined(newValue) && newValue != '') {

			proMedicoServices.montoServ(angular.fromJson($scope.procMedico.value).id, $scope.clinicaOMedico2.value.codigo_proveedor, store.get("token")).then(function(data){

				$scope.detailClaves.push({
					pre: false,
					prov: $scope.clinicaOMedico2.value,
					monto: data.data.data,
					tipoServ: angular.fromJson($scope.tipoServ.value),
					proMed: angular.fromJson($scope.procMedico.value)
				});

			});

		}

	});

	$scope.aceptarCita = function() {

		$state.go('appointments');

	}

	$scope.getNombre = function(query) {

		$scope.datos = [];

		if ( query ) {

			clinicaServices.listNombres(query, store.get("token")).then(function(data){

				angular.forEach(data.data.data, function(value, key){
					
					$scope.datos.push(value);

				});
			
			});

			return {

				items: $scope.datos

			};

		}
		
		return {items: []};

	}

	$scope.itemsClickedProv1 = function (callback) {

    	$scope.clinicaOMedico1.value = callback.item;

    }

	$scope.itemsClickedProv2 = function (callback) {

    	$scope.clinicaOMedico2.value = callback.item;

    }

	$scope.enviarCita = function() {
		
		$scope.datosCita = {
			montoTotal: $filter('sumByKey')($scope.detailClaves, "monto"),
			fecha_cita: $scope.fecha.value,
			telefono: $scope.telefono.value,
			motivo: $scope.motivoConsult.value,
			observaciones: $scope.observaciones.value,
			espec: angular.fromJson($scope.espec.value).codigo_especialidad,
			nomEspec: angular.fromJson($scope.espec.value).descripcion,
			detailClaveServ: $scope.detailClaves,
			servAdic: $scope.servAdic.value,
			detailServ: $scope.detailServ.value,
			tipoAfiliado: jwtHelper.decodeToken(store.get("token")).user.type,
			paciente: jwtHelper.decodeToken(store.get("token")).titular.nombre,
			cedula_afiliado: jwtHelper.decodeToken(store.get("token")).titular.cedula,
			tipo_afiliado: jwtHelper.decodeToken(store.get("token")).user.type,
			email: jwtHelper.decodeToken(store.get("token")).user.email,
			infoTra: $scope.infoTra.value

		}

		clinicaServices.genClav($scope.datosCita, store.get("token")).then(function(data){

			if (data.data.mensajes.msnHeaders && !data.data.mensajes.msnInvalid){

				$scope.inputsData();

				dataContraServices.dataCitas = $scope.datosCita;
				dataContraServices.claveGen = data.data.data;

				$state.go('appointments');

			}else{

				$ionicActionSheet.show({
					destructiveText: 'Intentelo mas tarde',
					titleText: 'Problemas durante la generación del viaje',
					cancelText: 'Ok'

				});

			}

			$scope.inputsData();
			
		});

	}

	$scope.datosModal = function(item){

		$scope.dataModal.value = item;

	}

	$ionicModal.fromTemplateUrl('my-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal, data) {
		$scope.modal = modal;
		$scope.dataModal = data;
	})

	$scope.openModal = function() {
		$scope.modal.show();
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