<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<meta charset=utf-8>
		<title>Operadorapp</title>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
		<meta name="description" content="Descubre de qué operador es un número de teléfono móvil en España. ¡Gratis!"/>
		<link rel="shortcut icon" href="img/favicon.png" />
		<meta name="author" content="Tactilapp">
		
		<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.8.1/build/cssreset/cssreset-min.css" />

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

		<script type="text/javascript" src="js/less-1.3.3.min.js"></script>
	</head>

	<body>

		<div id="cabecera">
		    <div id="cabecera_lado_izquierdo"></div>
		    <div id="cabecera_centro"><img width="100%" src="img/bg_header.png"></div>
		    <div id="cabecera_lado_derecho"></div>
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
				<input type="text" onfocus="this.blur()" readonly="readonly" id="numero" name="numero" >
			</div>

			<div id="div_resultado_compania">
				<h1>Pertenece a la compañía</h1>
				<input type="text" onfocus="this.blur()" readonly="readonly" id="company" name="company" >
			</div>

			<div id="boton_anterior" class="div_boton">
				<h1>Buscar otro número <img src="img/ic_up.png"></h1>
			</div>
		</form>

		<div id="download">
			<a href="http://appstore.com/operadorapp"><img src="img/appstore.png" alt="App Store" /></a>
			<a href="http://play.google.com/store/apps/details?id=com.tactilapp.operadorapp"><img src="img/googleplay.png" alt="Google Play" /></a>
		</div>

		<a id="logotipo" href="http://www.tactilapp.com"><img src="img/img_tactilapp.png" alt="Tactilapp" /></a>

		<script type="text/javascript" src="js/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="js/jquery.blockUI.js"></script>
		<script type="text/javascript" src="js/underscore-min.js"></script>
		<script type="text/javascript" src="js/operadorapp.js"></script>

		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		
		  ga('create', 'UA-40834928-1', 'operadorapp.com');
		  ga('send', 'pageview');
		</script>
	</body>
</html>