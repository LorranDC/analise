<?php
use Source\Painel\Imoveis;
use Source\Painel\Autenticacao;
use Source\Imoveis as RootImoveis;

require '../../../vendor/autoload.php';

$auth    = new Autenticacao;
$imoveis = new Imoveis;

header('Content-Type: application/json');

try {
    // ───── Validar entrada ─────────────────────────────────────────────
    if (empty($_POST['id'])) {
        throw new RuntimeException('ID do imóvel não foi informado.');
    }

    $id = (int)$_POST['id'];

    // ───── Remover o imóvel ────────────────────────────────────────────
    // deleteById() existe na própria classe Imoveis
    $excluido = $imoveis->deleteById('imoveis', $id);

    if (!$excluido) {
        throw new RuntimeException("Não foi possível excluir o imóvel (ID inválido?).");
    }

    // ───── Log da operação & rebuild de destaques ──────────────────────
    Imoveis::logChange(
        $id,
        'delete',
        __DIR__ . '/../../../alteracoes.log',
        $_SESSION['nomeAdm'] ?? 'sistema',
        json_encode(['id' => $id]),
        new DateTime('America/Sao_Paulo')
    );

    (new RootImoveis)->geraTodosTiposDestaques();

    echo json_encode([
        'success' => true,
        'message' => 'Imóvel excluído com sucesso!'
    ]);
} catch (Throwable $e) {
    // Retorna erro em JSON para que o fetch() continue funcionando
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

exit;
