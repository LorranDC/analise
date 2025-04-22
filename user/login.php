<?php
// login.php
session_start();
require_once '../vendor/autoload.php';

use Source\User\User;

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($email)) {
        $errors[] = 'Email é obrigatório.';
    }
    if (empty($password)) {
        $errors[] = 'Senha é obrigatória.';
    }

    if (empty($errors)) {
        $userCrud = new User();
        $userData = $userCrud->getUserByEmail($email);
        if ($userData && password_verify($password, $userData['password'])) {
            // Successful login: save user info in session
            $_SESSION['user'] = [
                'id'       => $userData['id'],
                'username' => $userData['username'],
                'email'    => $userData['email'],
                'name'     => $userData['name']
            ];

            // MIGRAR INTERAÇÕES ANÔNIMAS PARA O USUÁRIO LOGADO
            $uniqueId = $_COOKIE['uniqueVisitorId'] ?? null;
            if ($uniqueId) {
                $pdo = (new \Source\Conexao())->getDB(); // ou use Conexao::getDB() se for static
                $migrate = $pdo->prepare("
                    UPDATE user_interactions 
                    SET user_id = :user_id 
                    WHERE unique_id = :unique_id AND user_id IS NULL
                ");
                $migrate->execute([
                    'user_id' => $_SESSION['user']['id'],
                    'unique_id' => $uniqueId
                ]);
            }

            header("Location: ../index.php");
            exit;
        } else {
            $errors[] = 'Credenciais inválidas. Verifique seu email e senha.';
        }
    }
}
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>SAMAR - Login</title>

    <link rel="stylesheet" href="../assets/css/login.css">
</head>

<body>
    <div class="login-wrapper">
        <div class="login-box">
            <h1>Entrar</h1>
            <small>Seja bem-vindo(a) de volta!</small>

            <?php if (!empty($errors)): ?>
                <div class="error">
                    <ul>
                        <?php foreach ($errors as $error): ?>
                            <li><?= htmlspecialchars($error) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <form action="login.php" method="post">
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" placeholder="Senha" required>
                <input type="submit" value="Entrar">
            </form>

            <p>Não possui uma conta? <a href="register.php">Registre-se aqui</a></p>
        </div>
    </div>

</body>

</html>