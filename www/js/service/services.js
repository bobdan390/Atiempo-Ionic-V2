angular.module('atiempo.services', ["ngCordova"])

atiempo.service('authServices', function (store, jwtHelper) {

	//this.auth = jwtHelper.decodeToken(store.get("token")) ? jwtHelper.decodeToken(store.get("token")) : null;
	this.auth;

})

atiempo.service('fechasEspServices', function ($filter) {

	this.fecha = function(data){
		var mes = '';
		switch(data){
			case '01':
				mes = "Enero";
				break;

			case  '02':
				mes = "Febrero";
				break;

			case '03':
				mes = "Marzo";
				break;

			case '04':
				mes = "Abril";
				break;

			case '05':
				mes = "Mayo";
				break;

			case '06':
				mes = "Junio";
				break;

			case '07':
				mes = "Julio";
				break;

			case '08':
				mes = "Agosto";
				break;

			case '09':
				mes = "Septiembre";
				break;

			case '10':
				mes = "Octubre";
				break;

			case '11':
				mes = "November";
				break;

			case '12':
				mes = "Diciembre";
				break;

		}

		return mes;

	}

})

atiempo.service('dataContraServices', function () {

	this.data;

	this.dataCitas;

	this.claveGen;

	this.genViaje;

})

atiempo.service('dataRegisServices', function () {

	this.data;

})

atiempo.service('loginServices', function ($http, $q, constantes){

	var path_login = constantes.api_url+"/user-login";//API path
	var path_logauth = constantes.api_url+"/user-logaout";//API path
	var path_registro = constantes.api_url+"/user-add";//API path
	var path_verificar = constantes.api_url+"/user-verificar";//API path


	this.login = function(data){

		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("usuario", angular.lowercase(data.username.$viewValue));
		formData.append("password", data.password.$viewValue);
		return $http.post(path_login, formData,{
			headers: {
					"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function(res)
		{	
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
			
		})
		

		return deferred.promise;
	}

	this.cerrarSesion = function(){
		var deferred = $q.defer();
		return $http.get(path_logauth,{
			headers: {
					"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function(res)
		{
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
		})

		return deferred.promise;
	}

	this.verif = function(data){
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("cedula", data.cedula.$viewValue);
		formData.append("fecha", data.fecha.$viewValue);
		return $http.post(path_verificar, formData,{
			headers: {
					"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function(res)
		{
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
		})

		return deferred.promise;
	}

	this.registro = function(data){
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("user", angular.lowercase(data.usuario.$viewValue));
		formData.append("email", data.email.$viewValue);
		formData.append("name", angular.lowercase(data.nombre.$viewValue));
		formData.append("password", data.clave.$viewValue);
		formData.append("repClave", data.repClave.$viewValue);
		return $http.post(path_registro, formData,{
			headers: {
					"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function(res)
		{
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
		})

		return deferred.promise;
	}

})

atiempo.service('docsServices', function ($http, $q, constantes){

	var path_list_docs = constantes.api_url+"/docs-list";//API path

	this.listarDocs = function(){
		var deferred = $q.defer();
		return $http.get(path_list_docs, {
			headers: {
					"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function(res)
		{
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
		})

		return deferred.promise;
	}

})

atiempo.service('estadosServices', function ($http, $q, constantes){

	var path_list_all = constantes.api_url+"/estados-list";//API path

	this.listarEstados = function(){
		var deferred = $q.defer();
		return $http.get(path_list_all, {
			headers: {
					"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function(res)
		{
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
		})

		return deferred.promise;
	}

})

atiempo.service('tipoServicioServices', function ($http, $q, constantes){

	var path_all = constantes.api_url+"/list-tipo-servicio";//API path

	this.allServ = function(token){
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("token", token);
		return $http.post(path_all, formData,{
			headers: {
					"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function(res)
		{
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
		})

		return deferred.promise;
	}

})

atiempo.service('proMedicoServices', function ($http, $q, constantes){

	var path_list = constantes.api_url+"/procedimientos-medicos-list";//API path
	var path_serv_monto = constantes.api_url+"/serv-monto";//API path

	this.listarProMedico = function(serv, espec, token){
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("serv", serv);
		formData.append("espec", espec);
		formData.append("token", token);
		return $http.post(path_list, formData, {
			headers: {
					"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function(res)
		{
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
		})

		return deferred.promise;
	}

	this.montoServ = function(idProc, idProv, token){
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("idProc", idProc);
		formData.append("idProv", idProv);
		formData.append("token", token);
		return $http.post(path_serv_monto, formData, {
			headers: {
					"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function(res)
		{
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
		})

		return deferred.promise;
	}

})

atiempo.service('especialidadesServices', function ($http, $q, constantes){

	var path_list = constantes.api_url+"/especialidades-list";//API path
	var path_all = constantes.api_url+"/especialidades-all";//API path
	var path_all_serv_and_espc = constantes.api_url+"/especialidades-and-serv-all";//API path

	this.allEspec = function(token){
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("token", token);
		return $http.post(path_all, formData,{
			headers: {
					"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function(res)
		{
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
		})

		return deferred.promise;
	}

	this.allEspecAndServ = function(token){
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("token", token);
		return $http.post(path_all_serv_and_espc, formData,{
			headers: {
					"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function(res)
		{
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
		})

		return deferred.promise;
	}

	this.listarEspec = function(acrDesc){
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("acrDesc", acrDesc);
		return $http.post(path_list, formData, {
			headers: {
					"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function(res)
		{
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
		})

		return deferred.promise;
	}

})

atiempo.service('profesionalesServices', function ($http, $q, constantes){

	var path_list_ciudades = constantes.api_url+"/ciudades-list";//API path
	var path_list_profesionales = constantes.api_url+"/profesionales-list";//API path

	this.listarCiudades = function(data){
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("idEstado", data.estado);
		formData.append("ramo", data.tipoAtencion);
		formData.append("idEsp", data.especialidad);
		return $http.post(path_list_ciudades, formData, {
			headers: {
					"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function(res)
		{
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
		})

		return deferred.promise;
	}

	this.listProf = function(data){
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("ciudad", data);
		return $http.post(path_list_profesionales, formData, {
			headers: {
					"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function(res)
		{
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
		})

		return deferred.promise;
	}

})

.service('clinicaServices', function ($http, $q, constantes){ //declaramos la factory

	var path_list_clinica = constantes.api_url+"/list-clinicas";//API path
	var path_gen_clave = constantes.api_url+"/generar-claves";//API path

	this.listNombres = function(val, token){
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("val", val ? val : '');
		formData.append("token", token);
		return $http.post(path_list_clinica, formData,{
					headers: {
						"Content-type": undefined
					},
					transformRequest: angular.identity
				})
				.success(function(res)
				{
					deferred.resolve(res);
				})
				.error(function(msg, code)
				{
					deferred.reject(msg);
				})
		return deferred.promise;
	}

	this.genClav = function(obj, token){
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("obj", JSON.stringify(obj) ? JSON.stringify(obj) : '');
		formData.append("token", token);
		return $http.post(path_gen_clave, formData,{
					headers: {
						"Content-type": undefined
					},
					transformRequest: angular.identity
				})
				.success(function(res)
				{
					deferred.resolve(res);
				})
				.error(function(msg, code)
				{
					deferred.reject(msg);
				})
		return deferred.promise;
	}

})

atiempo.service('citasServices', function ($http, $q, constantes){

	var path_list_citas = constantes.api_url+"/citas-list";//API path

	this.listarCitas = function(data){
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("cedula", data);
		return $http.post(path_list_citas, formData,{
					headers: {
						"Content-type": undefined
					},
					transformRequest: angular.identity
				})
				.success(function(res)
				{
					deferred.resolve(res);
				})
				.error(function(msg, code)
				{
					deferred.reject(msg);
				})

		return deferred.promise;
	}

})

atiempo.service('viajesServices', function ($http, $q, constantes){

	var path_list_viajes = constantes.api_url+"/viajes-list";//API path
	var path_list_genViaje = constantes.api_url+"/generar-viaje";//API path

	this.listarViajes = function(token){
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("token", token);
		return $http.post(path_list_viajes, formData,{
					headers: {
						"Content-type": undefined
					},
					transformRequest: angular.identity
				})
				.success(function(res)
				{
					deferred.resolve(res);
				})
				.error(function(msg, code)
				{
					deferred.reject(msg);
				})

		return deferred.promise;

	}

	this.genViaje = function(data, token){
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("afiliado", data.afiliado);
		formData.append("viajes", JSON.stringify(data.viajes));
		formData.append("observ", data.observ);
		formData.append("cronograma", data.cronograma);
		formData.append("contrato", JSON.stringify(data.contrato));
		formData.append("token", token);
		return $http.post(path_list_genViaje, formData,{
					headers: {
						"Content-type": undefined
					},
					transformRequest: angular.identity
				})
				.success(function(res)
				{
					deferred.resolve(res);
				})
				.error(function(msg, code)
				{
					deferred.reject(msg);
				})

		return deferred.promise;

	}

})

atiempo.service('paisServices', function ($http, $q, constantes){

	var path_list_paises = constantes.api_url+"/pais-list";//API path

	this.listarPaises = function(){
		var deferred = $q.defer();
		return $http.get(path_list_paises,{
					headers: {
						"Content-type": undefined
					},
					transformRequest: angular.identity
				})
				.success(function(res)
				{
					deferred.resolve(res);
				})
				.error(function(msg, code)
				{
					deferred.reject(msg);
				})

		return deferred.promise;
	}

})

