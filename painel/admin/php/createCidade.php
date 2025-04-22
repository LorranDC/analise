<?php
use Source\Painel\Imoveis;
use Source\Funcoes;
use Source\Ferramentas;
use Source\Models;
use Source\Painel\Autenticacao;

require '../../../vendor/autoload.php';

$auth = new Autenticacao;
$imoveis = new Imoveis;
$funcoes = new Funcoes;
$models  = new Models;

// Captura dados do formulário
$cidade = isset($_POST['cidade']) ? trim($_POST['cidade']) : '';
$estado = isset($_POST['estado']) ? trim($_POST['estado']) : '';
$url = Ferramentas::remove_caractere_unico($cidade);

// Busca o maior ID na tabela cidade
$maxIdCidade = $imoveis->getMaxId('cidade'); // Método reutilizado da classe Imoveis
// Busca o maior ID na tabela imoveis
$maxIdImoveis = $imoveis->getMaxId('imoveis'); // Método reutilizado da classe Imoveis

// Determina o próximo ID que não está sendo utilizado
$nextId = max($maxIdCidade, $maxIdImoveis) + 1;

$dados = [
    'id'     => $nextId, // Define o próximo ID de forma segura
    'cidade' => $cidade,
    'estado' => $estado,
    'url'    => strtolower($url)
];

// Insere os dados no banco de dados
$inserido = $models->insert('cidade', $dados, 0);

if ($inserido) {
    echo "<meta http-equiv=\"refresh\" content=\"0; url=../listar-cidades.php?sucesso=1\" />";
} else {
    echo "<meta http-equiv=\"refresh\" content=\"0; url=../listar-cidades.php?erro=1\" />";
}
exit();
?>
