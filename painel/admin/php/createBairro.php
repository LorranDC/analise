<?php
use Source\Painel\Imoveis;
use Source\Funcoes;
use Source\Ferramentas;
use Source\Painel\Autenticacao;

require '../../../vendor/autoload.php';

$auth = new Autenticacao;
$imoveis = new Imoveis;
$funcoes = new Funcoes;

// Captura dados do formulário
$bairro = isset($_POST['bairro']) ? trim($_POST['bairro']) : '';
$cidade = isset($_POST['cidade']) ? (int)$_POST['cidade'] : 0;
$url = Ferramentas::remove_caractere_unico($bairro);

// Busca o maior ID na tabela bairros
$maxIdBairros = $imoveis->getMaxId('bairros'); // Implementar método getMaxId na classe Imoveis
// Busca o maior ID na tabela imoveis
$maxIdImoveis = $imoveis->getMaxId('imoveis'); // Implementar método getMaxId na classe Imoveis

// Determina o próximo ID que não está sendo utilizado
$nextId = max($maxIdBairros, $maxIdImoveis) + 1;

$dados = [
    'id'     => $nextId, // Define o próximo ID de forma segura
    'bairro' => $bairro,
    'cidade' => $cidade,
    'url'    => strtolower($url)
];

// Valida entrada antes de inserir no banco
if (!empty($bairro) && $cidade > 0) {
    $imoveis->insert('bairros', $dados, 0);
    header("Location: ../listar-bairros.php?sucesso=1"); // Modificado para indicar sucesso específico
    exit;
} else {
    header("Location: ../listar-bairros.php?erro=1"); // Modificado para erro específico
    exit;
}
