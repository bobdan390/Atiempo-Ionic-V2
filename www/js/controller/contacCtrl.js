angular.module('atiempo.contacCtrl', [])
.controller('contacCtrl', function ($scope, $state, store) {


    $scope.back = function(){

        if ( store.get("token") ) {

            $state.go('logged');

        }else{

            $state.go('app');

        }

    }

})