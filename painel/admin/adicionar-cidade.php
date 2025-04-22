<?php
require '../../vendor/autoload.php';
use Source\Painel\Autenticacao;
$auth = new Autenticacao();
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
                        <h2>Adicionar Cidade</h2>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#" aria-label="Home"><i class="fa fa-dashboard"></i></a></li>                            
                            <li class="breadcrumb-item">Cidades</li>
                            <li class="breadcrumb-item active">Novo</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="row clearfix">
                <div class="col-md-12">
                    <div class="card">
                        <div class="body">
                            <form action="php/createCidade.php" method="post">
                                <div class="row clearfix">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="nome-cidade">Nome da Cidade</label>
                                            <input type="text" class="form-control" id="nome-cidade" name="cidade">
                                        </div>
                                    </div>
                                    <div class="input-group mb-3 col-sm-6" style="margin-top: 28px;">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text" for="inputGroupSelect01">Estado</label>
                                        </div>
                                        <select class="form-control" id="inputGroupSelect01" name="estado">
                                            <option value="MG" selected="">MG</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-12">
                                        <div class="mt-4">
                                            <button type="submit" class="btn btn-primary" onclick="loadingAnimation(this)">
                                                <span class="button__text">Adicionar</span>
                                            </button>
                                            <a href="listar-cidades" class="btn btn-default">Cancelar</a>
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