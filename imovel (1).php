<?php

use Source\Imovel;

require 'vendor/autoload.php';

session_start();

$imovel = $_GET['cod'];
$info = new Imovel;

$detalhesImovel = Imovel::detalhesImovel($imovel);

//$detalhesImagem = Imovel::EscolheImagem($imovel);

if (!isset($imovel) || empty($imovel) || $detalhesImovel['categoria'] === null) {
    echo "<script>alert('Não foi possível encontrar o imóvel! Retornando à página inicial.')</script>";
    echo '<meta http-equiv="refresh" content="0; url=' . BASE_URL . '">';
    exit();
}

$urlAtual = Source\Ferramentas::UrlAtual();
?>

<?php
$updateViews = false;
if (!isset($_COOKIE[$imovel]) && !empty($imovel)) {
    setcookie($imovel, $imovel, time() + 60 * 5);
    $updateViews = true;
}
?>

<!DOCTYPE html>
<html dir="ltr" lang="pt-BR">

<head>
    <?php
    $preis = $detalhesImovel['preco'];
    if (strtolower($detalhesImovel['tipo']) === "aluguel") {
        $preis .= "/mês";
    }
    $page_title = ucfirst($detalhesImovel['categoria'])
        . " por {$preis}  
                        em {$detalhesImovel['cidade']}, {$detalhesImovel['bairro']}";
    $page_description = $detalhesImovel['descricao'];
    $page_image = "assets/images/properties/$imovel/" . $detalhesImovel['foto_destaque'] . "";
    include 'head.php';
    ?>

    <link rel="stylesheet" href="assets/css/simpleLightbox.css">
    <script src="assets/js/simpleLightbox.js"></script>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <script src="https://code.jquery.com/jquery-latest.js"></script>
    <script src="assets/js/lightslider.js"></script>

    <?php
    include 'head.php';
    ?>

</head>

<body>
    <!-- Document Wrapper
	============================================= -->
    <div id="wrapper" class="wrapper clearfix">
        <?php
        include 'header.php';
        ?>

        <!-- Page Title #1
============================================ -->
        <section id="carousel">
            <?= Imovel::carrossel($imovel) ?>
        </section>
        <!-- #page-title end -->

        <!-- property single gallery
============================================= -->
        <section id="property-single-gallery" class="property-single-gallery">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="property-single-gallery-info">
                            <div class="property--info clearfix">
                                <div class="pull-left">
                                    <div class="title-line">
                                        <h5 class="property--title inline-h"> <?php echo $detalhesImovel['categoria'] . " - " . $detalhesImovel['bairro'] ?></h5> <?= $detalhesImovel['reservado'] ?>

                                    </div>
                                    <p class="property--location"><i class="fa fa-map-marker"></i><?php echo $detalhesImovel['endereco'] . $detalhesImovel['numero'] . ". " . $detalhesImovel['sala'] . $detalhesImovel['cidade'] . "/" . $detalhesImovel['estado'] ?></p>
                                </div>
                                <div class="pull-right">
                                    <span class="property--status"><?php echo $detalhesImovel['tipo'] ?></span>
                                    <p class="property--price"><?php echo $detalhesImovel['preco'] . $detalhesImovel['tempo'] ?></p>
                                </div>
                            </div>
                            <!-- .property-info end -->
                            <div class="property--meta clearfix">
                                <div class="pull-left">
                                    <ul class="list-unstyled list-inline mb-0">
                                        <li>
                                            Código do Imóvel: <span class="value"><?php echo $imovel ?></span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="pull-right">
                                    <div class="property--meta-share">
                                        <span class="share--title">compartilhar</span>
                                        <a target="_blank" href="https://twitter.com/intent/tweet?text=&url=<?php echo $urlAtual; ?>" class="twitter"><i class="fa fa-twitter"></i></a>
                                        <a target="_blank" href="https://www.facebook.com/sharer.php?u=<?php echo $urlAtual; ?>&t=Imóvel da Samar" class="facebook"><i class="fa fa-facebook"></i></a>
                                        <a target="_blank" href="https://api.whatsapp.com/send?text=Confira este imóvel: %0D%0A<?php echo $urlAtual; ?>" class="whatsapp-share"><i class="fa fa-whatsapp"></i></a>
                                        <a href="javascript:void(0)" onclick="share()" class="navigator-share"><i class="fa fa-share-nodes"></i></a>
                                    </div>

                                    <script>
                                        function share() {
                                            if (navigator.share !== undefined) {
                                                navigator.share({
                                                        title: 'Compartilhe este imóvel | Samar',
                                                        text: 'Veja este imóvel! Disponível no site da Samar',
                                                        url: '<?php echo $urlAtual; ?>'
                                                    })
                                                    .then(() => console.log("Successful share"))
                                                    .catch((error) => console.log("Error sharing", error));
                                            }
                                        }
                                    </script>
                                    <!-- .property-meta-share end -->
                                </div>
                            </div>
                            <!-- .property-info end -->
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-8">
                        <!-- GALERIA -->
                        <!-- .property-single-desc end -->
                        <div class="property-single-desc inner-box">
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12">
                                    <div class="heading">
                                        <h2 class="heading--title">Descrição</h2>
                                    </div>
                                </div>
                                <?php echo $detalhesImovel['atributos']; ?>
                                <div class="col-xs-12 col-sm-12 col-md-12">
                                    <div class="property--details" style="text-align: justify; text-justify: inter-word;">
                                        <?php echo $detalhesImovel['descricao']; ?>
                                    </div>
                                    <!-- .property-details end -->
                                </div>
                                <!-- .col-md-12 end -->
                            </div>
                            <!-- .row end -->
                        </div>
                        <!-- .property-single-desc end -->

                         <!-- WhatsApp Contact Button -->
                         <div class="widget widget-request">
                            <div class="widget--title">
                                <h5>Gostou deste Imóvel? Fale com a gente! </h5>
                            </div>
                            <div class="widget--content">
                                <?php
                                // Números de WhatsApp para Varginha e condição para Elói Mendes
                                $numerosVarginha = ['5535997045026', '5535997008827'];
                                $numeroEloi = '5535999850105';

                                // Alternância entre os números de Varginha baseada em sessão
                                if (!isset($_SESSION['ultimo_indice'])) {
                                    $_SESSION['ultimo_indice'] = 0;
                                } else {
                                    $_SESSION['ultimo_indice'] = ($_SESSION['ultimo_indice'] + 1) % count($numerosVarginha);
                                }

                                // Seleciona o número com base na cidade do imóvel
                                $numeroWhatsApp = strtolower($detalhesImovel['cidade']) === 'elói mendes' ? $numeroEloi : $numerosVarginha[$_SESSION['ultimo_indice']];

                                // Mensagem padrão para o WhatsApp
                                $mensagemWhatsApp = "Olá, estou interessado no imóvel com o código $imovel. Confira no link: $urlAtual";
                                ?>
                                <a href="https://api.whatsapp.com/send?phone=<?= $numeroWhatsApp ?>&text=<?= urlencode($mensagemWhatsApp) ?>" class="btn btn--secondary btn--block "><i class="fa-brands fa-whatsapp" style="margin-right: 0.5rem;"></i>Contato via whatsapp</a>
                            </div>
                        </div>

                        <div class="property-single-location inner-box">
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12">
                                    <div class="heading">
                                        <h2 class="heading--title">Localização</h2>
                                    </div>
                                </div>
                                <!-- .col-md-12 end -->
                                <div class="col-xs-12 col-sm-12 col-md-12 mb-30">
                                    <div class="col-xs-12 col-sm-12 col-md-12 ml-0 pl-0">
                                        <span>Endereço:</span><?php echo $detalhesImovel['endereco'] . $detalhesImovel['numero'] . $detalhesImovel['ap'] . ". " . $detalhesImovel['sala'] . $detalhesImovel['bairro'] ?>
                                    </div>
                                    <div class="col-xs-6 col-sm-4 col-md-4 ml-0 pl-0">
                                        <span>Bairro:</span><?php echo $detalhesImovel['bairro'] ?>
                                    </div>
                                    <div class="col-xs-6 col-sm-4 col-md-4 ml-0 pl-0">
                                        <span>Cidade:</span><?php echo $detalhesImovel['cidade'] ?>
                                    </div>
                                    <div class="col-xs-6 col-sm-4 col-md-4 ml-0 pl-0">
                                        <span>CEP:</span><?php echo $detalhesImovel['cep'] ?>
                                    </div>
                                </div>
                                <!-- .col-md-12 end -->
                                <?php echo $detalhesImovel['mapa'] ?>

                            </div>
                            <!-- .row end -->
                        </div>
                        <!-- .property-single-location end -->

                        <?= $detalhesImovel['video'] ?>

                        <!-- .property-single-video end -->
                    </div>
                    <!-- .col-md-8 -->

                    <!-- widgets section -->
                    <div class="col-xs-12 col-sm-12 col-md-4">


                        <?php print_r($detalhesImovel['caracteristicas']); ?>

                        <!-- widget request -->
                       

                        <!-- . widget request end -->

                        <!-- widget featured property -->
                        <!-- <div class="widget widget-featured-property">
                            <div class="widget--title">
                                <h5>Imóveis em Destaque</h5>
                            </div>
                            <div class="widget--content">
                                <div class="carousel carousel-dots" data-slide="1" data-slide-rs="1" data-autoplay="true" data-nav="false" data-dots="true" data-space="25" data-loop="true" data-speed="800">
                                    <div class="property-item">
                                        <div class="property--img">
                                            <img src="assets/images/properties/casa-1.jpg" alt="property image" class="img-responsive scaled">
                                            <span class="property--status">Aluga-se</span>
                                        </div>
                                        <div class="property--content">
                                            <div class="property--info">
                                                <h5 class="property--title">casa em Elói Mendes</h5>
                                                <p class="property--location">Cod. B7022, Santa Isabel II</p>
                                                <p class="property--price">R$430<span class="time">mês</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div class="property--img">
                                            <img src="assets/images/properties/casa-2.jpg" alt="property image" class="img-responsive scaled">
                                            <span class="property--status">Aluga-se</span>
                                        </div>
                                        <div class="property--content">
                                            <div class="property--info">
                                                <h5 class="property--title"><a href="#">casa em Varginha</a></h5>
                                                <p class="property--location">Cod. A2831, Treviso, Varginha/MG</p>
                                                <p class="property--price">R$2.100<span class="time">mês</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div class="property--img">
                                            <img src="assets/images/properties/ap-1.jpg" alt="property image" class="img-responsive scaled">
                                            <span class="property--status">À Venda</span>
                                        </div>
                                        <div class="property--content">
                                            <div class="property--info">
                                                <h5 class="property--title"><a href="#">apartamento em Varginha</a></h5>
                                                <p class="property--location">Cod. B2231, Condomínio AA, Varginha/MG</p>
                                                <p class="property--price">R$700.000</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                        <!-- . widget featured property end -->

                    </div>
                    <!-- .col-md-4 -->
                </div>
                <!-- .row -->
            </div>
            <!-- .container -->
        </section>
        <!-- #property-single end -->


        <!-- properties-carousel
============================================= -->
        <!-- relacionados -->
        <!-- #properties-carousel  end  -->

        <!-- cta #1
============================================= -->
        <?php include 'footer.php'; ?>


        <style>
            .owl-item.active {
                background-color: #fff;
                border-radius: 10px;
                overflow: hidden;
                outline: transparent;
                transition: all .3s;
                outline-offset: -1px;
            }

            .owl-item.active:hover {
                outline: 1px solid #ed2529;
                transition: all .3s;
            }
        </style>

    </div>
    <!-- #wrapper end -->

    <!-- Footer Scripts
============================================= -->
    <!-- <script src="assets/js/jquery-2.2.4.min.js"></script> -->
    <script src="assets/js/plugins.js"></script>
    <script src="assets/js/functions.js"></script>

    <!-- <script src="//code.jquery.com/jquery-latest.js"></script> -->
    <script type="text/javascript">
        $(document).ready(function() {
            $('.destaques-carousel--item').lightSlider({
                item: 1,
                slideMargin: 0,
                loop: true,
                pager: true,
                pauseOnHover: true
            });
        });
    </script>

    <script>
        $(document).ready(function() {
            $('.auto-width li a').simpleLightbox();
        });

        <?php /**
         * pequeno workaround para forçar a largura do elemento de autowidth a ter um valor maior de segurança.
         * havia um bug em que a largura era calculada um pouco menor, isso fazia com que a última imagem do carrossel
         * fosse jogada para baixo, e não ficava visível para os usuários. Com esse workaround, a última imagem fica
         * em seu local correto.
         *  */ ?>
        $(window).load(function() {
            setTimeout(function() {
                var autoWidthElement = $('#autoWidth');
                var currentWidth = autoWidthElement.width();
                var newWidth = currentWidth + 50;
                autoWidthElement.width(newWidth);
            }, 100);

            $('#autoWidth').lightSlider({
                autoWidth: true,
                loop: false,
                slideMove: 1,
                auto: true,
                pause: 5000,
                speed: 700,
                keyPress: true,
                pager: true,
                slideMargin: 3
            });
        });
    </script>

    <!-- <script src="//cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.min.js" type="text/javascript" charset="utf-8"></script> -->

</body>

</html>
<?php
if ($updateViews) {
    $info->updateViews($imovel);
}
?>