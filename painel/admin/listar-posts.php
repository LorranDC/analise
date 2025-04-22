<?php

use Source\Painel\Autenticacao;
use Source\Blog;

require '../../vendor/autoload.php';

$auth  = new Autenticacao;
$blog  = new Blog;
$posts = $blog->getPosts();

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
        <div id="main-content" class="blog-page">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <h2>Posts</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="../admin/"><i class="fas fa-newspaper"></i></a></li>
                                <li class="breadcrumb-item">Blog</li>
                                <li class="breadcrumb-item active">Listar</li>
                            </ul>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <div class="d-flex flex-row-reverse">
                                <div class="page_action">
                                    <a href="adicionar-post.php" class="btn btn-primary"><i class="fa fa-plus"></i>&nbsp; Novo Post</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row clearfix">
                    <div class="col-12 left-box blog-grid">
                        <?php
                        $dir = "../../assets/images/blog/";
                        foreach ($posts as $post): ?>
                            <div class="card single_post">
                                <div class="body">
                                    <div class="img-post">
                                        <img class="d-block img-fluid" src="<?= $dir . $post['img'] ?>" alt="First slide">
                                    </div>
                                    <div class="details-post">
                                        <h4 class="title text lines-2"><a href="editar-post.php?url=<?= $post['url'] ?>"><?= $post['titulo'] ?></a></h4>
                                        <p class="text lines-3"><?= $post['descricao'] ?></p>
                                    </div>
                                </div>
                                <div class="d-flex-inline">
                                    <div class="footer d-flex flex-row align-content-center">
                                        <div class="p-2">
                                            <a href="editar-post.php?url=<?= $post['url'] ?>" class="btn btn-sm btn-icon btn-pure btn-default on-default button-edit" data-toggle="tooltip" data-original-title="Editar"><i class="far fa-pen-to-square" aria-hidden="true"></i></a>
                                            <a href="../../post.php?url=<?= $post['url'] ?>" target="_blank" class="btn btn-sm btn-icon btn-pure btn-default on-default button-edit" data-toggle="tooltip" data-original-title="Ver no site"><i class="far fa-eye" aria-hidden="true"></i></a>
                                        </div>
                                        <form method="post" action="php/deletePost.php">
                                            <input type="hidden" name="id" value="<?= $post['id'] ?>">
                                            <button type="button" onclick="confirmAndDelete(<?= $post['id'] ?>);" class="btn btn-danger">
                                                Excluir
                                            </button>

                                        </form>

                                    </div> <!-- end of .footer -->
                                </div> <!-- end of .d-inline-flex -->
                            </div> <!-- end of .card -->
                        <?php endforeach ?>
                    </div> <!-- end of .left-box .blog-gird -->
                </div> <!-- end of row -->

            </div>
        </div>

    </div>

    <!-- Javascript -->
    <script src="../assets/bundles/libscripts.bundle.js"></script>
    <script src="../assets/bundles/vendorscripts.bundle.js"></script>


    <!-- page js file -->
    <script src="../assets/bundles/mainscripts.bundle.js"></script>
    <script>
        function confirmAndDelete(postId) {
            Swal.fire({
                title: 'Tem certeza?',
                text: "Uma vez excluído, você não poderá recuperar este post!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Excluir',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redireciona para o script PHP de exclusão
                    window.location.href = `php/deletePost.php?id=${postId}`;
                }
            });
        }
    </script>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const urlParams = new URLSearchParams(window.location.search);
            const status = urlParams.get('status');
            const message = urlParams.get('message');

            if (status === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: message || 'Operação realizada com sucesso.',
                });
            } else if (status === 'error') {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: message || 'Ocorreu um problema. Tente novamente.',
                });
            }
        });
    </script>


</body>

</html>