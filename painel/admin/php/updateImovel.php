<?php
declare(strict_types=1);

// Garante que o autoload seja sempre encontrado
require_once __DIR__ . '/../../../vendor/autoload.php';

use Source\Ferramentas;
use Source\ImageFile;
use Source\Painel\Autenticacao;
use Source\Painel\Imoveis;
use Source\Funcoes;
use Source\Imoveis as RootImoveis;

// JSON de saída
header('Content-Type: application/json');

// DEBUG em desenvolvimento
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

// Autenticação
$auth    = new Autenticacao;
$imoveis = new Imoveis;
$funcoes = new Funcoes;

// Captura POST
// garante que $id é um inteiro
$id = isset($_POST['id']) ? intval($_POST['id']) : 0;

$codigo         = $_POST['cod'] ?? '';
$tipo           = $_POST['tipo'] ?? '';
$categoria      = $_POST['categoria'] ?? '';
$endereco       = $_POST['endereco'] ?? '';
$valorBruto     = $_POST['valor'] ?? '';
$valor          = $valorBruto !== '' ? Ferramentas::precoCalculo($valorBruto) : '';
$bairro         = $_POST['bairro'] ?? '';
$cidade         = $_POST['cidade'] ?? '';
$descricao      = $_POST['descricao'] ?? '-';
$cep            = $_POST['cep'] ?? '';
$numero         = $_POST['numero'] ?? '';
$ap             = $_POST['ap'] ?? '';
$sala           = $_POST['sala'] ?? '';
$mapa           = $_POST['maps'] ?? '';
$video          = $_POST['video'] ?? '';
$quartos        = $_POST['quartos'] ?? '';
$banheiros      = $_POST['banheiros'] ?? '';
$garagem        = isset($_POST['garagem']) ? 1 : 0;
$areaC          = $_POST['areaC'] ?? '';
$areaT          = $_POST['areaT'] ?? '';
$fracaoIdeal    = $_POST['fracao-ideal'] ?? '';
$foto_dest      = $_POST['foto_destaque'] ?? '';
$destaque       = isset($_POST['destaque']) ? 1 : 0;
$lancamento     = isset($_POST['lancamento']) ? 1 : 0;
$reservado      = isset($_POST['reservado']) ? 1 : 0;
$indisponivel   = isset($_POST['indisponivel']) ? 1 : 0;
$valorACombinar = isset($_POST['valor-a-combinar']) ? 1 : 0;
$ordem          = $_POST['ordem'] ?? '';

$erros = [];

// Validações básicas
if (!$id)                               $erros[] = 'ID ausente.';
if (empty($tipo))                      $erros[] = 'Selecione Venda ou Aluguel.';
if (empty($categoria))                 $erros[] = 'Selecione a categoria.';
if ($valor === '' || $valor <= 0)      $erros[] = 'Informe valor válido (>0).';
if (empty($cidade))                    $erros[] = 'Selecione a cidade.';
if (empty($bairro))                    $erros[] = 'Selecione o bairro.';

if ($erros) {
    echo json_encode(['success' => false, 'message' => 'Corrija os itens abaixo:', 'errors' => $erros]);
    exit;
}

// Processa características
$carac = [];
foreach ($imoveis->getCaracteristicas() as $c) {
    $url = $c['url'];
    if (isset($_POST[$url])) {
        $val = $_POST[$url . '_val'] ?? 1;
        $carac[$c['id']] = $val;
    }
}
$jsonCarac = json_encode($carac);

// Prepara dados para update
$dadosImovel = [
    'cod'              => $codigo,
    'tipo'             => $tipo,
    'categoria'        => $categoria,
    'endereco'         => $endereco,
    'numero'           => $numero,
    'ap'               => $ap,
    'sala'             => $sala,
    'CEP'              => $cep,
    'bairro'           => $bairro,
    'cidade'           => $cidade,
    'mapa'             => $mapa,
    'descricao'        => $descricao,
    'valor'            => $valor,
    'valor_a_combinar' => $valorACombinar,
    'destaque'         => $destaque,
    'foto_destaque'    => $foto_dest,
    'lancamento'       => $lancamento,
    'videos'           => $video,
    'ativo'            => 1,
    'indisponivel'     => $indisponivel,
    'area_construida'  => (float)$areaC,
    'area_terreno'     => (float)$areaT,
    'fracao_ideal'     => (float)$fracaoIdeal,
    'quartos'          => (int)$quartos,
    'banheiros'        => (int)$banheiros,
    'garagem'          => (int)$garagem,
    'reservado'        => $reservado,
    'caracteristicas'  => $jsonCarac
];

// Inicia transação
$pdo = $imoveis->getDB();
if ($pdo->inTransaction()) {
    $pdo->rollBack();
}
$pdo->beginTransaction();

try {
    // Salva dados principais
    $imoveis->saveById('imoveis', $dadosImovel, $id);

    // Processa upload de novas imagens (opcional)
    if (!empty($_FILES['arquivos']['tmp_name'][0])) {
        $baseDir   = __DIR__ . "/../../../assets/images/properties/$id/";
        $thumbDir  = $baseDir . "miniaturas/";
        $watermark = __DIR__ . "/../../../assets/images/properties/marca-agua-samar.png";

        if (!is_dir($baseDir))  mkdir($baseDir, 0777, true);
        if (!is_dir($thumbDir)) mkdir($thumbDir, 0777, true);

        $imgFile = new ImageFile([$baseDir, $thumbDir, $watermark]);
        $ord     = $imoveis->getUltimaOrdem($id) + 1;

        foreach ($_FILES['arquivos']['tmp_name'] as $tmp) {
            $name    = $imoveis->nomeiaFotos($id) . '-' . uniqid();
            $newName = $imgFile->processSingleFile($name, $tmp, $id);
            if (!$newName) {
                throw new \Exception("Falha ao processar imagem.");
            }
            $imoveis->insert('arquivos', [
                'id_imovel' => $id,
                'arquivo'   => $newName,
                'ordem'     => $ord++
            ], true);
        }
    }

    // Atualiza ordem (se fornecida)
    if ($ordem) {
        $imoveis->atualizaOrdem($ordem, $id);
    }

    // Salva pontos próximos
    $pts = $_POST['pontos_proximos'] ?? [];
    $imoveis->savePontosProximosForImovel($id, $pts);

    // Lógica de vinculação
    $pdo->prepare("DELETE FROM imoveis_link WHERE id_venda = :i OR id_aluguel = :i")
        ->execute(['i' => $id]);

    if (!empty($_POST['link_imoveis_active'])) {
        $linked = (int)($_POST['linked_imovel_id'] ?? 0);
        if (!$linked) {
            throw new \Exception("ID do imóvel vinculado é obrigatório.");
        }
        if ($linked === (int)$id) {
            throw new \Exception("Não é possível vincular um imóvel com ele mesmo.");
        }
        $tipoLower = strtolower($tipo);
        $stmt = $pdo->prepare("SELECT tipo,ativo FROM imoveis WHERE id = :i");
        $stmt->execute(['i' => $linked]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$row || (int)$row['ativo'] !== 1) {
            throw new \Exception("Imóvel vinculado inválido.");
        }
        if (strtolower($row['tipo']) === $tipoLower) {
            throw new \Exception("Os imóveis devem ser de tipos opostos.");
        }
        $venda   = $tipoLower === 'aluguel' ? $linked : $id;
        $aluguel = $tipoLower === 'aluguel' ? $id      : $linked;
        $pdo->prepare("INSERT INTO imoveis_link (id_venda,id_aluguel) VALUES(:v,:a)")
            ->execute(['v' => $venda, 'a' => $aluguel]);
    }

    // Grava log: payload em string e DateTime como último parâmetro
    $payload = json_encode($dadosImovel);
    Imoveis::logChange(
        $id,
        'update',
        ROOT_DIR . 'alteracoes.log',
        $_SESSION['nomeAdm'],
        $payload,
        new \DateTime('America/Sao_Paulo')
    );

    // Atualiza destaques
    (new RootImoveis())->geraTodosTiposDestaques();

    $pdo->commit();
    echo json_encode(['success' => true, 'message' => 'Imóvel atualizado com sucesso!']);
    exit;
} catch (\Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    // Em dev, retorna o erro
    echo json_encode(['success' => false, 'message' => 'Erro: ' . $e->getMessage()]);
    exit;
}
