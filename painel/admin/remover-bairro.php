<?php
use Source\Painel\Imoveis;

require '../../vendor/autoload.php';

$imoveis = new Imoveis;

$id = (int)($_GET['id'] ?? 0);

if ($id > 0) {
    if ($imoveis->verificarUsoBairro($id)) {
        // Se existir imóvel usando o bairro, redireciona com mensagem de erro
        header("Location: listar-bairros.php?erro=2");
        exit;
    }

    // Se não, tenta excluir o bairro do banco de dados
    $deletado = $imoveis->deleteById('bairros', $id);
    if ($deletado) {
        // Redireciona com mensagem de sucesso
        header("Location: listar-bairros.php?sucesso=1");
    } else {
        // Redireciona com mensagem de erro
        header("Location: listar-bairros.php?erro=1");
    }
    exit;
} else {
    // Mensagem de erro caso o ID seja inválido
    echo "Erro: ID inválido.";
    exit;
}

?>
