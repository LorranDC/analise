<?php
use Source\Painel\Autenticacao;
use Source\Imoveis;

require '../../vendor/autoload.php';

$auth = new Autenticacao;
?>

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
            <div class="block-header">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <h2>Adicionar Bairro</h2>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#"><i class="fa fa-dashboard"></i></a></li>
                            <li class="breadcrumb-item">Bairros</li>
                            <li class="breadcrumb-item active">Novo</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="row clearfix">
                <div class="col-md-12">
                    <div class="card">
                        <div class="body">
                            <?php if (isset($_GET['status']) && $_GET['status'] == 'success'): ?>
                                <div class="alert alert-success">Bairro adicionado com sucesso!</div>
                            <?php elseif (isset($_GET['status']) && $_GET['status'] == 'error'): ?>
                                <div class="alert alert-danger">Erro ao adicionar bairro. Verifique os dados.</div>
                            <?php endif; ?>

                            <form action="php/createBairro.php" method="post">
                                <div class="row clearfix">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="nome-bairro">Nome do Bairro</label>
                                            <input type="text" class="form-control" id="nome-bairro" name="bairro" required>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="inputGroupSelect01">Cidade</label>
                                            <select class="form-control" id="inputGroupSelect01" name="cidade" required>
                                                <?php Source\Imoveis::listaCidades(); ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-12">
                                        <button type="submit" class="btn btn-primary">Adicionar</button>
                                        <a href="listar-bairros.php" class="btn btn-default">Cancelar</a>
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

<!-- Scripts -->
<script src="../assets/bundles/libscripts.bundle.js"></script>
<script src="../assets/bundles/vendorscripts.bundle.js"></script>
<script src="../assets/bundles/mainscripts.bundle.js"></script>
</body>
</html>
