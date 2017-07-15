angular.module('atiempo.homeUserCtrl', ["ngCordova"])

.controller('homeUserCtrl', function ($scope, $state, jwtHelper, store, $ionicActionSheet, $cordovaSQLite) {

	$scope.$on("$ionicView.beforeEnter", function(event){
		// handle event
		if(!store.get("token")){

			$state.go('login');

		}//else if(bool === true){

		//$state.go('login');

		//}
		else {

			$scope.showLoading(1000);
			$scope.userName = jwtHelper.decodeToken(store.get("token")).user.name;

		}

		if (window.cordova) {
            var query1 = "CREATE TABLE IF NOT EXISTS alarms (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, beginDate TEXT, endDate TEXT, beginHour TEXT, intervale TEXT, type TEXT, sound BOOLEAN, status BOOLEAN, message TEXT)"
            window.sqlitePlugin.openDatabase({name: 'my_.db', location: 'default'}, function(db) {
                db.executeSql(query1, [], function (resultSet) {}, function(error) {
                    console.log('SELECT error: ' + error.message);
                });             
            });
         }

	});

	$scope.$on("$ionicView.enter", function(event){
		// handle event

		$scope.hideLoading();

	});

	$scope.exit = function(){
		$ionicActionSheet.show({
                            
                            titleText: 'Estas seguro que esa salir?',
                            buttons: [
                                { text: 'Salir' },
                                { text: 'Cancelar' },
                            ],
                            buttonClicked: function(index) {
                                switch (index){
                                    case 0 :
                                        
                                        $state.go("login");
                                        return true;
                                    case 1 :
                                        return true;
                                }
                            }

            }); 
	}

})