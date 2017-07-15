angular.module('atiempo.datosViajeCtrl', [])
    .controller('datosViajeCtrl', function ($scope, $state, $filter, $ionicModal, ionicDatePicker, dataContraServices, paisServices, store, jwtHelper) {

        $scope.allPaises = function(){

            paisServices.listarPaises().then(function(data){

                $scope.listPaises = data.data.data;

            })

        }

        $scope.inputsModal = function(){

            $scope.pais = {value:''};
            $scope.desde = {value:''};
            $scope.hasta = {value:''};

        }

        $scope.observaciones = {value:''};
        $scope.cronograma = {value:''};
        $scope.viajesProgramados = [];

        var ipObjDesde = {
            callback: function (val) {  //Mandatory

                $scope.desde.value = $filter('date')(val, "yyyy-MM-dd");

            },
            disabledDates: [            //Optional

            ],
            //from: new Date(2012, 1, 1), //Optional
            //to: new Date(2016, 10, 30), //Optional
            inputDate: new Date(),      //Optional
            mondayFirst: false,          //Optional
            disableWeekdays: [0],       //Optional
            closeOnSelect: false,       //Optional
            templateType: 'popup'       //Optional
        };

        $scope.openDateDesde = function(){
            ionicDatePicker.openDatePicker(ipObjDesde);
        }

        var ipObjHasta = {
            callback: function (val) {  //Mandatory

                $scope.hasta.value = $filter('date')(val, "yyyy-MM-dd");

            },
            disabledDates: [            //Optional

            ],
            //from: new Date(2012, 1, 1), //Optional
            //to: new Date(2016, 10, 30), //Optional
            inputDate: new Date(),      //Optional
            mondayFirst: false,          //Optional
            disableWeekdays: [0],       //Optional
            closeOnSelect: false,       //Optional
            templateType: 'popup'       //Optional
        };

        $scope.openDateHasta = function(){
            ionicDatePicker.openDatePicker(ipObjHasta);
        }

        $scope.$on("$ionicView.beforeEnter", function(event){
            // handle event

            if(!store.get("token")){

                $state.go('login');

            }//else if(bool === true){

            //$state.go('login');

            //}
            else {

                console.log(jwtHelper.decodeToken(store.get("token")));

                $scope.showLoading(1000);

                $scope.allPaises();
                $scope.inputsModal();
                $scope.observaciones = {value:''};
                $scope.cronograma = {value:''};
                $scope.viajesProgramados = [];
                $scope.afiliado = jwtHelper.decodeToken(store.get("token")).titular.nombre+' '+jwtHelper.decodeToken(store.get("token")).titular.apellido;

            }

        });

        $scope.$on("$ionicView.enter", function(event){
            // handle event

            $scope.hideLoading();

        });

        $scope.addViaje = function(){

            $scope.viajesProgramados.push({
                pais: angular.fromJson($scope.pais.value).name_es,
                codPais: angular.fromJson($scope.pais.value).id,
                desde: $scope.desde.value,
                hasta: $scope.hasta.value,
                dias: $scope.dias($scope.desde.value, $scope.hasta.value)
            });

            $scope.closeModal();
            $scope.inputsModal();

        }

        $scope.removeItemList = function (idx) {

            $scope.viajesProgramados.splice(idx, 1);

        }

        $scope.openViewEnviarDatos = function () {

            dataContraServices.genViaje = {
                viajes: $scope.viajesProgramados,
                cronograma: $scope.cronograma.value,
                observ: $scope.observaciones.value,
                afiliado: jwtHelper.decodeToken(store.get("token")).titular.nombre,
                contrato: null
            };

            $state.go('enviar-avi');

        }

        $scope.back = function () {

            $state.go('avi');

        }

        $ionicModal.fromTemplateUrl('info-viaje.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
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