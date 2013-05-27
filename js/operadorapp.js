var api_url = './api/v1';
var nombre_plist = 'js/companies-color.plist';
var listado_de_operadoras  = new Array();

window.onload = function() {
	colocarLosLateralesDeLaCabecera();
	colocarElContenidoBajoLaCabecera();
}

window.onorientationchange = function(){
	colocarLosLateralesDeLaCabecera();
	colocarElContenidoBajoLaCabecera();
}

window.onresize = function(event) {
	colocarLosLateralesDeLaCabecera();
	colocarElContenidoBajoLaCabecera();
}

function colocarLosLateralesDeLaCabecera(){
	$("#cabecera").css("height", $("#cabecera_centro").css("height"));
}

function colocarElContenidoBajoLaCabecera(){
	$("#cuerpo").css("padding-top", $("#cabecera_centro").css("height"));
}

$(document).ready(function() {
	mostrarCamposIniciales();

  $("#boton_siguiente").click(comprobarOperadora);
  $("#boton_anterior").click(mostrarCamposIniciales);

  cargarOperadoras();
 	reloadCaptcha();
});

function reloadCaptcha(){
	$.getJSON(api_url, function(data) {
		captcha_url = data['captcha_url'];
		$('#captcha').html('<img src="' + captcha_url + '" alt="captcha" />');
		$("#captcha_str").val('');
	});
};

function buscarLaCompanhiaEnElXML(nombre_de_la_companhia){
    return $.grep(listado_de_operadoras, function(item){
      return item.nombre == nombre_de_la_companhia;
    });
};

function comprobarOperadora() {
	var hay_telefono = comprobarSiHaRellenadoElNumeroDeTelefono();
	var hay_captcha =  comprobarSiHaRellenadoElCaptcha();
	
	if(hay_telefono && hay_captcha){
		$.blockUI({ message: '<h1>Su petición se está procesando...</h1>' });
		$.post(api_url, {
			"captcha_str" : $("#captcha_str").val(),
			"mobile" : $("#mobile").val()
		}, function(data){
			if (data.errors){
				alert(data.errors);
			}else{
				mostrarResultado($("#mobile").val(), data.result.company);
			}
			reloadCaptcha();
			$.unblockUI();
		}, "json");		
	}
};

function comprobarSiHaRellenadoElNumeroDeTelefono() {
	var telefono = $("#mobile").val();
	var hay_telefono = false;
	if(!telefono){
		alert('Debe rellenar el número de teléfono que quiere comprobar.');
	}else{
		hay_telefono = true;
	}
	return hay_telefono;
};

function comprobarSiHaRellenadoElCaptcha() {
	var captcha = $("#captcha_str").val();
	var hay_captcha = false;
	if(!captcha){
		alert('Debe rellenar el captcha.');
	}else{
		hay_captcha = true;
	}
	return hay_captcha;
};

function mostrarCamposIniciales() {		
	$("#div_resultado_numero_telefono").css("display", "none");
	$("#div_resultado_compania").css("display", "none");
	$("#boton_anterior").css("display", "none");

	$("#mobile").val("");
	$("#div_numero_telefono").css("display", "block");
	
	$("#captcha_str").val("");
	$("#div_captcha").css("display", "block");
	
	$("#boton_siguiente").css("display", "block");
	
	$("html, body").animate({ scrollTop: 0 }, "slow");
};

function mostrarResultado(telefono, cadena_companhia) {	
	fijarElNumeroDeTelefonoParaLlamar(telefono);
	fijarElDegradadoDeLaCompanhia(cadena_companhia);

	$("#div_numero_telefono").css("display", "none");
	$("#div_captcha").css("display", "none");
	$("#boton_siguiente").css("display", "none");
	$("#div_resultado_compania").css("display", "block");
	$("#boton_anterior").css("display", "block");	
	$("html, body").animate({ scrollTop: 0 }, "slow");
};

function fijarElNumeroDeTelefonoParaLlamar(telefono) {
	$("#div_resultado_numero_telefono > input").val(telefono);
	$("#div_resultado_numero_telefono > input").attr("onClick","window.location.href='tel:" + telefono + "'");
	$("#div_resultado_numero_telefono").css("display", "block");	
};

function fijarElDegradadoDeLaCompanhia(cadena_companhia) {
	var color_superior = "868382";
	var color_inferior = "d0cccb";
	var nombre_de_la_companhia = cadena_companhia;

	var companhia = buscarLaCompanhiaEnElXML(cadena_companhia.trim())[0];
	if(companhia==null){
		companhia = buscarLaCompanhiaEnElXML("Default")[0];
	}		
	if(companhia != null){
		nombre_de_la_companhia = companhia.nombre_a_mostrar;
		color_superior = companhia.color_superior;
		color_inferior = companhia.color_inferior;
	}
	$("#company").val(nombre_de_la_companhia);

  if (navigator.appName=="Microsoft Internet Explorer") {
		$('#company').css({ background: '#' + color_superior });
  }else{
		var degradado_webkit = "-webkit-linear-gradient(top, #"+ color_superior +" 50%, #"+ color_inferior +" 50%)";
		var degradado_webkit_base = "-webkit-gradient(linear, left top, left bottom, color-stop(0.5, #"+ color_superior +" ),color-stop(0.5, #"+ color_inferior +" ))";
		var degradado_ms = "-ms-linear-gradient(top, #"+ color_superior +" 50%, #"+ color_inferior +" 50%)";
		var degradado_o = "-o-linear-gradient(top, #"+ color_superior +" 50%, #"+ color_inferior +" 50%)";
		var degradado_mozilla    = "-moz-linear-gradient(top, #" + color_superior + " 50%, #"+ color_inferior + " 50%)";
		var degradado_base = "linear-gradient(top, #"+ color_superior +" 50%, #"+ color_inferior +" 50%)";
		
		$('#company')
			.css({ background: degradado_webkit })
			.css({ background: degradado_webkit_base })
			.css({ background: degradado_ms })
			.css({ background: degradado_o })
			.css({ background: degradado_mozilla })
			.css({ background: degradado_base });  	
  }
};

function cargarOperadoras() {
	$.ajax({
		type: "GET",
		url: nombre_plist,
		dataType: "xml",
		success: function(plist) {
			var companhia_en_proceso = false;
			var cadenas_en_proceso = false;
	
			var nombre_de_la_companhia = '';
			var color_inferior = '';
			var color_superior = '';
			
			$(plist).find("key").each(function () {
				
				if(!companhia_en_proceso){
					companhia_en_proceso = true;
					cadenas_en_proceso = false;
					
					color_inferior = '';
					color_superior = '';
					
					nombre_de_la_companhia =  $(this).text();
				}else{
					var etiqueta = $(this).text();
					var posicion = $(this).index();
					
					if(etiqueta == 'bottom'){
						color_inferior =  $(this).parent().find("string").eq(posicion/2).text();
					}else if(etiqueta == 'top'){
						color_superior =  $(this).parent().find("string").eq(posicion/2).text();
						var listado = $(this).parent().find("array");
						if(listado.length == 0){
							companhia_en_proceso = false;
							finalizarCompanhia(nombre_de_la_companhia, color_inferior, color_superior, null);
						}							
					}else if(etiqueta == 'strings'){
						var cadenas = new Array();
						cadenas_en_proceso = true;
						var numero_de_cadenas = 0;
						$(this).parent().find("array").first().find("string").each(function () {
								cadenas[numero_de_cadenas] = $(this).text();
								numero_de_cadenas =  numero_de_cadenas + 1;
						});
						companhia_en_proceso = false;
						finalizarCompanhia(nombre_de_la_companhia, color_inferior, color_superior, cadenas);
					}
				}
			});
		}
	});
};

function finalizarCompanhia(nombre_de_la_companhia, color_inferior, color_superior, cadenas){
	listado_de_operadoras[listado_de_operadoras.length] = {nombre: nombre_de_la_companhia, nombre_a_mostrar:nombre_de_la_companhia, color_superior: color_superior,  color_inferior: color_inferior};
	if(cadenas != null && cadenas.length > 0){
	  for (i=0;i<cadenas.length;i++){
	  	listado_de_operadoras[listado_de_operadoras.length] = {nombre: cadenas[i], nombre_a_mostrar:nombre_de_la_companhia, color_superior: color_superior,  color_inferior: color_inferior};
		}
	}
};