var api_url = './api/v2';

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

 	reloadCaptcha();
});

function reloadCaptcha(){
	$.getJSON(api_url, function(data) {
		captcha_url = data['captcha_url'];
		$('#captcha').html('<img src="' + captcha_url + '" alt="captcha" />');
		$("#captcha_str").val('');
	});
};

function comprobarOperadora() {
	var hay_telefono = comprobarSiHaRellenadoElNumeroDeTelefono();
	var hay_captcha =  comprobarSiHaRellenadoElCaptcha();
	
	if(hay_telefono && hay_captcha){
		$.blockUI({ message: '<h1>Su petición se está procesando...</h1>' });
		$.post(api_url, {
			"captcha_str" : $("#captcha_str").val(),
			"platform" : "web",
			"telephone" : $("#mobile").val()
		}, function(data){
			if (data.errors){
				alert(data.errors);
			}else{
				mostrarResultado($("#mobile").val(), data.result.company, data.result.topColor, data.result.bottomColor);
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

function mostrarResultado(telefono, cadena_companhia, colorSuperior, colorInferior) {	
	fijarElNumeroDeTelefonoParaLlamar(telefono);
	fijarElDegradadoDeLaCompanhia(cadena_companhia, colorSuperior, colorInferior);

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

function fijarElDegradadoDeLaCompanhia(cadena_companhia, colorSuperior, colorInferior) {
	$("#company").val(cadena_companhia);
	
	if (navigator.appName=="Microsoft Internet Explorer") {
		$('#company').css({ background: colorSuperior });
  }else{
		var degradado_webkit = "-webkit-linear-gradient(top, " + colorSuperior + " 50%, "+ colorInferior +" 50%)";
		var degradado_webkit_base = "-webkit-gradient(linear, left top, left bottom, color-stop(0.5, " + colorSuperior +" ),color-stop(0.5, "+ colorInferior +" ))";
		var degradado_ms = "-ms-linear-gradient(top, "+ colorSuperior +" 50%, " + colorInferior +" 50%)";
		var degradado_o = "-o-linear-gradient(top, "+ colorSuperior +" 50%, " + colorInferior +" 50%)";
		var degradado_mozilla    = "-moz-linear-gradient(top, " + colorSuperior + " 50%, " + colorInferior + " 50%)";
		var degradado_base = "linear-gradient(top, "+ colorSuperior +" 50%, " + colorInferior +" 50%)";
		
		$('#company')
			.css({ background: degradado_webkit })
			.css({ background: degradado_webkit_base })
			.css({ background: degradado_ms })
			.css({ background: degradado_o })
			.css({ background: degradado_mozilla })
			.css({ background: degradado_base });
  }
};