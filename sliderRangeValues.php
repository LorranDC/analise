<?php
namespace Source;

use Source\Imoveis;

require 'vendor/autoload.php';

$imoveis    = new Imoveis;
$valores    = $imoveis->getMaxMin();
$minAluguel = $valores[0] ?? 0;
$maxAluguel = 4000;
$minVendas  = $valores[2] ?? 0;
$maxVendas  = 4000000;

$t  = $_GET['tipo'] ?? "aluguel"; // Corrigindo a variável usada no array abaixo
$fp = $_GET['faixa-preco'] ?? "";

$values = [
    'aluguel' => [
        "R$0 - R$999.999.999"    => 'Qualquer valor',
        "R$0 - R$1.000"          => 'Até R$1.000,00 /mês',
        "R$1.001 - R$2.000"       => 'Até R$2.000,00 /mês',
        "R$2.001 - R$2.999"       => 'Até R$3.000,00 /mês',
        "R$3.000 - R$999.999.999"  => 'Acima de R$3.000,00 /mês',
    ],
    'vendas' => [
        "R$0 - R$999.999.999"      => 'Todos os preços',
        "R$0 - R$80.000"          => 'De R$0 até R$80.000',
        "R$80.001 - R$150.000"     => 'De R$80.001 até R$150.000',
        "R$150.001 - R$300.000"    => 'De R$150.001 até R$300.000',
        "R$300.001 - R$500.000"    => 'De R$300.001 até R$500.000',
        "R$500.001 - R$999.999.999"  => 'Acima de R$500.000'
    ]
];

$select = '';
// Verifica se a chave $t existe em $values antes de tentar acessá-la
if (isset($values[$t]) && is_array($values[$t])) {
    foreach ($values[$t] as $key => $value) {
        $selected = ($key === $fp) ? " selected" : "";
        $select .= "<option value=\"{$key}\"{$selected}>{$value}</option>";
    }
} else {
    error_log("Erro: Tipo inválido ou valores de faixa de preço não definidos para: " . htmlspecialchars($t));
}

echo $select;
?>
