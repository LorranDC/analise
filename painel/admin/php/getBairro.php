<?php
use Source\Painel\Imoveis;
require '../../../vendor/autoload.php';

$imoveis = new Imoveis;

// Verifica se o ID da cidade foi enviado
if (isset($_POST['cidade']) && !empty($_POST['cidade'])) {
    $cidadeId = (int)$_POST['cidade'];
    $bairros = $imoveis->listaBairrosAsList($cidadeId);

    if (!empty($bairros)) {
        echo $bairros; // Retorna os bairros como opções <option>
    } else {
        echo '<option value="">Nenhum bairro encontrado</option>';
    }
} else {
    echo '<option value="">Selecione uma cidade primeiro</option>';
}
