<?php

use Source\Painel\Imoveis;
use Source\Painel\Autenticacao;

require '../../vendor/autoload.php';

$auth = new Autenticacao;
$imoveis = new Imoveis;
$mensagemSucesso = $_GET['sucesso'] ?? null;
$mensagemErro = $_GET['erro'] ?? null;
function exibirAlerta($sucesso, $erro)
{
    $html = '';
    if ($sucesso) {
        $mensagem = 'Operação realizada com sucesso!';
        $html .= "<div class='alert alert-success'><span class='alert-icon'><i class='fas fa-check-circle'></i></span>{$mensagem}</div>";
    }
    if ($erro) {
        $mensagem = 'Erro ao realizar operação. Tente novamente.';
        if ($erro == '2') {
            $mensagem = 'Não é possível excluir esta cidade pois há bairros ou imóveis associados a ela.';
        }
        $html .= "<div class='alert alert-danger'><span class='alert-icon'><i class='fas fa-exclamation-circle'></i></span>{$mensagem}</div>";
    }
    return $html;
}

?>

<!doctype html>
<html lang="pt-BR">
<style>
    .alert {
        padding: 20px;
        border-radius: 5px;
        margin-bottom: 20px;
        color: #fff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    .alert-success {
        background-color: #4CAF50;
        /* Green */
        margin-top: 25px;
    }

    .alert-danger {
        background-color: #f44336;
        /* Red */
        margin-top: 25px;
    }

    .alert-icon {
        margin-right: 15px;
    }
</style>
<!-- <head> -->
<?php include 'includes/head.php' ?>
<!-- </head> -->


<body data-theme="light" class="font-nunito right_icon_toggle">

    <div id="wrapper" class="theme-red">

        <!-- Page Loader -->
        <div class="page-loader-wrapper">
            <div class="loader">
                <div class="m-t-30"><img src="../assets/images/logo-icon.svg" width="48" height="48" alt="Iconic"></div>
                <p>Mobiliando o site...</p>
            </div>
        </div>

        <!-- Top navbar div start -->
        <?php include 'includes/top-navbar.php' ?>

        <!-- main left menu -->
        <?php include 'includes/left-menu.php' ?>

        <!-- rightbar icon div -->
        <?php include 'includes/right-menu.php' ?>

        <!-- mani page content body part -->
        <div id="main-content">
            <div class="container-fluid">
                <?= exibirAlerta($mensagemSucesso, $mensagemErro); ?>
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <h2>Lista de Cidades</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#" aria-label="Cidade"><i class="fa fa-building"></i></a></li>
                                <li class="breadcrumb-item">Cidades</li>
                                <li class="breadcrumb-item active">Lista</li>
                            </ul>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <div class="d-flex flex-row-reverse">
                                <div class="page_action">
                                    <a href="adicionar-cidade.php" class="btn btn-primary">Adicionar Cidade</a>
                                </div>
                                <div class="p-2 d-flex">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="body">
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" style="line-height: normal;">Estado</span>
                                                </div>
                                                <select class="form-control" name="estado" id="estado">
                                                    <option value="MG" selected>MG</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">Cidade</th>
                                            <th class="border-top-0">Url</th>
                                            <th class="border-top-0">Estado</th>
                                            <th class="border-top-0">Bairros</th>
                                            <th class="border-top-0">Imóveis</th>
                                            <th class="border-top-0">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?= $imoveis->listaCidades() ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Javascript -->
    <script src="../assets/bundles/libscripts.bundle.js"></script>
    <script src="../assets/bundles/vendorscripts.bundle.js"></script>


    <!-- page js file -->
    <script src="../assets/bundles/mainscripts.bundle.js"></script>
</body>

</html>
<?php if (isset($_GET['sucesso']) && $_GET['sucesso'] == 1): ?>
    <div class="alert alert-success">
        Cidade editada com sucesso!
    </div>
<?php endif; ?>

<?php if (isset($_GET['erro']) && $_GET['erro'] == 1): ?>
    <div class="alert alert-danger">
        Erro ao editar a cidade. Por favor, tente novamente.
    </div>
<?php endif; ?>