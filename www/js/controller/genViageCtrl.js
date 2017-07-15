angular.module('atiempo.genViageCtrl', [])
    .controller('genViageCtrl', function ($scope, $state, $filter, $ionicModal, $ionicActionSheet, $timeout, dataContraServices, viajesServices, fechasEspServices, store) {

        $scope.$on("$ionicView.beforeEnter", function(event){
            // handle event

            if(!store.get("token")){

                $state.go('login');

            }//else if(bool === true){

            //$state.go('login');

            //}
            else {

                $scope.showLoading(1000);

                $scope.afiliado = dataContraServices.genViaje.afiliado;

                $scope.viajes = dataContraServices.genViaje.viajes;

            }

        });

        $scope.$on("$ionicView.enter", function(event){
            // handle event

            $scope.hideLoading();

        });

        $scope.fechaSeteada = function(data){

            var mes = fechasEspServices.fecha($filter('date')(data,'MM'));

            return $filter('date')(data,'d')+' de '+mes;

        }

        $scope.enviar = function () {

            viajesServices.genViaje(dataContraServices.genViaje, store.get("token")).then(function(data){

                if (data.data.mensajes.msnHeaders && !data.data.mensajes.msnInvalid){

                    dataContraServices.genViaje = null;

                    $ionicActionSheet.show({
                        destructiveText: 'OK',
                        titleText: 'Viaje generado correctamente',
                        cancelText: 'Ok',
                        destructiveButtonClicked: function(){
                            $state.go('avi');
                        }
                    });

                    $timeout(function() {
                        $state.go('avi');
                    }, 3000);

                }else{

                    $ionicActionSheet.show({
                        destructiveText: 'Intentelo mas tarde',
                        titleText: 'Problemas durante la generación del viaje',
                        cancelText: 'Ok'
                    });



                }

            });

        }

        $scope.back = function () {

            $state.go('datos-viaje');

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