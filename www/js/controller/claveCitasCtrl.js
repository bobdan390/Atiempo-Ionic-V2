angular.module('atiempo.claveCitasCtrl', [])
    .controller('claveCitasCtrl', function ($scope, $state, $filter, dataContraServices, fechasEspServices) {

        $scope.$on("$ionicView.beforeEnter", function(event){
            // handle event

            $scope.showLoading(1000);

            $scope.datosCitas = dataContraServices.dataCitas;

            $scope.datosContra = dataContraServices.data;

            $scope.claveGen = dataContraServices.claveGen;

            //console.log(dataContraServices.dataCitas);

        });

        $scope.$on("$ionicView.enter", function(event){
            // handle event

            $scope.hideLoading();

        });

        $scope.fechaSeteada = function(data){

            var mes = fechasEspServices.fecha($filter('date')(data,'MM'));

            return $filter('date')(data,'d')+' de '+mes;

        }

        $scope.aceptarCita = function() {

            dataContraServices.data = '';
            dataContraServices.dataCitas = '';

            $state.go('appointments');

        }

    })