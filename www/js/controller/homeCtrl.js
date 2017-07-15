angular.module('atiempo.homeCtrl', [])
.controller('homeCtrl', function ($scope) {
	
	setTimeout(function(){ 
                if (localStorage.getItem("id")!=null) {
                    var x = localStorage.getItem("id");
                    var y = localStorage.getItem("data");
                    localStorage.removeItem("id");
                    localStorage.removeItem("data");
                    var pass = x + "/" + y;
                    $state.go("alarma",{id: pass});
                }

    }, 1000);

})