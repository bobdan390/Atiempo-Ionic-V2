angular.module('atiempo.webViewCtrl', ["ngCordova"])

.controller('webViewCtrl', function ($scope, $state, $ionicActionSheet, $filter) {

		var url  = "http://grupomlk1.dyndns.org:8000/a-net/public/register#step-1";

		var ref = cordova.InAppBrowser.open(url, '_blank', 'location=no');

		ref.addEventListener('loadstart', function(event) {
	        if(event.url.indexOf("close") > -1) {
	            ref.close();
	        }
	    });

		ref.addEventListener('loadstop', function(event) {
		    ref.executeScript({ code: "$('#valid3').click(function(){ window.location.href = 'close';});" });
		});

		ref.addEventListener('exit', function() {
		    $state.go('login');
		});


		$scope.back = function(){

            $state.go('login');

        }



})