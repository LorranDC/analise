<?php
    require "../../vendor/autoload.php";
    use Source\Painel\Imoveis;
    use Source\Painel\AuthReg;
    
    $painel = new Imoveis();
    $login = new AuthReg();
    if( !empty($_POST['email']) AND !empty($_POST['name']) AND !empty($_POST['user']) AND !empty($_POST['passw']) ){
        if($login->loginJaExiste($_POST['user'])){
            echo "Este usuário já existe! Utilize outro ou contate um administrador.";
        }else{
            try{
                $login->novoAdm($_POST['user'], $_POST['name'], $_POST['email'], $_POST['passw']);
            }catch(Exception $e){
                echo 'Erro. ',  $e->getMessage(), "\n";
                exit();
            }

            echo "Usuário crido com sucesso. Redirecionando para a página de login";
            sleep(5);
            header("Location: ../index.php");
            exit();
            
        }
    }
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
<link rel="stylesheet" href="../assets/vendor/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="../assets/vendor/font-awesome/css/font-awesome.min.css">

<!-- MAIN CSS -->
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/custom.css">

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
                                <p class="lead">Criar novo usuário</p>
                            </div>
                            <div class="body">
                                <form class="form-auth-small" action="register.php" method="post">
                                    <div class="form-group">
                                        <label for="email" class="control-label sr-only">Email</label>
                                        <input type="text" class="form-control" id="email" placeholder="Email" name="email">
                                    </div>
                                    <div class="form-group">
                                        <label for="name" class="control-label sr-only">Nome</label>
                                        <input type="text" class="form-control" id="name" placeholder="Nome" name="name" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="new-user" class="control-label sr-only">Usuário</label>
                                        <input type="text" class="form-control" id="new-user" placeholder="Usuário" name="user" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="new-password" class="control-label sr-only">Senha</label><small id="msg"></small>
                                        <input type="password" class="form-control" id="new-password" placeholder="Senha" name="passw" onkeyup="validatePassword(this.value); check()" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="confirm-password" class="control-label sr-only">Confirmar senha</label><small id="message"></small>
                                        <input type="password" class="form-control" id="confirm-password" placeholder="Confirmar senha" onkeyup="check()" required>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-lg btn-block" id="register" disabled>REGISTRAR</button>
                                    <div class="bottom">
                                        <span class="helper-text m-b-10"><i class="fa fa-lock"></i> <a href="page-forgot-password.html">Esqueci minha senha</a></span>
                                        <span>Já possui uma conta? <a href="page-register.html">Logar</a></span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="logo">
                            <img src="../../assets/images/logo/logo-dark.svg" alt="Samar">
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
	<!-- END WRAPPER -->
    <script>
            function validatePassword(password) {
                
                // Do not show anything when the length of password is zero.
                if (password.length === 0) {
                    document.getElementById("msg").innerHTML = "";
                    return;
                }
                // Create an array and push all possible values that you want in password
                var matchedCase = new Array();
                matchedCase.push("[$@$!%*#?&]"); // Special Charector
                matchedCase.push("[A-Z]");      // Uppercase Alpabates
                matchedCase.push("[0-9]");      // Numbers
                matchedCase.push("[a-z]");     // Lowercase Alphabates

                // Check the conditions
                var ctr = 0;
                for (var i = 0; i < matchedCase.length; i++) {
                    if (new RegExp(matchedCase[i]).test(password)) {
                        ctr++;
                    }
                }
                // Display it
                var color = "";
                var strength = "";
                switch (ctr) {
                    case 0:
                    case 1:
                    case 2:
                        strength = "Muito fraca :(";
                        color = "red";
                        break;
                    case 3:
                        strength = "Mediana";
                        color = "orange";
                        break;
                    case 4:
                        strength = "Forte :)";
                        color = "green";
                        break;
                }
                document.getElementById("msg").innerHTML = strength;
                document.getElementById("msg").style.color = color;
            }

            function check() {
                if (document.getElementById('new-password').value ==
                    document.getElementById('confirm-password').value) {
                    document.getElementById('message').style.color = 'green';
                    document.getElementById('message').innerHTML = 'Confere :)';
                    document.getElementById('register').disabled = false;
                } else {
                    document.getElementById('message').style.color = 'red';
                    document.getElementById('message').innerHTML = 'Senha não confere :(';
                }
            }

            
        </script>
</body>
</html>
