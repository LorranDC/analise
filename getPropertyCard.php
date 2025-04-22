<?php
require_once __DIR__ . '/Source/Config.php';
require_once ROOT_DIR . 'config/config.php';
require_once __DIR__ . '/Source/Imoveis.php';

use Source\Imoveis;

session_start();

if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = (int) $_GET['id'];

    // Pega o imóvel do banco
    $pdo = \Source\Conexao::getDB();
    $stmt = $pdo->prepare("SELECT i.id, i.cod, i.valor, i.categoria, i.tipo, i.valor_a_combinar, i.quartos, i.banheiros, i.garagem, b.bairro, c.cidade
        FROM imoveis i
        INNER JOIN bairros b ON i.bairro = b.id
        INNER JOIN cidade c ON i.cidade = c.id
        WHERE i.id = :id LIMIT 1");
    $stmt->execute(['id' => $id]);
    $row = $stmt->fetch();

    if ($row) {
        $site = new \Source\Site();
        echo $site->buildPropertyItem($row);
    } else {
        http_response_code(404);
        echo 'Imóvel não encontrado';
    }
} else {
    http_response_code(400);
    echo 'ID inválido';
}
