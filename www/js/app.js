// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var atiempo = angular.module('atiempo', ['ionic',
    'ion-autocomplete',
    'ionic-datepicker',
    'angular-jwt',
    'angular-storage',
    'atiempo.directives',
    'atiempo.services',
    'atiempo.appController',
    'atiempo.homeCtrl',
    'atiempo.contacCtrl',
    'atiempo.loginCtrl',
    'atiempo.directoryCtrl',
    'atiempo.listCitasCtrl',
    'atiempo.contractCitasCtrl',
    'atiempo.citasCtrl',
    'atiempo.claveCitasCtrl',
    'atiempo.documentsCtrl',
    'atiempo.lockDocCtrl',
    'atiempo.farmaciaCtrl',
    'atiempo.viajesCtrl',
    'atiempo.solictViajeCtrl',
    'atiempo.datosViajeCtrl',
    'atiempo.genViageCtrl',
    'atiempo.homeUserCtrl',
    'atiempo.regisCtrl',
    'atiempo.verRegisCtrl',
    'atiempo.recordCtrl',
    'atiempo.listRecordCtrl',
    'atiempo.alarmaCtrl',
    'atiempo.webViewCtrl',
    'ngCordova',

  ])

atiempo.run(function($ionicPlatform, $cordovaLocalNotification) {
  $ionicPlatform.ready(function() {

    if(device.platform === "iOS") {
        window.plugin.notification.local.promptForPermission();
    }

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);


    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }



  });

})


atiempo.config(function($stateProvider,$urlRouterProvider, ionicDatePickerProvider, $httpProvider, jwtInterceptorProvider) {

  //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

  jwtInterceptorProvider.tokenGetter =  function(viajesServices) {

    return localStorage.getItem('token');

  };

  //$httpProvider.interceptors.push('jwtInterceptor');

  var datePickerObj = {
    inputDate: new Date(),
    titleLabel: 'Seleccione la Fecha',
    setLabel: 'Aceptar',
    todayLabel: 'Hoy',
    closeLabel: 'Cerrar',
    mondayFirst: false,
    weeksList: ["DO", "LU", "MA", "MI", "JU", "VI", "SA"],
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    templateType: 'popup',
    //from: new Date(2012, 8, 1),
    //to: new Date(2018, 8, 1),
    showTodayButton: true,
    dateFormat: 'dd MMMM yyyy',
    closeOnSelect: false,
    disableWeekdays: []
  };
  ionicDatePickerProvider.configDatePicker(datePickerObj);

  $stateProvider

  /*.state('app', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })*/
  .state('app', {
    url: '/preHome',
    templateUrl: 'templates/preHome.html',
    controller: 'homeCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('verificar', {
    url: '/verificar',
    templateUrl: 'templates/verificarRegistro.html',
    controller: 'verRegisCtrl'
  })

  .state('registro', {
    url: '/registro',
    templateUrl: 'templates/registro.html',
    controller: 'regisCtrl'
  })

  .state('logged', {
    url: '/home-user',
    templateUrl: 'templates/home-logged.html',
    controller: 'homeUserCtrl'

  })

  .state('contact', {
    url: '/contact',
    templateUrl: 'templates/contact.html',
    controller: 'contacCtrl'
  })

  .state('directory', {
    url: '/directory',
    templateUrl: 'templates/directory.html',
    controller: 'directoryCtrl'
  })

  .state('avi', {
    url: '/avi',
    templateUrl: 'templates/avi.html',
    controller: 'viajesCtrl'
  })

  .state('solicitar-viaje', {
    url: '/solicitar-viaje',
    templateUrl: 'templates/solicitarViaje.html',
    controller: 'solictViajeCtrl'
  })

  .state('datos-viaje', {
    url: '/datos-viaje',
    templateUrl: 'templates/datosViaje.html',
    controller: 'datosViajeCtrl'
  })

  .state('enviar-avi', {
    url: '/enviar-avi',
    templateUrl: 'templates/enviarAvi.html',
    controller: 'genViageCtrl'
  })

  .state('appointments', {
    url: '/appointments',
    templateUrl: 'templates/appointments.html',
    controller: 'listCitasCtrl'
  })

  .state('solicitud-citas', {
    url: '/solicitud-de-citas',
    templateUrl: 'templates/solicitarCitas.html',
    controller: 'contractCitasCtrl'
  })

  .state('datos-cita', {
    url: '/datos-de-cita',
    templateUrl: 'templates/datosCita.html',
    controller: 'citasCtrl'
  })

  .state('clave-cita', {
    url: '/clave-de-cita',
    templateUrl: 'templates/claveCita.html',
    controller: 'claveCitasCtrl'
  })

  .state('documents', {
    url: '/documents',
    templateUrl: 'templates/documents.html',
    controller: 'documentsCtrl'
  })

  .state('lock-documents', {
    url: '/lock-documents',
    templateUrl: 'templates/lockDocuments.html',
    controller: 'lockDocCtrl'
  })

  .state('farmacia', {
    url: '/farmacy',
    templateUrl: 'templates/farmacy.html',
    controller: 'farmaciaCtrl'
  })

  .state('solicitud-medicina', {
    url: '/solicitud-medicina',
    templateUrl: 'templates/solicitudMedicina.html',
    controller: 'farmaciaCtrl'
  })

  .state('datos-medicina', {
    url: '/datos-medicina',
    templateUrl: 'templates/datosMedicina.html',
    controller: 'farmaciaCtrl'
  })

  .state('enviar-medicina', {
    url: '/enviar-medicina',
    templateUrl: 'templates/enviarMedic.html',
    controller: 'farmaciaCtrl'
  })

  .state('recordatorios', {
    url: '/recordatorios',
    templateUrl: 'templates/recordatorios.html',
    controller: 'listRecordCtrl'
  })

  .state('alarma', {
    url: '/alarma/:id',
    templateUrl: 'templates/alarma.html',
    controller: 'alarmaCtrl'
  })

  .state('webview', {
    url: '/webview',
    templateUrl: 'templates/webview.html',
    controller: 'webViewCtrl'
  })

  .state('config-recordatorio', {
    url: '/config-recordatorio/:id',
    templateUrl: 'templates/configRecordatorio.html',
    controller: 'recordCtrl'
  });
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/login');
  //$urlRouterProvider.otherwise('/logged');
  $urlRouterProvider.otherwise('/preHome');
});

atiempo.constant('constantes', {
  //'api_url' : 'http://127.0.0.1:80/Atiempo-api/api-rest',
  'api_url' : 'http://35.166.131.103/Atiempo-api/api-rest',
});

atiempo.filter('sumByKey', function() {
  return function(data, key) {
    if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
      return 0;
    }

    var sum = 0;
    for (var i = data.length - 1; i >= 0; i--) {
      sum += parseFloat(data[i][key]);
    }
    return sum;
  };
});

atiempo.filter('trustAsResourceUrl', function($sce) {
  return function(val) {
      return $sce.trustAsResourceUrl(val);
  };
});