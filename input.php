<?php
    namespace Source;
    use Source\Imoveis;
    use Source\Blog;
    require 'vendor/autoload.php';
?>

<!DOCTYPE html>
<html dir="ltr" lang="pt-BR">

<head>
    <?php include 'head.php'; ?>
</head>

<body>

    <div id="wrapper" class="wrapper clearfix">
        <?php include 'header.php'; ?>
        <section id="heroSearch" class="d-flex hero-search mtop-100 pt-0">
            <div class="col-xs-12 col-sm-12 col-md-6 ml-0 mr-0 pl-0 pr-0 banner-home">
                <ul class="banner-carousel">
                    <li><img loading="lazy" src="assets/images/slider/slide-bg/1.webp" alt=""></li>
                    <li><img loading="lazy" src="assets/images/slider/slide-bg/2.webp" alt=""></li>
                    <li><img loading="lazy" src="assets/images/slider/slide-bg/3.webp" alt=""></li>
                    <li><img loading="lazy" src="assets/images/slider/slide-bg/5.webp" alt=""></li>
                    <li><img loading="lazy" src="assets/images/slider/slide-bg/6.webp" alt=""></li>
                    <li><img loading="lazy" src="assets/images/slider/slide-bg/7.webp" alt=""></li>
                </ul>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 formulario-box">
                <div class="form-header container">
                    <div class="slider--content">
                        <div class="text-center">
                            <h1>Encontre o melhor imóvel para você</h1>
                        </div>
                        <?php
                            include 'search-box.php';
                        ?>
                    </div>
                </div>
            </div>
            
        </section>

        <section id="properties-carousel" class="properties-carousel">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="heading heading-2 text-center mb-custom">
                            <h2 class="heading--title">Destaques</h2>
                            <p class="heading--desc">Veja quais imóveis estão em destaque perto de você.</p>
                        </div>
                        <!-- .heading-title end -->
                    </div>
                    <!-- .col-md-12 end -->
                </div>
                <!-- .row end -->
                <div class="row" id="destaques">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="carousel carousel-dots" data-slide="3" data-slide-rs="2" data-autoplay="true" data-nav="false" data-dots="true" data-space="25" data-loop="true" rewind="true" data-speed="800">
                            <?php
                                $imoveis = new Imoveis;

                                $destaques = $imoveis->destaques();

                                echo $destaques;
                            ?>
                        </div>
                        <!-- .carousel end -->
                    </div>
                    <!-- .col-md-12 -->
                </div>
                <!-- .row -->
            </div>
            <!-- .container -->
        </section>

        <section id="blog" class="blog blog-grid">
            
            <div class="container">
                <div class="row ">
                    <div class="heading heading-2 text-center pt-40 mb-custom">
                        <h2 class="heading--title">Blog</h2>
                        <p class="heading--desc">Confira nossas últimas postagens!</p>
                    </div>
                    
                    <?php
                        $blog = new Blog;
                        $dados = $blog->getPosts();
                        echo $blog->listaPostsBig($dados);
                    ?>

                </div>
                <a href="blog">Todas as postagens</a>
                <!-- .row end -->
                <!-- .row end -->
            </div>
            <!-- .container end -->
        </section>

       
        <?php include 'footer.php'; ?>
        <?php include 'fixed.php'; ?>

    </div>
    
    
    <script src="assets/js/plugins.js"></script>
    <script src="assets/js/functions.js"></script>

    <script type="text/javascript">
        $(document).ready(function() {
            $('.destaques-carousel--item').lightSlider({
                item:1,
                slideMargin:0,
                loop:true
            });
            $('.banner-carousel').lightSlider({
                item: 1,
                loop: true,
                slideMove: 1,
                auto: true,
                pauseOnHover: true,
                pause: 10000,
                speed: 1000,
                pager: true,
                slideMargin: 200,
                easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
                controls: false
            });
        });
    </script>
    <script>
        $(document).on("change", "#cidade", function(){
            var cidade = $(this).val();
            var campoBairro = document.getElementById('bairros');
            if(cidade.length > 0){
                $.ajax({
                    type: "POST",
                    url: 'getBairro.php',
                    data: {cidade: cidade},
                    success: function(result){
                        campoBairro.disabled=false;
                        campoBairro.innerHTML=result;
                    }
                })
            }else{
                campoBairro.disabled=true;
                $('.bairros').select2({
                    placeholder: 'Bairro (selecione a cidade primeiro)',
                });
            }
            $('.bairros').select2({
                placeholder: 'Bairro',
                allowClear: true,
                language: "pt",
            });
            
        });

    </script>
</body>
</html>





