<?php
use Source\Painel\Imoveis;
use Source\Painel\Autenticacao;
use Source\Funcoes;

require '../../vendor/autoload.php';

$auth = new Autenticacao;
$imoveis = new Imoveis;
$funcoes = new Funcoes;

// Captura o ID do bairro
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

// Redireciona caso o ID seja inválido
if ($id <= 0) {
    $funcoes->criarAlert('Bairro não encontrado', 'O ID do bairro é inválido ou não foi fornecido.', 1);
    header("Location: listar-bairros.php");
    exit;
}

// Obtém as informações do bairro
$info = $imoveis->getBairroById($id);

// Verifica se o bairro foi encontrado
if (!$info) {
    $funcoes->criarAlert('Bairro não encontrado', 'Não foi possível localizar o bairro informado.', 1);
    header("Location: listar-bairros.php");
    exit;
}
?>

<!doctype html>
<html lang="pt-BR">

<?php include 'includes/head.php'; ?>

<body data-theme="light" class="font-nunito right_icon_toggle">
<div id="wrapper" class="theme-red">

    <!-- Navbar e Menus -->
    <?php include 'includes/top-navbar.php'; ?>
    <?php include 'includes/left-menu.php'; ?>
    <?php include 'includes/right-menu.php'; ?>

    <!-- Conteúdo Principal -->
    <div id="main-content">
        <div class="container-fluid">
            <div class="block-header">
                <div class="row">
                    <div class="col-lg-6">
                        <h2>Editar Bairro</h2>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="listar-bairros.php"><i class="fa fa-map"></i></a></li>
                            <li class="breadcrumb-item">Bairros</li>
                            <li class="breadcrumb-item active">Editar</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="body">
                            <form action="php/updateBairro.php" method="post">
                                <input type="hidden" name="id" value="<?= htmlspecialchars($info['id'] ?? '') ?>">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="nome-bairro">Nome do Bairro</label>
                                            <input class="form-control" type="text" name="bairro" id="nome-bairro" value="<?= htmlspecialchars($info['bairro'] ?? '') ?>" required oninput="atualizaUrl()">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="cidade">Cidade</label>
                                            <select class="form-control" name="cidade" id="cidade" required>
                                                <?= $imoveis->listaCidadesParaFiltro($info['cidade_id'] ?? null); ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="url">URL</label>
                                            <input class="form-control" type="text" id="url" name="url" value="<?= htmlspecialchars($info['url'] ?? '') ?>" required>
                                        </div>
                                    </div>
                                    <div class="col-sm-12">
                                        <button type="submit" class="btn btn-primary">Salvar</button>
                                        <a href="listar-bairros.php" class="btn btn-secondary">Cancelar</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="../assets/bundles/libscripts.bundle.js"></script>
<script src="../assets/bundles/vendorscripts.bundle.js"></script>
<script src="../assets/bundles/mainscripts.bundle.js"></script>
<script>
// Atualiza a URL com base no nome do bairro
function atualizaUrl() {
    const nomeBairro = document.getElementById('nome-bairro').value;
    const urlField = document.getElementById('url');
    urlField.value = nomeBairro.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
</script>
</body>
</html>
