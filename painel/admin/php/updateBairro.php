<?php
use Source\Painel\Imoveis;
use Source\Ferramentas;

require '../../../vendor/autoload.php';

$imoveis = new Imoveis;

$id     = isset($_POST['id']) ? (int)$_POST['id'] : 0;
$bairro = isset($_POST['bairro']) ? trim($_POST['bairro']) : '';
$cidade = isset($_POST['cidade']) ? (int)$_POST['cidade'] : 0;
$url    = isset($_POST['url']) ? trim($_POST['url']) : '';

// Verifica os dados antes de atualizar
if ($id > 0 && !empty($bairro) && $cidade > 0 && !empty($url)) {
    $dados = [
        'bairro' => $bairro,
        'cidade' => $cidade,
        'url'    => strtolower($url),
    ];

    $imoveis->saveById('bairros', $dados, $id);
    header("Location: ../listar-bairros.php?sucesso=1");
    exit;
} else {
    die("Erro: Dados inválidos. Certifique-se de preencher todos os campos.");
}
?>
