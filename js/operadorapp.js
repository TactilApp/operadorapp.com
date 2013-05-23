var api_url = './api/v1';
var listado_de_operadoras  = new Array();

$(document).ready(function() {
	$("#div_resultado_numero_telefono").css("display", "none");
	$("#div_resultado_compania").css("display", "none");
	$("#boton_anterior").css("display", "none");
		 
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
}

function cargarOperadoras() {
	$.ajax({
		type: "GET",
		url: "js/companies-color.plist",
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
	listado_de_operadoras[listado_de_operadoras.length] = {nombre: nombre_de_la_companhia, color_superior: color_superior,  color_inferior: color_inferior};
	if(cadenas != null && cadenas.length > 0){
	  for (i=0;i<cadenas.length;i++){
	  	listado_de_operadoras[listado_de_operadoras.length] = {nombre: cadenas[i], color_superior: color_superior,  color_inferior: color_inferior};
		}
	}
}

function buscarLaCompanhiaEnElXML(nombre_de_la_companhia){
    return $.grep(listado_de_operadoras, function(item){
      return item.nombre == nombre_de_la_companhia;
    });
};

function comprobarOperadora() {
	telefono = $("#mobile").val();
	hay_telefono = false;
	if(!telefono){
		alert('Debe rellenar el número de teléfono que quiere comprobar.');
	}else{
		hay_telefono = true;
	}

	captcha = $("#captcha_str").val();
	hay_captcha = false;
	if(!captcha){
		alert('Debe rellenar el captcha.');
	}else{
		hay_captcha = true;
	}
	
	if(hay_telefono && hay_captcha){
		$.post(api_url, {
			"captcha_str" : captcha,
			"mobile" : telefono
		}, function(data){
			if (data.errors){
				alert(data.errors);
			}else{
				mostrarResultado(telefono, data.result.company);
			}
			reloadCaptcha();
		}, "json");		
	}
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

function mostrarResultado(telefono, resultado) {
	$("#div_numero_telefono").css("display", "none");
	$("#div_captcha").css("display", "none");
	$("#boton_siguiente").css("display", "none");
	
	$("#div_resultado_numero_telefono > input").val(telefono);
	$("#div_resultado_numero_telefono > input").attr("onClick","window.location.href='tel:" + telefono + "'");
	$("#div_resultado_numero_telefono").css("display", "block");
	
	$("#company").val(resultado);

	var color_superior = "868382";
	var color_inferior = "d0cccb";

	var companhia = buscarLaCompanhiaEnElXML(resultado)[0];
	if(companhia==null){
		companhia = buscarLaCompanhiaEnElXML("Default")[0];
	}		
	if(companhia != null){
		color_superior = companhia.color_superior;
		color_inferior = companhia.color_inferior;
	}
	
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


	
	$("#div_resultado_compania").css("display", "block");

	$("#boton_anterior").css("display", "block");
	
	$("html, body").animate({ scrollTop: 0 }, "slow");
};