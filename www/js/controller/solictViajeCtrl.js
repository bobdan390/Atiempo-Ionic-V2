angular.module('atiempo.solictViajeCtrl', [])
    .controller('solictViajeCtrl', function ($scope, $state, jwtHelper, store, dataContraServices) {

        $scope.$on("$ionicView.beforeEnter", function(event){
            // handle event

            if(!store.get("token")){

                $state.go('login');

            }//else if(bool === true){

            //$state.go('login');

            //}
            else {

                $scope.showLoading(1000);

                $scope.afiliado = {value: false};
                $scope.numContra = jwtHelper.decodeToken(store.get("token")).contrato.codigo_contrato;
                $scope.aseguradora = jwtHelper.decodeToken(store.get("token")).aseguradora.nombre;
                $scope.afiliados = jwtHelper.decodeToken(store.get("token")).afiliados;

            }

        });

        $scope.$on("$ionicView.enter", function(event){
            // handle event

            $scope.hideLoading();

        });

        $scope.back = function(){

            $state.go('logged');

        }

        $scope.openViewDatosViaje = function () {

            $state.go('datos-viaje');

            dataContraServices.data = {'beneficiario': $scope.afiliado.value};

        }


        $scope.openViewEnviarDatos = function () {

            $state.go('enviar-avi');

        }

        $scope.enviar = function () {

            $state.go('avi');

        }



    })