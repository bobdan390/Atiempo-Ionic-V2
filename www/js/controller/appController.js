angular.module('atiempo.appController', [])
.controller('appController', function ($scope, $ionicLoading, $state, store) {

    $scope.showLoading = function(time) {

        $ionicLoading.show({

            template: 'Cargando...<br><ion-spinner icon="ripple"></ion-spinner>',

            duration: time ? time : 3000 //puedes ser infinito si se omite y deternerlo al llamar al hide

        }).then(function(){

            //console.log("The loading indicator is now displayed");

        });

    }

    $scope.hideLoading = function(){

        $ionicLoading.hide().then(function(){

            //console.log("The loading indicator is now hidden");

        });

    }

    $scope.dias = function(desde, hasta){

        var entrada = new Date(desde);

        var salida = new Date(hasta);

        var mili_segundos_por_dia = 1000 * 60 *  60 * 24;
        var utc1 = Date.UTC(entrada.getFullYear(), entrada.getMonth(), entrada.getDate());
        var utc2 = Date.UTC(salida.getFullYear(), salida.getMonth(), salida.getDate());

        return Math.floor((utc2 - utc1) / mili_segundos_por_dia);

        //console.log(Math.floor((utc2 - utc1) / mili_segundos_por_dia));

    }

    $scope.cerrarSesion = function(){

        store.remove('token');

        $state.go('app');

    }

})