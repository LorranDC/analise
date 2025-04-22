<?php
declare(strict_types=1);

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

// ============================ CREATE IMÓVEL ============================ //
header('Content-Type: application/json');

use Source\Ferramentas;
use Source\Funcoes;
use Source\ImageFile;
use Source\Painel\Autenticacao;
use Source\Painel\Imoveis;
use Source\Imoveis as RootImoveis;

require __DIR__ . '/../../../vendor/autoload.php';

// Transformar warnings/notices em exceções
set_error_handler(function($severity, $message, $file, $line) {
    throw new ErrorException($message, 0, $severity, $file, $line);
});

// Funções auxiliares
function json_abort(array $payload, string $dirToRemove = null): void
{
    if ($dirToRemove && is_dir($dirToRemove)) {
        rrmdir($dirToRemove);
    }
    echo json_encode($payload);
    exit;
}

function rrmdir(string $dir): void
{
    if (!is_dir($dir)) return;
    foreach (scandir($dir) as $f) {
        if ($f === '.' || $f === '..') continue;
        $p = "$dir/$f";
        is_dir($p) ? rrmdir($p) : @unlink($p);
    }
    @rmdir($dir);
}

// ========================== INSTÂNCIAS ========================== //
$auth    = new Autenticacao;  // exige login
$imoveis = new Imoveis;
$funcoes = new Funcoes;

// =========================== INPUTS ============================ //
$codigo = $imoveis->gerarNovoCodigoSequencial();


$tipo           = $_POST['tipo']      ?? '';
$categoria      = $_POST['categoria'] ?? '';
$endereco       = $_POST['endereco']  ?? '';
$valorRaw       = $_POST['valor']     ?? '';
$valor          = Ferramentas::precoCalculo($valorRaw);
$bairro         = $_POST['bairro']    ?? '';
$cidade         = $_POST['cidade']    ?? '';
$descricao      = $_POST['descricao'] ?? '-';
$cep            = $_POST['cep']       ?? '';
$numero         = $_POST['numero']    ?? '';
$ap             = $_POST['ap']        ?? '';
$sala           = $_POST['sala']      ?? '';
$mapa           = $_POST['maps']      ?? '';
$video          = $_POST['video']     ?? '';
$quartos        = $_POST['quartos']   ?? '';
$banheiros      = $_POST['banheiros'] ?? '';
$garagem        = isset($_POST['garagem']) ? 1 : 0;
$areaC          = $_POST['areaC']     ?? '';
$areaT          = $_POST['areaT']     ?? '';
$fracaoIdeal    = $_POST['fracao-ideal'] ?? '';
$destaque       = isset($_POST['destaque']) ? 1 : 0;
$lancamento     = isset($_POST['lancamento']) ? 1 : 0;
$reservado      = isset($_POST['reservado']) ? 1 : 0;
$indisponivel   = isset($_POST['indisponivel']) ? 1 : 0;
$valorACombinar = isset($_POST['valor-a-combinar']) ? 1 : 0;

// ------------------ Características ------------------ //
$caracteristicas = [];
foreach ($imoveis->getCaracteristicas() as $c) {
    $url = $c['url'];
    if (isset($_POST[$url])) {
        $caracteristicas[$c['id']] = $_POST[$url . '_val'] ?? 1;
    }
}
$jsonCarac = json_encode($caracteristicas, JSON_UNESCAPED_UNICODE);

// ------------------ Validações ------------------ //
$erros = [];
if (!$tipo)      $erros[] = 'Selecione se o imóvel é de Venda ou Aluguel.';
if (!$categoria) $erros[] = 'Selecione a Categoria do imóvel.';
if (!$cidade)    $erros[] = 'Selecione uma Cidade.';
if ($cidade && !$bairro) $erros[] = 'Selecione um Bairro.';
if ($bairro && $cidade && !$imoveis->verificarBairroCidade($bairro, $cidade)) {
    $erros[] = 'O bairro não pertence à cidade informada.';
}
if (!$valor || $valor <= 0) $erros[] = 'Informe o Valor do imóvel.';
$arquivos = $_FILES['arquivos']['tmp_name'] ?? [];
if (empty($arquivos[0])) $erros[] = 'Envie pelo menos uma imagem do imóvel.';
if (count($arquivos) > 10) $erros[] = 'Você pode enviar no máximo 10 imagens.';

if ($erros) {
    json_abort([
        'success' => false,
        'message' => 'Erro ao cadastrar',
        'errors'  => $erros
    ]);
}

// ========== Pré‑processamento de Imagens ========== //
$baseDir   = __DIR__ . "/../../../assets/images/properties/{$codigo}/";

if (is_dir($baseDir)) {
    rrmdir($baseDir); // Remove todas as imagens antigas antes de salvar novas
}
mkdir($baseDir . 'miniaturas/', 0777, true); // recria o diretório

$thumbDir  = $baseDir . 'miniaturas/';
$watermark = __DIR__ . '/../../../assets/images/properties/marca-agua-samar.png';

// cria pastas
if (!is_dir($thumbDir) && !mkdir($thumbDir, 0777, true)) {
    json_abort(['success' => false, 'message' => 'Falha ao criar diretório de imagens.']);
}

// inicializa utilitário
$imgFile = new ImageFile([$baseDir, $thumbDir, $watermark]);

$quantidadeImagens = min(count($arquivos), 10);
$errosImg          = [];
$imgsOk            = [];

for ($k = 0; $k < $quantidadeImagens; $k++) {
    // renomeei para os nomes corretos
    $tmp_name      = $_FILES['arquivos']['tmp_name'][$k];
    $originalName  = $_FILES['arquivos']['name'][$k];
    $ext           = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    $baseName      = $imoveis->nomeiaFotos($codigo) . '-' . uniqid();

    try {
        if ($ext === 'webp') {
            // 1) abre WebP
            $src = imagecreatefromwebp($tmp_name);
            if (!$src) {
                throw new RuntimeException("Não foi possível abrir '$originalName'.");
            }

            // 2) abre PNG da watermark
            $wmk = imagecreatefrompng($watermark);
            if (!$wmk) {
                imagedestroy($src);
                throw new RuntimeException("Não foi possível abrir a watermark.");
            }

            // prepara alfa
            imagealphablending($src, true);
            imagesavealpha($src, true);

            // dimensões
            $srcW = imagesx($src);
            $srcH = imagesy($src);
            $wmkW = imagesx($wmk);
            $wmkH = imagesy($wmk);

            // redimensiona a watermark para 30% da largura
            $targetW    = intval($srcW * 0.3);
            $scale      = $targetW / $wmkW;
            $targetH    = intval($wmkH * $scale);
            $wmkResized = imagecreatetruecolor($targetW, $targetH);
            imagealphablending($wmkResized, false);
            imagesavealpha($wmkResized, true);
            imagecopyresampled(
                $wmkResized, $wmk,
                0, 0, 0, 0,
                $targetW, $targetH,
                $wmkW, $wmkH
            );
            imagedestroy($wmk);

            // centraliza
            $dstX = intval(($srcW - $targetW) / 2);
            $dstY = intval(($srcH - $targetH) / 2);

            imagecopy(
                $src,
                $wmkResized,
                $dstX, $dstY,
                0, 0,
                $targetW, $targetH
            );
            imagedestroy($wmkResized);

            // salva WebP
            $novoNome = $baseName . '.webp';
            if (!imagewebp($src, $baseDir . $novoNome, 85)) {
                imagedestroy($src);
                throw new RuntimeException("Falha ao salvar '$originalName'.");
            }
            imagedestroy($src);
        } else {
            // jpg/png via utilitário
            $novoNome = $imgFile->processSingleFile($baseName, $tmp_name, (int)$codigo);
            if (!$novoNome) {
                throw new RuntimeException("Erro ao processar '$originalName'.");
            }
        }

        $imgsOk[] = ['arquivo' => $novoNome, 'ordem' => $k];

    } catch (\Throwable $e) {
        $errosImg[] = $e->getMessage();
    }
}


// aborta se houver falha em **qualquer** imagem
if ($errosImg) {
    rrmdir($baseDir);
    json_abort([
        'success' => false,
        'message' => 'Erro ao processar imagens:',
        'errors'  => $errosImg
    ]);
}

// ============ Inserção no BD ============ //
$dadosImovel = [
    'id'               => $codigo,
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
    'lancamento'       => $lancamento,
    'videos'           => $video,
    'ativo'            => 1,
    'indisponivel'     => $indisponivel,
    'area_construida'  => (double)$areaC,
    'area_terreno'     => (double)$areaT,
    'fracao_ideal'     => (double)$fracaoIdeal,
    'quartos'          => (int)$quartos,
    'banheiros'        => (int)$banheiros,
    'garagem'          => (int)$garagem,
    'reservado'        => $reservado,
    'caracteristicas'  => $jsonCarac
];

$pdo = $imoveis->getDB();
$pdo->beginTransaction();

try {
    // insere imóvel
    $imoveis->insert('imoveis', $dadosImovel, true);

    // insere cada imagem
    foreach ($imgsOk as $img) {
        $imoveis->insert('arquivos', [
            'id_imovel' => $codigo,
            'arquivo'   => $img['arquivo'],
            'ordem'     => $img['ordem']
        ], true);
    }

    // pontos próximos (se houver)
    if (!empty($_POST['pontos_proximos'])) {
        $imoveis->savePontosProximosForImovel($codigo, $_POST['pontos_proximos']);
    }

    // vinculação (se houver)
    if (!empty($_POST['link_imoveis_active']) && !empty($_POST['linked_imovel_id'])) {
        $linked = (int) $_POST['linked_imovel_id'];
        if (strtolower($tipo) === 'aluguel') {
            $v = $linked; $a = $codigo;
        } else {
            $v = $codigo; $a = $linked;
        }
        $pdo->prepare("INSERT INTO imoveis_link (id_venda,id_aluguel) VALUES (:v,:a)")
            ->execute(['v' => $v, 'a' => $a]);
    }

    Imoveis::logChange(
        $codigo,                                // id do imóvel
        'create',                               // operação
        ROOT_DIR . 'alteracoes.log',            // arquivo de log
        $_SESSION['nomeAdm'],                   // usuário
        json_encode($imgsOk, JSON_UNESCAPED_UNICODE), // ← aqui vai o JSON (sem escapar Unicode)
        new DateTime('America/Sao_Paulo')       // ← aqui o DateTime
    );
    
    (new RootImoveis())->geraTodosTiposDestaques();
    

    $pdo->commit();
    json_abort(['success' => true, 'message' => 'Imóvel cadastrado com sucesso!']);
} catch (Throwable $e) {
    $pdo->rollBack();
    rrmdir($baseDir);
    json_abort([
        'success' => false,
        'message' => 'Erro: ' . $e->getMessage()
    ]);
}
