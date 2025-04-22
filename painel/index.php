<?php

use Source\Painel\Autenticacao;

// ini_set('display_errors',1);
// ini_set('display_startup_erros',1);
// error_reporting(E_ALL);

require "../vendor/autoload.php";
$login = new Autenticacao(true);
$login->logarAdm();

?>
<!doctype html>
<html lang="pt-BR">

<head>
<title>Login - Painel</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="Iconic Bootstrap 4.5.0 Admin Template">
<meta name="author" content="WrapTheme, design by: ThemeMakker.com">

<link rel="icon" href="admin/favicon.png" type="image/x-icon">
<!-- VENDOR CSS -->
<link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="assets/vendor/font-awesome/css/font-awesome.min.css">

<!-- MAIN CSS -->
<link rel="stylesheet" href="assets/css/main.css">
<link rel="stylesheet" href="assets/css/custom.css">

</head>

<body data-theme="light" class="font-nunito">
	<!-- WRAPPER -->
	<div id="wrapper" class="theme-red">
		<div class="vertical-align-wrap">
			<div class="vertical-align-middle auth-main realestate">
				<div class="auth-box">
                    <div class="column">
                        <div class="top">
                            <h1 class="white">Administração</h1>
                        </div>
                        <div class="card">
                            <div class="header">
                                <p class="lead">Entre com sua conta</p>
                            </div>
                            <div class="body">
                                <form class="form-auth-small" action="index.php" method="post">
                                    <div class="form-group">
                                        <label for="signin-user" class="control-label sr-only">Usuário</label>
                                        <input type="text" class="form-control" id="signin-user" name="usuario" placeholder="Usuário">
                                    </div>
                                    <div class="form-group">
                                        <label for="signin-password" class="control-label sr-only">Password</label>
                                        <input type="password" class="form-control" id="signin-password" name="senha" placeholder="Senha">
                                    </div>
                                    <div class="form-group clearfix">
                                        <label class="fancy-checkbox element-left">
                                            <input type="checkbox">
                                            <span>Lembrar usuário</span>
                                        </label>								
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-lg btn-block">ENTRAR</button>
                                    <div class="bottom">
                                        <span>Esqueceu sua senha ou não possui uma conta? <a href="page-register.html">Contate a administração</a></span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="logo">
                            <img src="../assets/images/logo/logo-dark.svg" alt="Samar">
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
	<!-- END WRAPPER -->
</body>
</html>
