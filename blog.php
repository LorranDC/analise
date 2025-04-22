<?php
    namespace Source;
    use Source\Blog;
    require 'vendor/autoload.php';

    session_start();


    $blog = new Blog;
    $dados = $blog->getPosts();
?>
<!DOCTYPE html>
<html dir="ltr" lang="en-US">

<head>
    <?php
    $page_title = "Samar - Blog";
    include 'head.php';
    ?>
</head>

<body>

    <div id="wrapper" class="wrapper clearfix">
        <?php include 'header.php'; ?>


        <section id="blog" class="blog blog-grid mt-150">
            <div class="container">
                <div class="row mb-50 blogs-row">
                    <?php echo $blog->listaPostsBig($dados)?>

                </div>

            </div>
            <!-- .container end -->
        </section>
        <!-- #blog  end -->

        <?php include 'footer.php'; ?>
        <?php include 'fixed.php'; ?>

    </div>
    <!-- #wrapper end -->

    <!-- Footer Scripts
============================================= -->
    <script src="assets/js/jquery-2.2.4.min.js"></script>
    <script src="assets/js/plugins.js"></script>
    <script src="assets/js/functions.js"></script>
</body>

</html>
