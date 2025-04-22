<?php
use Source\Painel\Imoveis;
use Source\Painel\Autenticacao;
use Source\Funcoes;
require '../../vendor/autoload.php';

$auth = new Autenticacao;
$imoveis = new Imoveis;
$funcoes = new Funcoes;

// Valida se o ID da cidade foi passado via GET
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $idCidade = (int)$_GET['id'];
    $cidade = $imoveis->getCidadeById($idCidade);

    // Verifica se a cidade foi encontrada
    if (!$cidade) {
        $funcoes->criarAlert('Cidade não encontrada', "A cidade informada não existe! Por favor, tente de outra forma", 1);
        $funcoes->exibeAlerta();
        exit;
    }
} else {
    $funcoes->criarAlert('ID inválido', "ID da cidade não foi informado corretamente!", 1);
    $funcoes->exibeAlerta();
    exit;
}
?>

<!doctype html>
<html lang="pt-BR">


<!-- <head> -->
<?php include 'includes/head.php'?>
<!-- </head> -->

<body data-theme="light" class="font-nunito right_icon_toggle">
<div id="wrapper" class="theme-red">

    <!-- Page Loader -->
    <div class="page-loader-wrapper">
        <div class="loader">
            <div class="m-t-30"><img src="../assets/images/logo-icon.svg" width="48" height="48" alt="Iconic"></div>
            <p>Imobiliando o site...</p>
        </div>
    </div>

    <!-- Top navbar div start -->
    <?php include 'includes/top-navbar.php'?>

    <!-- main left menu -->
    <?php include 'includes/left-menu.php'?>

    <!-- rightbar icon div -->
    <?php include 'includes/right-menu.php'?>

       <!-- mani page content body part -->
       <div id="main-content">
        <div class="container-fluid">
            <div class="block-header">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <h2>Editar Cidade</h2>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#" aria-label="Cidade"><i class="fa fa-building"></i></a></li>                            
                            <li class="breadcrumb-item">Cidade</li>
                            <li class="breadcrumb-item active">Editar</li>
                        </ul>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="d-flex flex-row-reverse">
                            <form action="php/deleteCidade.php" method="post">
                                <input type="hidden" name="id" value="<?=$cidade['id']?>">
                                <button type="submit" class="btn btn-outline-danger" disabled><i class="fa fa-trash-o"></i> <span>Excluir</span></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row clearfix">

                <div class="col-md-12">
                    <div class="card">
                        <div class="body">
                            <form action="php/updateCidade.php" method="post">
                            <div class="row clearfix">
                                <!-- TODO: CSRF -->
                                    <input type="hidden" name="id" value="<?=(isset($cidade['id']) ? $cidade['id'] : '')?>">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="nome-bairro">Nome da Cidade</label>
                                            <input class="form-control" type="text" name="cidade" id="nome-cidade" value="<?=(isset($cidade['cidade']) ? $cidade['cidade'] : '')?>">
                                        </div>
                                    </div>
                                    <div class="input-group mb-3 col-sm-6" style="margin-top: 28px;">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text" for="inputGroupSelect01">Estado</label>
                                        </div>
                                        <select class="form-control" id="inputGroupSelect01" name="estado">
                                            <option value="MG">MG</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="url-bairro">Url</label>
                                            <input class="form-control" type="text" id="url-cidade" name="url" value="<?=(isset($cidade['url']) ? $cidade['url'] : '')?>">
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-lg-7">
                                        <div class="mt-4">
                                            <button type="submit" class="btn btn-primary" onclick="loadingAnimation(this)">
                                                <span class="button__text">Salvar</span>
                                            </button>
                                            <a href="listar-cidades.php" class="btn btn-default">Cancelar</a>
                                        </div>
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

<!-- Javascript -->
<script src="../assets/bundles/libscripts.bundle.js"></script>    
<script src="../assets/bundles/vendorscripts.bundle.js"></script>

<!-- page js file -->
<script src="../assets/bundles/mainscripts.bundle.js"></script>
<script src="../../js/pages/forms/dropify.js"></script>
</body>
</html>