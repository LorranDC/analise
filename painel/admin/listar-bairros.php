<?php
use Source\Painel\Imoveis;
use Source\Painel\Autenticacao;
use Source\Funcoes;

require '../../vendor/autoload.php';

$auth = new Autenticacao;
$imoveis = new Imoveis;
$funcoes = new Funcoes;

// Captura mensagens de status
$mensagemSucesso = $_GET['sucesso'] ?? null;
$mensagemErro = $_GET['erro'] ?? null;

function exibirAlerta($sucesso, $erro) {
    $html = '';
    if ($sucesso) {
        $mensagem = 'Operação realizada com sucesso!';
        $html .= "<div class='alert alert-success'><span class='alert-icon'><i class='fas fa-check-circle'></i></span>{$mensagem}</div>";
    }
    if ($erro) {
        $mensagem = 'Erro ao realizar operação. Tente novamente.';
        if ($erro == '2') {
            $mensagem = 'Não é possível excluir este bairro pois há imóveis associados a ele.';
        }
        $html .= "<div class='alert alert-danger'><span class='alert-icon'><i class='fas fa-exclamation-circle'></i></span>{$mensagem}</div>";
    }
    return $html;
}


// Captura os filtros
$cidade = $_POST['cidade'] ?? 0;
$busca = $_POST['busca'] ?? '';
$ordem = $_POST['ordem'] ?? 'id ASC';

// Chama a listagem com paginação
$exibirBairros = $imoveis->listaBairrosComPaginacao($cidade, $busca, $ordem, 12);
?>
<style>
    .alert {
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    color: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.alert-success {
    background-color: #4CAF50; /* Green */
    margin-top: 25px;
}

.alert-danger {
    background-color: #f44336; /* Red */
    margin-top: 25px;
}

.alert-icon {
    margin-right: 15px;
}

</style>
<!doctype html>
<html lang="pt-BR">

<?php include 'includes/head.php'; ?>

<body data-theme="light" class="font-nunito right_icon_toggle">
    <div id="wrapper" class="theme-red">
        <?php include 'includes/top-navbar.php'; ?>
        <?php include 'includes/left-menu.php'; ?>
        <?php include 'includes/right-menu.php'; ?>

        <div id="main-content">
            <div class="container-fluid">
            <?= exibirAlerta($mensagemSucesso, $mensagemErro); ?>
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6">
                            <h2>Lista de Bairros</h2>
                        </div>
                        <div class="col-lg-6 text-right">
                            <a href="adicionar-bairro.php" class="btn btn-primary">Adicionar Bairro</a>
                        </div>
                    </div>
                </div>

                <form id="tabela-bairros" method="post">
                    <div class="row">
                        <!-- Filtro de Cidades -->
                        <div class="col-lg-3">
                            <label>Cidade</label>
                            <select class="form-control" name="cidade" id="cidade" onchange="document.getElementById('tabela-bairros').submit();">
                                <option value="0">Todas</option>
                                <?= $imoveis->listaCidadesParaFiltro($cidade); ?>
                            </select>
                        </div>
                        <!-- Campo de Busca -->
                        <div class="col-lg-5">
                            <label>Buscar</label>
                            <input type="search" class="form-control" name="busca" id="busca" placeholder="Buscar bairro..."
                                value="<?= htmlspecialchars($busca); ?>">
                        </div>
                        <!-- Resultados por Página -->
                        <div class="col-lg-4">
                            <label>Resultados por Página</label>
                            <input type="number" class="form-control" id="itens-p-pag" name="itens-por-pagina" value="12"
                                onchange="document.getElementById('tabela-bairros').submit();">
                        </div>
                    </div>
                </form>

                <div class="table-responsive mt-4">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Bairro</th>
                                <th>Url</th>
                                <th>Cidade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?= $exibirBairros['itens'] ?? "<tr><td colspan='4'>Nenhum bairro encontrado.</td></tr>"; ?>
                        </tbody>
                    </table>
                </div>
                <div>
                    <?= $exibirBairros['paginacao'] ?? ''; ?>
                </div>
            </div>
        </div>
    </div>

    <script src="../assets/bundles/libscripts.bundle.js"></script>
    <script src="../assets/bundles/vendorscripts.bundle.js"></script>
    <script src="../assets/bundles/mainscripts.bundle.js"></script>
    <script>
        // Implementação de debounce para busca
        let debounceTimer;
        const buscaInput = document.getElementById('busca');
        buscaInput.addEventListener('input', function () {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                document.getElementById('tabela-bairros').submit();
            }, 500); // Aguarda 500ms antes de enviar
        });
    </script>
</body>

</html>
