<?php
require '../../../vendor/autoload.php';

use Source\Painel\Autenticacao;
use Source\Models;

$auth = new Autenticacao;
$models = new Models;

// Verifica se o ID foi enviado via GET
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = intval($_GET['id']); // Garante que o ID seja um inteiro
    // Realiza a exclusão
    if ($models->deleleteByActive("blog", $id)) {
        // Redireciona com status de sucesso
        header("Location: ../listar-posts.php?status=success");
        exit();
    } else {
        // Redireciona com erro de exclusão
        header("Location: ../listar-posts.php?status=error");
        exit();
    }
} else {
    // Redireciona com erro de ID ausente ou inválido
    header("Location: ../listar-posts.php?status=error");
    exit("Erro ao remover post: ID inválido ou ausente.");
}
?>
