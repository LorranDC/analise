<?php

namespace Source;

use Source\Blog;

require 'vendor/autoload.php';

session_start();

$post = $_GET['url'];
$blog = new Blog;

$detalhesPost = $blog->exibePost($post);

?>

<!DOCTYPE html>
<html dir="ltr" lang="en-US">

<head>
    <?php
    $page_title = $detalhesPost['titulo'] ?? "Samar - Blog";
    $page_description = $detalhesPost['descricao'];
    $page_keywords = $blog->getKeywordsAsString($detalhesPost['keywords']);
    $page_image = $detalhesPost['imagem'];
    include 'head.php';
    ?>
</head>

<body>

    <div id="wrapper" class="wrapper clearfix">
        <?php include 'header.php'; ?>

        <section id="blog" class="blog blog-single pb-70 mt-150">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-8">
                        <!-- Blog Entry -->
                        <div class="blog-entry">
                            <div class="entry--img" style="height: auto;">
                                <img src="<?= $detalhesPost['imagem'] ?>" alt="entry image" />
                            </div>
                            <div class="entry--content">
                                <div class="entry--meta">
                                    <a href="#" aria-label="<?= $detalhesPost['data'] ?>"><?= $detalhesPost['data'] ?></a>
                                </div>
                                <div class="entry--title">
                                    <h1 class=""><?= $detalhesPost['titulo'] ?></h1>
                                </div>
                                <div class="entry--bio">
                                    <?= $detalhesPost['corpo'] ?>
                                </div>
                                <div class="entry--share">
                                    <span class="share--title">Compartilhe essa postagem</span>
                                    <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
                                    <a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
                                    <a href="#" class="instagram"><i class="fa fa-instagram"></i></a>
                                    <a href="#" class="pinterest"><i class="fa fa-pinterest-p"></i></a>
                                </div>
                                <!-- .entry-share end -->
                            </div>
                        </div>
                        <!-- .blog-entry end -->

                    </div>
                    <!-- .col-md-8 end -->
                    <div class="col-xs-12 col-sm-12 col-md-4">
                        <div class="widget widget-search">
                            <div class="widget--title">
                                <h5>Pesquise pelo Blog</h5>
                            </div>
                            <div class="widget--content">
                                <form class="form-search">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Buscar">
                                        <span class="input-group-btn">
                                            <button class="btn" type="button" disabled><i class="fa fa-search"></i></button>
                                        </span>
                                    </div>
                                    <!-- /input-group -->
                                </form>
                            </div>
                        </div>

                        <div class="widget widget-recent-posts">
                            <div class="widget--title">
                                <h5>últimas postagens</h5>
                            </div>
                            <div class="widget--content">
                                <?php
                                $dados = $blog->getPosts();
                                echo $blog->listaPostsMini($dados);
                                ?>
                            </div>
                        </div>

                    </div>
                    <!-- .col-md-4 -->
                </div>

            </div>
            <!-- .container end -->
        </section>

        <?php include 'footer.php'; ?>
        <?php include 'fixed.php'; ?>

    </div>

    <script src="assets/js/jquery-2.2.4.min.js"></script>
    <script src="assets/js/plugins.js"></script>
    <script src="assets/js/functions.js"></script>
</body>

</html>