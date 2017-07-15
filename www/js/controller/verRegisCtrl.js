angular.module('atiempo.verRegisCtrl', [])

    .controller('verRegisCtrl', function ($scope, $ionicLoading, $state, $filter, $ionicActionSheet, ionicDatePicker, loginServices, dataRegisServices) {


        $scope.$on("$ionicView.beforeEnter", function(event){

            $scope.cedula = {value:''}
            $scope.fecha = {value:''}

            $scope.showLoading(1000);

        });

        $scope.$on("$ionicView.enter", function(event){

            $scope.hideLoading();

        });

        $scope.back = function(){

            $state.go('login');

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
            disableWeekdays: [],       //Optional
            closeOnSelect: false,       //Optional
            templateType: 'modal'       //Optional
        };

        $scope.openDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj1);
        }

        $scope.verificar = function(data){

            loginServices.verif(data).success(function(data){

                console.log(data);

                if( data.data.status ){

                    // Show the action sheet
                    $ionicActionSheet.show({
                        buttons: [
                            { text: 'Crear Usuario' }
                        ],
                        titleText: 'Mensaje de Verificación',
                        cancelText: 'Ok',
                        buttonClicked: function(index) {

                            dataRegisServices.data = data.data.afiliado;

                            $state.go('registro');

                        }
                    });

                }else{

                    // Show the action sheet
                    $ionicActionSheet.show({
                        destructiveText: data.data.msn,
                        titleText: 'Mensaje de Verificación',
                        cancelText: 'Ok',
                        destructiveButtonClicked: function() {

                        }

                    });

                }

            });

        }

    })