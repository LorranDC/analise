<?php
use Source\Painel\Imoveis;
use Source\Models;
use Source\Painel\Autenticacao;

require '../../../vendor/autoload.php';

// Sanitização e validação dos parâmetros
$id      = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
$arquivo = filter_input(INPUT_POST, 'image', FILTER_SANITIZE_STRING);
$ordem   = filter_input(INPUT_POST, 'ordem', FILTER_SANITIZE_STRING);

if (!$id || !$arquivo || !preg_match('/^[a-zA-Z0-9_\.-]+\.(jpg|jpeg|png|webp)$/', $arquivo)) {
    die("Parâmetros inválidos.");
}

// Inicialização de classes
$auth = new Autenticacao;
$imoveis = new Imoveis;
$models  = new Models;

// Diretórios onde os arquivos podem estar localizados
$diretorio = "../../../assets/images/properties/$id/";
$dirs = [
    $diretorio,
    $diretorio . "miniaturas/273x182/",
    $diretorio . "miniaturas/150x150/",
    $diretorio . "miniaturas/50x50/"
];

// Função para deletar o arquivo de um diretório específico
function deleteFileFromDirectory($dir, $filename) {
    $filePath = rtrim($dir, '/') . '/' . $filename;

    if (file_exists($filePath) && is_file($filePath)) {
        if (unlink($filePath)) {
            error_log("Arquivo removido: $filePath");
            return true;
        } else {
            error_log("Erro ao remover o arquivo: $filePath");
            return false;
        }
    } else {
        error_log("Arquivo não encontrado: $filePath");
        return false;
    }
}

// Iterar sobre os diretórios e tentar deletar o arquivo
$fileDeleted = false;
foreach ($dirs as $dir) {
    if (deleteFileFromDirectory($dir, $arquivo)) {
        $fileDeleted = true;
    }
}

if (!$fileDeleted) {
    die("Nenhum arquivo foi encontrado para exclusão.");
}

// Remove o registro no banco de dados
try {
    $models->deleteByCustomColumn('arquivos', 'arquivo', $arquivo);
} catch (Exception $e) {
    error_log("Erro ao deletar registro do banco: " . $e->getMessage());
}

// Atualiza a ordem das fotos
if (!empty($ordem)) {
    try {
        $imoveis->atualizaOrdem($ordem, $id);
    } catch (Exception $e) {
        error_log("Erro ao atualizar ordem: " . $e->getMessage());
    }
}

// Redirecionamento
header("Location: ../editar-imovel.php?id=$id");
exit;
?>