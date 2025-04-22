<?php
use Source\Painel\Imoveis;

require '../../vendor/autoload.php';

$imoveis = new Imoveis;

$id = (int)($_GET['id'] ?? 0);

if ($id > 0) {
    // Verifica se a cidade está sendo utilizada por algum imóvel
    if ($imoveis->verificarUsoCidade($id)) {
        // Se existir imóvel usando a cidade, redireciona com mensagem de erro
        header("Location: listar-cidades.php?erro=2");
        exit;
    }

    // Tenta excluir a cidade do banco de dados
    $deletado = $imoveis->deleteById('cidade', $id);
    if ($deletado) {
        // Redireciona com mensagem de sucesso
        header("Location: listar-cidades.php?sucesso=1");
    } else {
        // Redireciona com mensagem de erro
        header("Location: listar-cidades.php?erro=1");
    }
} else {
    // Mensagem de erro caso o ID seja inválido
    echo "ID inválido.";
}
?>
