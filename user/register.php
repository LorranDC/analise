<?php
// register.php
session_start();
require_once '../vendor/autoload.php'; // Ensure Composer autoloader is included

use Source\User\User;

$errors = [];
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and trim form inputs
    $name            = trim($_POST['name'] ?? '');
    $email           = trim($_POST['email'] ?? '');
    $password        = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';

    // Validate input
    if (empty($name)) {
        $errors[] = 'O campo "Nome" é obrigatório.';
    }
    if (empty($email)) {
        $errors[] = 'O campo "Email" é obrigatório.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'O Email não é válido.';
    }
    if (empty($password)) {
        $errors[] = 'O campo "Senha" é obrigatório.';
    }
    if ($password !== $confirmPassword) {
        $errors[] = 'As senhas não são iguais.';
    }
    
    if (empty($errors)) {
        $userCrud = new User();
        // Generate username automatically from the "name" field
        // This example converts the name to lowercase and removes all spaces
        $username = strtolower(preg_replace('/\s+/', '', $name));

        // Prepare the data array. Make sure your site_users table has columns: name, username, email, password.
        $data = [
            'name'     => $name,
            'username' => $username,
            'email'    => $email,
            'password' => $password
        ];
        if ($userCrud->create($data)) {
            $success = "Registro concluído com sucesso!";
        } else {
            $errors[] = "Registro falhou. Por favor tente novamente.";
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Registro de Usuário - SAMAR</title>
    <style>
        .error { color: red; }
        .success { color: green; }
    </style>
    <link rel="stylesheet" href="../assets/css/register.css">
</head>
<body>
<div class="register-wrapper">
    <div class="register-box">
        <h1>Cadastre-se</h1>
        <small>Cadastre-se para interagir com os imóveis do site e ficar por dentro de todas as novidades!</small>

        <?php if (!empty($errors)): ?>
            <div class="error">
                <ul>
                    <?php foreach ($errors as $error): ?>
                        <li><?= htmlspecialchars($error) ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>

        <?php if ($success): ?>
            <div class="success"><?= htmlspecialchars($success) ?></div>
        <?php endif; ?>

        <form action="register.php" method="post">
            <input type="text" name="name" placeholder="Nome completo" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Senha" required>
            <input type="password" name="confirm_password" placeholder="Confirmar Senha" required>
            <input type="submit" value="Registrar">
        </form>

        <p>Já tem uma conta? <a href="login.php">Entrar aqui</a></p>
    </div>
</div>
</body>

</html>
