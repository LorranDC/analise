<?php

require '../../vendor/autoload.php';

use Source\Painel\Autenticacao;
use Source\Painel\Imoveis;

$auth = new Autenticacao;
$imoveis = new Imoveis;
$stats = $imoveis->getAllstats();

?>

<!doctype html>
<html lang="pt-BR">


<!-- <head> -->
<?php include 'includes/head.php' ?>
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
        <?php include 'includes/top-navbar.php' ?>

        <!-- main left menu -->
        <?php include 'includes/left-menu.php' ?>

        <!-- rightbar icon div -->
        <?php include 'includes/right-menu.php' ?>

        <!-- main page content body part -->
        <!-- oi -->
        <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <h2>Resumo</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="../admin/"><i class="fa fa-dashboard"></i></a></li>
                                <li class="breadcrumb-item">Painel</li>
                                <li class="breadcrumb-item active">Resumo</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row clearfix row-deck">
                    <h2 class="col-12">Ações</h2>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <a href="adicionar-imovel.php" class="card number-chart action-card adicionar">
                            <div class="body">
                                <i class="fa fa-fw fa-lg fa-plus"></i>
                                <span>NOVO IMÓVEL</span>
                            </div>
                        </a>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <a href="listar-imoveis.php" class="card number-chart action-card listar">
                            <div class="body">
                                <i class="fa fa-fw fa-lg fa-bars"></i>
                                <span>LISTAR IMÓVEIS</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="row clearfix row-deck">
                    <h2 class="col-12">Imóveis</h2>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="card number-chart">
                            <div class="body py-3">
                                <span class="text-uppercase">TODOS OS IMÓVEIS</span>
                                <h4 class="mb-0 mt-2"><?= $stats['total-ativo'] ?></h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="card number-chart">
                            <div class="body py-3">
                                <span class="text-uppercase">IMÓVEIS À VENDA </span>
                                <h4 class="mb-0 mt-2"><?= $stats['aluguel-ativo'] ?></h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="card number-chart">
                            <div class="body py-3">
                                <!-- Trocado porque esta trocando sozinho -->
                                <span class="text-uppercase">IMÓVEIS EM ALUGUEL</span>
                                <h4 class="mb-0 mt-2"><?= $stats['vendas-ativo'] ?></h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="card number-chart">
                            <div class="body py-3">
                                <!-- Trocado porque esta trocando sozinho -->
                                <span class="text-uppercase">IMÓVEIS EM VARGINHA</span>
                                <h4 class="mb-0 mt-2"><?= $stats['varginha-ativo'] ?></h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="card number-chart">
                            <div class="body py-3">
                                <span class="text-uppercase">IMÓVEIS EM ELÓI MENDES</span>
                                <h4 class="mb-0 mt-2"><?= $stats['eloi-mendes-ativo'] ?></h4>
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

    <!-- page vendor js file -->
    <script src="../assets/bundles/c3.bundle.js"></script>

    <!-- page js file -->
    <script src="../assets/bundles/mainscripts.bundle.js"></script>
</body>

</html>