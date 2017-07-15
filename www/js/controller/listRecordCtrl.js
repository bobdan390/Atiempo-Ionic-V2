angular.module('atiempo.listRecordCtrl', ["ngCordova"])


    .controller('listRecordCtrl', function ($scope, $ionicLoading, $state, $filter, $ionicActionSheet, ionicDatePicker, loginServices, dataRegisServices, $cordovaSQLite, $cordovaLocalNotification) {

        var db = null;
        $scope.$on("$ionicView.beforeEnter", function(event){
        
        $scope.response = [];
            if (window.cordova) {
            //device
                
                window.sqlitePlugin.openDatabase({name: 'my_.db', location: 'default'}, function(db) {

                    db.executeSql("SELECT * FROM alarms ORDER BY id DESC", [], function (resultSet) {

                      var len = resultSet.rows.length;
                                         for (var i = 0; i < len; ++i) {
                                            var inf = [];
                                            var obj = resultSet.rows.item(i);
                                            inf.push(obj["title"]);
                                            inf.push(obj["id"]);
                                            $scope.response.push(inf);
                                          }

                    }, function(error) {
                      console.log('SELECT error: ' + error.message);
                    });
                        
                });
            }else{

                    db = window.openDatabase("my_.db", "1", "Test DB", 1000000);
                    
                    db.transaction(function(tx) {
                       tx.executeSql('SELECT * FROM alarms ORDER BY id DESC', 
                                     [],
                                     function(tx, results)
                                     {
                                       // results is a http://dev.w3.org/html5/webdatabase/#sqlresultset .  
                                       // It has insertId, rowsAffected, and rows, which is
                                       // essentially (not exactly) an array of arrays.

                                       var len = results.rows.length;
                                         for (var i = 0; i < len; ++i) {
                                            var inf = [];
                                            var obj = results.rows.item(i);
                                            inf.push(obj["title"]);
                                            inf.push(obj["id"]);
                                            $scope.response.push(inf);
                                          }
                                        //console.log($scope.response);
                                     },
                                     function(tx, error)
                                     {
                                        console.log("Error: " + error);
                                     }
                       );
                    });    

                    
                                    
            }

            $scope.showLoading(8000);

        });

        $scope.$on("$ionicView.enter", function(event){

            $scope.hideLoading();
            /*setTimeout(function(){ 
                if (localStorage.getItem("id")!=null) {
                    var x = localStorage.getItem("id");
                    var y = localStorage.getItem("data");
                    localStorage.removeItem("id");
                    localStorage.removeItem("data");
                    var pass = x + "/" + y;
                    $state.go("alarma",{id: pass});
                }

            }, 1000);
            */  

        });

        $scope.back = function(){

            $state.go('logged');

        }

        $scope.formAgregar = function(){
            $state.go('config-recordatorio',{id: 0});
        }

        $scope.editAlarm = function(item){
            $state.go('config-recordatorio', {id: item});
        }


        $scope.deleteAlarm = function(item){
            console.log(item);
            $ionicActionSheet.show({
                            
                            titleText: 'Esta seguro que desea eliminar este tratamiento?',
                            buttons: [
                                { text: 'Eliminar' },
                                { text: 'Cancelar' },
                            ],
                            buttonClicked: function(index) {
                                switch (index){
                                    case 0 :
                                        if (window.cordova) {
                                            window.sqlitePlugin.openDatabase({name: 'my_.db', location: 'default'}, function(db) {

                                                                db.executeSql("DELETE FROM alarms WHERE id='"+item+"'", [], function (resultSet) {

                                                                }, function(error) {
                                                                  console.log('SELECT error: ' + error.message);
                                                                });
                                                                    
                                            });
                                            cordova.plugins.notification.local.cancel(item, function() {
                                                
                                            });
                                        }else{
                                            db = window.openDatabase("my_.db", "1", "Test DB", 1000000);
                    
                                            db.transaction(function(tx) {
                                               tx.executeSql("DELETE FROM alarms WHERE id='"+item+"'", 
                                                             [],
                                                             function(tx, results)
                                                             {
                                                               
                                                             },
                                                             function(tx, error)
                                                             {
                                                                console.log("Error: " + error);
                                                             }
                                               );
                                            });
                                        }
                                        $state.reload();
                                        return true;
                                    case 1 :
                                        return true;
                                }
                            }

            }); 
        }

        

    })