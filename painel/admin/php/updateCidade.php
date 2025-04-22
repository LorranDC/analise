<?php
use Source\Painel\Imoveis;
use Source\Ferramentas;
use Source\Painel\Autenticacao;

require '../../../vendor/autoload.php';

$auth = new Autenticacao;
$imoveis = new Imoveis;

$id     = isset($_POST['id']) ? (int)$_POST['id'] : 0;
$cidade = isset($_POST['cidade']) ? trim($_POST['cidade']) : '';
$estado = isset($_POST['estado']) ? trim($_POST['estado']) : '';
$url    = Ferramentas::remove_caractere_unico($cidade);

$dados = [
    'cidade' => $cidade,
    'estado' => $estado,
    'url'    => strtolower($url),
];

if (!empty($dados['cidade']) && !empty($dados['estado'])) {
    $imoveis->saveById('cidade', $dados, $id);

    // Redireciona para a lista de cidades com uma mensagem de sucesso
    header("Location: ../listar-cidades.php?sucesso=1");
    exit;
} else {
    // Redireciona para a mesma página com uma mensagem de erro
    header("Location: ../editar-cidade.php?id=$id&erro=1");
    exit;
}
