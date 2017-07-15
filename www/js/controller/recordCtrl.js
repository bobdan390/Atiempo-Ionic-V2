angular.module('atiempo.recordCtrl', ["ngCordova"])

    .controller('recordCtrl', function ($scope, $ionicLoading, $state, $stateParams, $filter, $ionicActionSheet, ionicDatePicker, loginServices, dataRegisServices, $cordovaSQLite, $cordovaLocalNotification) {

        var db = null;
        $scope.sin_sonido = false;
        $scope.con_sonido = true;
        $scope.desactivado = false;
        $scope.activado = true;

        $scope.$on("$ionicView.beforeEnter", function(event){

        var gg = $stateParams.id;

        $scope.id_ = gg;

        if (gg==0) {
            var d = new Date();

            if (d.getMonth()<10) {
                var mes = "0" + (d.getMonth()+1);
            }else{
                var mes = (d.getMonth()+1);
            }
            
            if (d.getHours()<10) {
                 var h_ = "0" + d.getHours().toString();
            }else{
                 var h_ = d.getHours().toString();
            }
            
            if (d.getMinutes()<10) {
                 var m_ = "0" + d.getMinutes().toString();
            }else{
                 var m_ = d.getMinutes().toString();
            }

            $scope.titulo = {value:''};
            $scope.fecha2 = {value:d.getFullYear() + "-" + mes + "-" + d.getDate()};
            $scope.fecha1 = {value: d.getFullYear() + "-" + mes + "-" + d.getDate()};
            $scope.hora = {value:h_};
            $scope.min = {value:m_};
            $scope.intervalo = {value:''};
            $scope.tipo = {value:''};
            $scope.sound = {value:true};
            $scope.status = {value:true};
            $scope.mensaje = {value:''};

        } else {
            if (window.cordova) {
                window.sqlitePlugin.openDatabase({name: 'my_.db', location: 'default'}, function(db) {

                    db.executeSql("SELECT * FROM alarms WHERE id='"+gg+"'", [], function (resultSet) {

                                            var obj = resultSet.rows.item(0);

                                            if (obj["sound"]=="true") {obj["sound"]=true}else{obj["sound"]=false};
                                            if (obj["status"]=="true") {obj["status"]=true}else{obj["status"]=false};               
                                            $scope.titulo = {value:obj["title"]};
                                            $scope.fecha2 = {value:obj["endDate"]};
                                            $scope.fecha1 = {value:obj["beginDate"]};
                                            var hour_min = obj["beginHour"].split(":");
                                            $scope.hora = {value:hour_min[0]};
                                            $scope.min = {value:hour_min[1]};
                                            $scope.intervalo = {value:obj["intervale"]};
                                            $scope.tipo = {value:obj["type"]};
                                            $scope.sound = {value:obj["sound"]};
                                            $scope.status = {value:obj["status"]};
                                            $scope.mensaje = {value:obj["message"]};

                                            if (obj["sound"]==true) {
                                                $scope.sin_sonido = false;
                                                $scope.con_sonido = true;
                                            } else {
                                                $scope.sin_sonido = true;
                                                $scope.con_sonido = false;
                                            }

                                            if (obj["status"]==true) {
                                                $scope.desactivado = false;
                                                $scope.activado = true;
                                            } else {
                                                $scope.desactivado = true;
                                                $scope.activado = false;
                                            }


                    }, function(error) {
                      console.log('SELECT error: ' + error.message);
                    });
                        
                });
            }else{
                db = window.openDatabase("my_.db", "1", "Test DB", 1000000);
                    
                    db.transaction(function(tx) {
                       tx.executeSql("SELECT * FROM alarms WHERE id='"+gg+"'", 
                                     [],
                                     function(tx, results)
                                     {
                                            var obj = results.rows.item(0); 
                                            //console.log(obj);     
                                            if (obj["sound"]=="true") {obj["sound"]=true}else{obj["sound"]=false};
                                            if (obj["status"]=="true") {obj["status"]=true}else{obj["status"]=false};               
                                            $scope.titulo = {value:obj["title"]};
                                            $scope.fecha2 = {value:obj["endDate"]};
                                            $scope.fecha1 = {value:obj["beginDate"]};
                                            $scope.hora = {value:obj["beginHour"]};
                                            $scope.intervalo = {value:obj["intervale"]};
                                            $scope.tipo = {value:obj["type"]};
                                            $scope.sound = {value:obj["sound"]};
                                            $scope.status = {value:obj["status"]};
                                            $scope.mensaje = {value:obj["message"]};

                                     },
                                     function(tx, error)
                                     { 
                                        console.log("Error: " + error);
                                     }
                       );
                    });
            }
        }
            
            $scope.showLoading(1000);

        });

        $scope.$on("$ionicView.enter", function(event){

            $scope.hideLoading();

        });

        $scope.back = function(){

            $state.go('recordatorios');

        }

        var ipObj1 = {
            callback: function (val) {  //Mandatory

                $scope.fecha1.value = $filter('date')(val, "yyyy-MM-dd");

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

        var ipObj2 = {
            callback: function (val) {  //Mandatory

                $scope.fecha2.value = $filter('date')(val, "yyyy-MM-dd");

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

        $scope.openDatePicker = function(item){
            if (item==1) {
                ionicDatePicker.openDatePicker(ipObj1);
            }else{
                ionicDatePicker.openDatePicker(ipObj2);
            }
            
        }

        $scope.change_status = function(){
            $scope.desactivado = !$scope.desactivado;
            $scope.activado = !$scope.activado;
        }

        $scope.change_sound = function(){
            $scope.sin_sonido = !$scope.sin_sonido;
            $scope.con_sonido = !$scope.con_sonido;
        }
        function savedExit(){
            $ionicActionSheet.show({
                                
                                titleText: 'Su tratamiento fue guardado con éxito',
                                buttons: [
                                    { text: 'Ok' },
                                ],
                                buttonClicked: function(index) {
                                    switch (index){
                                        case 0 :
                                            $state.go('recordatorios');
                                            return true;
                                    }
                                }

            }); 
        }

        function launchNotification(id_notificacion,sonido,titulo,mensaje,status,tipo,every_,fecha_inicio){
                //alert(id_notificacion);
                var file_sound = null;

                if (sonido==true) {
                        file_sound = "file://sounds/1.mp3";
                }
                var repeticion = (parseInt(every_) * 60) - 1;

                var item = $scope.id_;
                    if (item==0) {                        
                        if (status==true) {
                            var data_share = titulo + "/" + mensaje + "/" + tipo;
                            $cordovaLocalNotification.add({
                                id: id_notificacion,
                                firstAt: fecha_inicio,
                                text: 'Click - here',
                                title: mensaje,
                                sound: file_sound,
                                data: data_share
                            }).then(function () {
                                console.log("The notification has been set");
                            });
                            $cordovaLocalNotification.isScheduled(id_notificacion).then(function(isScheduled) {
                                    //alert("Notification 1234 Scheduled: " + isScheduled);
                            });
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
                    } else {
                        if (status==true) {
                            var data_share = titulo + "/" + mensaje + "/" + tipo;
                            $cordovaLocalNotification.update({
                                id: id_notificacion,
                                firstAt: fecha_inicio,
                                text: 'Click - here',
                                title: mensaje,
                                sound: file_sound,
                                data: data_share
                            }).then(function () {
                                console.log("The notification has been set");
                            });
                            //alert("update");                       
                        } else {
                            cordova.plugins.notification.local.cancel(id_notificacion, function() {
                                //alert("cancel");
                            });
                        }
                                            
                    }
        
        }


        $scope.guardar = function(){
            var titulo = $scope.titulo.value;
            var desde = $scope.fecha1.value;
            var hasta = $scope.fecha2.value;
            var hora = $scope.hora.value;
            var minutos = $scope.min.value;

            var intervalo = $scope.intervalo.value;
            var tip = $scope.tipo.value;
            var sonido = $scope.sound.value;
            var status = $scope.status.value;
            var mensaje = $scope.mensaje.value;
            
            var hora_ = hora + ":" + minutos;

            var alignFillDate = new Date(desde);
            var pickUpDate = new Date(hasta);

            if (alignFillDate >= pickUpDate) {
                $ionicActionSheet.show({
                        titleText: 'Fechas Invalidas!',
                        cancelText: 'Ok',
                        destructiveButtonClicked: function() {

                        }

                });
            }else{

                if (titulo=="" || desde=="" || hasta=="" || hora=="" || intervalo=="" || tip=="" || mensaje=="" || minutos=="") {
                        $ionicActionSheet.show({
                            titleText: 'Datos faltantes!',
                            cancelText: 'Ok',
                            destructiveButtonClicked: function() {

                            }

                        });
                    } else {

                    var item = $scope.id_;
                    if (item==0) {
                        var sql = "INSERT INTO alarms (title, beginDate, endDate, beginHour, intervale, type, sound, status, message) VALUES ('"+titulo+"','"+desde+"','"+hasta+"','"+hora_+"','"+intervalo+"','"+tip+"','"+sonido+"','"+status+"','"+mensaje+"')";
                    } else {
                        var sql = "UPDATE alarms SET title='"+titulo+"', beginDate='"+desde+"', endDate='"+hasta+"', beginHour='"+hora_+"', intervale='"+intervalo+"', type='"+tip+"', sound='"+sonido+"', status='"+status+"', message='"+mensaje+"' WHERE id = '"+item+"'";
                    }

                    var query1 = "CREATE TABLE IF NOT EXISTS alarms (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, beginDate TEXT, endDate TEXT, beginHour TEXT, intervale TEXT, type TEXT, sound BOOLEAN, status BOOLEAN, message TEXT)"
                            
                    if (window.cordova) {
                    //device
                        //NOTIFICATIONS

                        window.sqlitePlugin.openDatabase({name: 'my_.db', location: 'default'}, function(db) {

                            db.executeSql(query1, [], function (resultSet) {}, function(error) {
                                  console.log('SELECT error: ' + error.message);
                            });
                            
                            db.executeSql(sql, [], function (resultSet) {
                                if (item==0) {
                                    var lastInsert = resultSet.insertId; 
                                } else { 
                                    var lastInsert = item;
                                }
                                var date_ = new Date();
                                var fCake = desde.split("-");
                                var m = parseInt(fCake[1])-1;
                                date_.setFullYear(fCake[0], m , fCake[2]);
                                date_.setHours(parseInt(hora));
                                if (minutos=="00") {
                                    date_.setMinutes(parseInt(minutos));
                                } else {
                                    date_.setMinutes((parseInt(minutos)-1));
                                }
                                

                                launchNotification(lastInsert,sonido,titulo,mensaje,status,tip,parseInt(intervalo),date_);
                                savedExit(); 
                            });



                        });
                        
                    }else{
                            var date_ = new Date();
                            var fCake = desde.split("-");
                            
                            var m = parseInt(fCake[1])-1;
                            date_.setFullYear(fCake[0], m , fCake[2]);
                            date_.setHours(parseInt(hora));
                            date_.setMinutes(parseInt(minutos));

                            

                            db = window.openDatabase("my_.db", "1", "Test DB", 1000000);
                            db.transaction(function(tx) {
                              tx.executeSql(query1);

                              tx.executeSql(sql,[],function(tx, results){
                                    console.log(results.insertId);
                                },function(error) {
                                console.log(error);
                                }, function() {
                                    savedExit();   
                                });
   

                            }, function(error) {
                                console.log(error);
                            }, function() {
                                savedExit();   
                            });  


                    }

                }//END ELSE OF if (titulo=="" || 
            
            
          }

        }//$scope.guardar = function(){

    })