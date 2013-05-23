<!DOCTYPE html>
<html>
	<head>
		<meta charset=utf-8>
		<title>Operadorapp</title>
		<meta content="width=device-width, initial-scale=1, maximum-scale=1" name="viewport">
		<meta content="Descubre de qué operador es un número de teléfono móvil en España. ¡Gratis!" name="description">
		<meta name="author" content="Tactilapp">
		<link href="img/favicon.png" rel="shortcut icon">
		
		<!--[if lt IE 9]>
			<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		<script type="text/javascript">
		    less = { 
		        env: "development", // or "production"
		        async: true,       // load imports async
		        fileAsync: false,   // load imports async when in a page under
		                            // a file protocol
		        poll: 1000,         // when in watch mode, time in ms between polls
		        functions: {},      // user functions, keyed by name
		        dumpLineNumbers: "comments", // or "mediaquery" or "all"
		        relativeUrls: false,// whether to adjust url's to be relative
		    };
		</script>
		<link rel="stylesheet/less" type="text/css" href="css/style.less" />

		<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="js/less-1.3.3.min.js"></script>
		<script type="text/javascript" src="js/operadorapp.js"></script>
	</head>

	<body>
	
		<div id="cabecera">
		    <div class="lado"></div>
		    <div class="centro"></div>
		    <div class="lado"></div>
		</div>
	
		<form method="POST" id="cuerpo">
			<div id="div_numero_telefono">
				<h1>Introduce el número de teléfono</h1>
				<input type="text" id="mobile" name="mobile" >
			</div>

			<div id="div_captcha">
				<h1>Escribe el captcha</h1>
				<div id="captcha"></div>

				<img id="recargar" onclick="javascript:reloadCaptcha()" src="img/ic_refresh.png" alt="Recargar">
				<input type="text" id="captcha_str" name="captcha_str" >
			</div>

			<div id="boton_siguiente" class="div_boton">
				<h1>Enviar número <img src="img/ic_down.png"></h1>
			</div>

			<div id="div_resultado_numero_telefono">
				<h1>Tu número de teléfono es</h1>
				<input type="text" onclick="window.location.href='tel:626123456'" onfocus="this.blur()" readonly="readonly" id="numero" name="numero" >
			</div>

			<div id="div_resultado_compania">
				<h1>Pertenece a la compañía</h1>
				<input type="text" onfocus="this.blur()" readonly="readonly" id="company" name="company" >
			</div>

			<div id="boton_anterior" class="div_boton">
				<h1>Buscar otro numero número <img src="img/ic_up.png"></h1>
			</div>
		</form>

		<img id="logotipo" src="img/img_tactilapp.png" alt="logotipo">

	</body>
</html>