angular.module('atiempo.alarmaCtrl', ["ngCordova"])


    .controller('alarmaCtrl', function ($scope, $ionicLoading, $state, $stateParams, $filter, $ionicActionSheet, ionicDatePicker, dataRegisServices,$cordovaSQLite, $cordovaLocalNotification) {
        var gg = $stateParams.id;
        var cake = gg.split('/');
        $scope.titulo = cake[2];
        $scope.mensaje = cake[1];
        $scope.tipo = cake[3];
        localStorage.removeItem("id");
        localStorage.removeItem("data");
        
        $scope.$on("$ionicView.beforeEnter", function(event){

            $scope.showLoading(8000);

        });

        $scope.$on("$ionicView.enter", function(event){

            $scope.hideLoading();
       
        });


        $scope.ok = function(){
            if (window.cordova) {
                window.sqlitePlugin.openDatabase({name: 'my_.db', location: 'default'}, function(db) {
                    db.executeSql("SELECT * FROM alarms WHERE id='"+cake[0]+"'", [], function (resultSet) {
                                            var d = new Date();
                                            var mes = d.getMonth();
                                            var day = d.getDate();
                                            var d__ = new Date();
                                            var obj = resultSet.rows.item(0); 
                                            var fCake = obj["endDate"].split("-");
                                            var h = d.getHours() + parseInt(obj["intervale"]);    
                                            if (h>23) { var hour = 23 - h;  day++;
                                            } else { var hour = h;}
                                            d__.setFullYear(d.getFullYear(), mes , day);
                                            d__.setHours(h);
                                            cordova.plugins.notification.local.cancel(parseInt(cake[0]), function() {});
                                            $cordovaLocalNotification.add({
                                                    id: parseInt(cake[0]),
                                                    firstAt: d__,
                                                    text: 'Click - here',
                                                    title: cake[1],
                                                    
                                                    sound: "file://sounds/1.mp3",
                                                    data: cake[2] + "/" + cake[1] + "/" + cake[3]
                                                }).then(function () {
                                                    console.log("The notification has been set");
                                                });
                                            $cordovaLocalNotification.isScheduled(parseInt(cake[0])).then(function(isScheduled) {});  
                                            cordova.plugins.notification.local.on("click", function(notification) {
                                                localStorage.removeItem("id");
                                                localStorage.removeItem("data");
                                                var pass = notification.id + "/" + notification.data;
                                                $state.go("alarma",{id: pass});
                                            });
                    }, function(error) {
                      console.log('SELECT error: ' + error.message);
                    });
                        
                });
            }
            $state.go('recordatorios');
        }

        $scope.snoze = function(){
            if (window.cordova) {

                                            var d = new Date();
                                            var mes = d.getMonth();
                                            var day = d.getDate();
                                            var d__ = new Date();
                                            var n = d.getMinutes();
                                            var h = d.getHours(); 
                                            if ((n+5)>59) {
                                                h++; n=59-n;
                                            }else{
                                                n = n + 4;
                                            }

                                            if (h>23) { var hour = 23 - h;  day++;
                                            } else { var hour = h;}
                                            d__.setFullYear(d.getFullYear(), mes , day);
                                            d__.setHours(h);
                                            d__.setMinutes(n);
                                            cordova.plugins.notification.local.cancel(parseInt(cake[0]), function() {});
                                            $cordovaLocalNotification.add({
                                                    id: parseInt(cake[0]),
                                                    firstAt: d__,
                                                    text: 'Click - here',
                                                    title: cake[1],
                                                    
                                                    sound: "file://sounds/1.mp3",
                                                    data: cake[2] + "/" + cake[1] + "/" + cake[3]
                                                }).then(function () {
                                                    console.log("The notification has been set");
                                                });
                                            $cordovaLocalNotification.isScheduled(parseInt(cake[0])).then(function(isScheduled) {});  
                                            cordova.plugins.notification.local.on("click", function(notification) {
                                                localStorage.removeItem("id");
                                                localStorage.removeItem("data");
                                                var pass = notification.id + "/" + notification.data;
                                                $state.go("alarma",{id: pass});
                                            });
                                            cordova.plugins.notification.local.on("trigger", function(notification) {
                                                var pass = notification.id + "/" + notification.data;
                                                $state.go("alarma",{id: pass});
                                            });

            }
            $state.go('recordatorios');
        }        

    })