<?php
require '../../vendor/autoload.php';
use Source\Painel\Autenticacao;
use Source\Blog;
$auth = new Autenticacao();

$blog = new Blog;
$post = $blog->exibePost($_GET['url']);
?>

<!doctype html>
<html lang="pt-BR">

<!-- <head> -->
<?php include 'includes/head.php'?>
<link rel="stylesheet" href="../assets/vendor/summernote/summernote.css"/>
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
    <?php include 'includes/top-navbar.php';?>

    <!-- main left menu -->
    <?php include 'includes/left-menu.php';?>

    <!-- rightbar icon div -->
    <?php include 'includes/right-menu.php';?>

    <!-- mani page content body part -->
    <div id="main-content">
        <div class="container-fluid">
            <div class="block-header">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <h2>Novo Post</h2>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#" aria-label="Post"><i class="fas fa-newspaper"></i></a></li>                            
                            <li class="breadcrumb-item">Blog</li>
                            <li class="breadcrumb-item active">Editar</li>
                        </ul>
                    </div>
                </div>
            </div>
            <form action="php/updatePost.php" method="post" enctype="multipart/form-data">
                <input type="hidden" name="id" value="<?=$post['id']?>">
                <div class="row clearfix">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="header">
                                <h2>Editar Post</h2>
                            </div>
                            <div class="body">
                                <div class="form-group col-12" >
                                    <label for="titulo">Título do Post</label>
                                    <input type="text" class="form-control" id="titulo" name="titulo" value="<?=$post['titulo']?>" placeholder="ex.: 10 ideias para melhorar as condições de aluguel do seu imóvel" readonly />
                                </div>
                                <div class="form-group col-12">
                                    <label for="url">URL (Opcional)</label>&nbsp;<small class="text-muted">Deixe em branco para geração automática de URL</small>
                                    <input type="text" class="form-control" id="url" name="url" value="<?=$post['url']?>" placeholder="ex.: 10-ideias-para-melhorar-as-condicoes-de-aluguel-do-seu-imovel" />
                                </div>
                                <div class="form-group col-lg-9 col-md-12 col-sm-12">
                                    <label for="descricao">Descrição</label>
                                    <textarea name="descricao" id="descricao" cols="15" rows="7" class="form-control" required><?=$post['descricao']?></textarea>
                                </div>
                                <div class="m-l-15">
                                    <label for="summernote">Texto</label>
                                    <textarea class="summernote" id="summernote" name="texto">
                                        <?=$post['corpo']?>
                                    </textarea>
                                </div>
                                <div class="form-group col-lg-9 col-md-12 col-sm-12 m-t-30">
                                    <label for="keywords">Keywords Google (Opcional)</label>&nbsp;<small class="text-muted">Deixar esta opção em branco pode diminuir a visibilidade do site no google!</small>
                                    <input type="text" class="form-control" id="keywords" name="keywords" value="<?=implode(", ", $post['keywords'])?>" placeholder="ex.: Aluguel, Economia" />
                                </div>
                                <div class="form-group col-4">
                                    <h6>Imagem</h6>
                                    <img class="img-fluid img-thumbnail" src="../../<?=$post['imagem']?>" alt="Foto do post">
                                </div>
                                <div class="form-group file-upload col-lg-9 col-md-12 col-sm-12 m-t-30 m-l-15">
                                    <label for="foto">Alterar imagem? Arraste aqui o novo arquivo.</label>
                                    <input type="file" name="foto" id="foto">
                                </div>
                                <div class="m-t-30 m-l-15">
                                    <button type="submit" class="btn btn-primary" onclick="loadingAnimation(this)">
                                        <span class="button__text">Salvar</span>
                                    </button>
                                    <a href="listar-posts.php" class="btn btn-outline-secondary">Cancelar</a>
                                </div>
                            </div>
                        </div>
                    </div>            
                </div>
            </form>
        </div>
    </div>
    
</div>

<!-- Javascript -->
<script src="../assets/bundles/libscripts.bundle.js"></script>    
<script src="../assets/bundles/vendorscripts.bundle.js"></script>

<!-- page js file -->
<script src="../assets/bundles/mainscripts.bundle.js"></script>
<script src="../assets/vendor/summernote/summernote.js"></script>

<script>
    jQuery(document).ready(function() {

        $('.summernote').summernote({
            height: 300, // set editor height
            minHeight: null, // set minimum height of editor
            maxHeight: null, // set maximum height of editor
            focus: false, // set focus to editable area after initializing summernote
            popover: { image: [], link: [], air: [] }
        });

        $('.inline-editor').summernote({
            airMode: true
        });

    });

    window.edit = function() {
            $(".click2edit").summernote()
        },
        
    window.save = function() {
        $(".click2edit").summernote('destroy');
    }

</script>
</body>
</html>
