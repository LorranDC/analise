<?php

// Configuração do Banco de Dados
define("DB_HOST", getenv('DB_HOST') ?: "localhost");
define("DB_NAME", getenv('DB_NAME') ?: "samar-2");
define("DB_USER", getenv("DB_USER") ?: "root");
define("DB_PASS", getenv("DB_PASS") ?: "");

// Configuração Global
$GLOBALS['warnings'] = false;

// URL Base
define("BASE_URL", "http://localhost/samar-2/");

// Configuração de Timezone
date_default_timezone_set('America/Sao_Paulo');

// Conexão segura com o banco de dados
try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
} catch (PDOException $e) {
    die("Erro na conexão com o banco de dados: " . $e->getMessage());
}
?>

