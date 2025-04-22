<?php
use Source\Painel\Imoveis;

require '../../../vendor/autoload.php';

$imoveis = new Imoveis;

$id = (int)($_GET['id'] ?? 0);

if ($id > 0) {
    $deletado = $imoveis->deleteById('bairros', $id);
    if ($deletado) {
        header("Location: ../listar-bairros.php?sucesso=1");
    } else {
        header("Location: ../listar-bairros.php?erro=1");
    }
    exit;
} else {
    die("Erro: ID inválido.");
}
?>
