<?php

namespace Source;

use Source\Imoveis;
// use Source\Banner;
use Source\Blog;

require 'vendor/autoload.php';

session_start();
?>

<!DOCTYPE html>
<html dir="ltr" lang="pt-BR">

<head>
    <?php
    $page_title = "Encontre seu imóvel - Imobiliária Samar";
    $page_description = "Alugue, compre ou anuncie os melhores imóveis de Varginha, Elói Mendes e região com a Imobiliária Samar";
    include 'head.php';

    ?>
    <!-- <link rel="stylesheet" href="assets/css/home.css"> -->
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

    <link rel="stylesheet" href="assets/css/properties_swiper.css">

</head>

<body>
    <style>
        /* Container must be relative for the overlay to be positioned correctly */
        #bairros-container {
            position: relative;
        }

        .rectangle.overflow-scroll {
            position: relative;
            /* If you want the overlay to cover .rectangle, 
            you might need .rectangle to have position: relative too. 
            But typically one parent with position: relative is enough. */
            /* position: relative; */
            /* Possibly remove overflow-scroll if it clips the overlay */
            /* overflow: visible; */

            .select--box {
                position: relative;
            }
        }

        /* Overlay styling for when no city is selected */
        #bairros-container .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.56);
            display: flex;
            justify-content: center;
            align-items: center;
            /* font-weight: bold; */
            color: #333;
            z-index: 100;
            text-align: start;
            /* pointer-events: none;  <-- See note below */
        }



        /* Estilo para o fundo do popup */
        #popupSpan {
            display: none;
            /* Inicialmente escondido */
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            /* Fundo escuro semi-transparente */
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }

        /* Estilo para o conteúdo do popup */
        #popupContent {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            width: 90%;
            max-width: 500px;
            text-align: center;
            position: relative;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        }

        /* Estilo do botão de fechar */
        #closePopup {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            color: white;
            background-color: red;
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
            transition: background-color 0.3s ease;
            border: none;
        }

        /* Alterar cor para cinza ao passar o mouse */
        #closePopup:hover {
            background-color: gray;
        }

        /* Estilo da imagem */
        #popupImage img {
            width: 100%;
            border-radius: 10px;
        }
    </style>

    <!-- Pop-up de Manutenção -->
    <!-- <div id="popupSpan">
    <div id="popupContent">
        
        <button id="closePopup">X</button>
        
        <div id="popupImage">
            <img src="assets/images/maintenance.jpg" alt="Site em Manutenção">
        </div>
    </div>
</div> -->

    <!-- <script>
    // JavaScript
    document.addEventListener('DOMContentLoaded', function() {
        const popupSpan = document.getElementById('popupSpan');
        const closePopup = document.getElementById('closePopup');
        const popupContent = document.getElementById('popupContent');

        if (popupSpan && closePopup && popupContent) {
            // Exibir popup ao carregar a página
            window.addEventListener('load', function() {
                popupSpan.classList.add('active');
                popupContent.focus();
            });

            // Fechar popup ao clicar no botão "X"
            closePopup.onclick = function() {
                popupSpan.classList.remove('active');
            };

            // Fechar popup ao clicar fora do conteúdo
            popupSpan.onclick = function(event) {
                if (event.target !== popupContent && !popupContent.contains(event.target)) {
                    popupSpan.classList.remove('active');
                }
            };

            // Fechar popup ao pressionar a tecla "Esc"
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    popupSpan.classList.remove('active');
                }
            });
        } else {
            console.error('One or more required elements are missing from the DOM.');
        }
    });
    </script> -->



    <div id="wrapper" class="wrapper clearfix">
        <?php include 'header.php'; ?>
        <section id="customHeroSearch" class="custom-hero-search">
            <!-- Background Image -->
            <div class="custom-banner">
                <img class="responsive-img" loading="lazy" src="assets/images/slider/slide-bg/new-bg.jpg" alt="Fundo">
            </div>

            <!-- Overlay Branco -->
            <div class="custom-overlay"></div>



            <!-- Form Section -->
            <div class="custom-formulario-box">

                <div class="custom-title">
                    <h1>Encontre o melhor imóvel para você!</h1>
                </div>
                <?php include 'search-box.php'; ?>
            </div>
        </section>


        <?php
        function fetchPropertiesByTipo($tipo)
        {
            $destaquesUpdate = new Imoveis;
            // $destaquesUpdate->geraTodosTiposDestaques();

            $cacheFileJson = __DIR__ . "/source/cache/imoveis/destaques_" . md5($tipo) . ".json";

            if (!file_exists($cacheFileJson)) {
                return "<p>⚠️ Nenhum imóvel encontrado para <strong>$tipo</strong>.</p>";
            }

            $jsonData = json_decode(file_get_contents($cacheFileJson), true);

            if (!$jsonData || !isset($jsonData['html'])) {
                return "<p>❌ Erro ao carregar imóveis para <strong>$tipo</strong>.</p>";
            }

            return $jsonData['html'];
        }

        ?>



        <div class="home--properties-carousel">
            <section id="properties-carousel" class="properties-carousel">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="heading heading-2 text-center mb-custom">
                                <h2 class="heading--title">Imóveis <span>recém adicionados</span></h2>
                                <p class="heading--desc"></p>
                            </div>
                            <!-- .heading-title end -->
                        </div>
                        <!-- .col-md-12 end -->
                    </div>
                    <!-- .row end -->
                    <div class="row properties properties-grid" id="destaques">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="swiper properties-swiper">
                                <div class="swiper-wrapper">
                                    
                                    <?= fetchPropertiesByTipo('') ?>
                                </div>

                                <div class="swiper-pagination main-pagination"></div>
                            </div>
                            <!-- .carousel end -->
                        </div>
                        <!-- .col-md-12 -->
                    </div>
                    <!-- .row -->
                </div>
                <!-- .container -->
            </section>
            <!-- Casas -->
            <section id="properties-carousel-casas" class="properties-carousel">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="heading heading-2 text-center mb-custom">
                                <h2 class="heading--title">Casas <span>que você pode amar</span></h2>
                                <p class="heading--desc"></p>
                            </div>
                        </div>
                    </div>
                    <div class="row properties properties-grid" id="casas">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <!-- Parent carousel -->
                            <div class="swiper properties-swiper">
                                <div class="swiper-wrapper">
                                    <!-- PHP should already wrap each card in <div class="swiper-slide">…</div> -->
                                    <?= fetchPropertiesByTipo('casa') ?>
                                </div>

                                <div class="swiper-pagination main-pagination"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <!-- Apartamentos -->
            <section id="properties-carousel-apartamentos" class="properties-carousel">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="heading heading-2 text-center mb-custom">
                                <h2 class="heading--title">Apartamentos <span>que você pode se interessar</span></h2>
                                <p class="heading--desc"></p>
                            </div>
                        </div>
                    </div>
                    <div class="row properties properties-grid" id="apartamentos">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="swiper properties-swiper">
                                <div class="swiper-wrapper">
                                    <!-- PHP should already wrap each card in <div class="swiper-slide">…</div> -->
                                    <?= fetchPropertiesByTipo('apartamento') ?>
                                </div>

                                <div class="swiper-pagination main-pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Terrenos -->
            <section id="properties-carousel-terrenos" class="properties-carousel">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="heading heading-2 text-center mb-custom">
                                <h2 class="heading--title">Terrenos <span>que você pode investir</span></h2>
                                <p class="heading--desc"></p>
                            </div>
                        </div>
                    </div>
                    <div class="row properties properties-grid" id="terrenos">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="swiper properties-swiper">
                                <div class="swiper-wrapper">
                                    <!-- PHP should already wrap each card in <div class="swiper-slide">…</div> -->
                                    <?= fetchPropertiesByTipo('terreno') ?>
                                </div>

                                <div class="swiper-pagination main-pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Comerciais -->
            <section id="properties-carousel-comerciais" class="properties-carousel">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="heading heading-2 text-center mb-custom">
                                <h2 class="heading--title">Pontos Comerciais <span>que podem ser um ótimo negócio</span>
                                </h2>
                                <p class="heading--desc"></p>
                            </div>
                        </div>
                    </div>
                    <div class="row properties properties-grid" id="comerciais">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="swiper properties-swiper">
                                <div class="swiper-wrapper">
                                    <!-- PHP should already wrap each card in <div class="swiper-slide">…</div> -->
                                    <?= fetchPropertiesByTipo('sala-comercial') ?>
                                </div>

                                <div class="swiper-pagination main-pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="blog" class="blog blog-grid">

                <div class="container">
                    <div class="row ">
                        <div class="heading heading-2 text-center pt-40 mb-custom">
                            <h2 class="heading--title">Blog</h2>
                            <p class="heading--desc">Confira nossas últimas postagens!</p>
                        </div>

                        <div class="col">

                            <div class="row blogs-row">
                                <?php
                                $blog = new Blog();
                                $dados = $blog->getThreePosts();

                                if (empty($dados)) {
                                    echo "<p>⚠️ Nenhum post encontrado.</p>";
                                } else {
                                    echo $blog->listaPostsBig($dados);
                                }

                                ?>
                            </div>
                        </div>

                    </div>

                    <div class="col d-flex justify-content-center">
                        <a href="blog" class="btn btn--secondary mt-30">Ver Todos</a>
                    </div>
                    <!-- .row end -->
                    <!-- .row end -->
                </div>
                <!-- .container end -->
            </section>
        </div>


        <?php include 'footer.php'; ?>
        <?php include 'fixed.php'; ?>

    </div>


    <script src="assets/js/plugins.js"></script>
    <script src="assets/js/functions.js"></script>

<script>
        document.addEventListener('DOMContentLoaded', () => {
    // First, fix the structure for sections that don't have swiper-slide wrappers
    document.querySelectorAll('.properties-carousel').forEach((section) => {
        const swiperContainer = section.querySelector('.properties-swiper');
        if (!swiperContainer) return;
        
        const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');
        if (!swiperWrapper) return;
        
        // Check if direct children are property-item links instead of swiper-slides
        const directPropertyItems = swiperWrapper.querySelectorAll(':scope > a.property-item');
        
        if (directPropertyItems.length > 0) {
            // Need to wrap these in swiper-slide divs
            directPropertyItems.forEach((item) => {
                const slideDiv = document.createElement('div');
                slideDiv.className = 'swiper-slide';
                // Extract the item from its current position
                swiperWrapper.removeChild(item);
                // Add it to the new slide div
                slideDiv.appendChild(item);
                // Add the slide div to the wrapper
                swiperWrapper.appendChild(slideDiv);
            });
        }
    });
    
    // Now initialize all swipers with proper pagination
    document.querySelectorAll('.properties-carousel').forEach((carouselSection) => {
        const swiperElement = carouselSection.querySelector('.properties-swiper');
        if (!swiperElement) return;
        
        // Get the specific pagination element for this carousel
        const paginationElement = swiperElement.querySelector('.swiper-pagination');
        
        new Swiper(swiperElement, {
            slidesPerView: 4,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: '.properties-swiper .swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 5000, // 5 seconds between slides
                disableOnInteraction: false, // Continue autoplay after user interaction
                pauseOnMouseEnter: true, // Pause on mouse hover (optional)
            },
            breakpoints: {
                640: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 4
                },
            },
        });
    });

    // Now init each property's image-slider
    document.querySelectorAll('.property-images-swiper').forEach((container) => {
        const prevBtn = container.querySelector('.swiper-button-prev');
        const nextBtn = container.querySelector('.swiper-button-next');
        const pager = container.querySelector('.swiper-pagination');

        new Swiper(container, {
            loop: true,
            spaceBetween: 10,
            navigation: {
                prevEl: prevBtn,
                nextEl: nextBtn,
            },
            pagination: {
                el: pager,
                clickable: true,
            },
        });
    });
});
    </script>




    <script type="text/javascript">
        $(document).ready(function() {
            // Select the element by ID (or class)
            var $categoriaSelect = $('#select-type');

            // Dynamically add the "multiple" attribute
            $categoriaSelect.prop('multiple', true);

            // Clear any pre‑selected option so none is selected
            $categoriaSelect.val(null).trigger('change');

            // Now initialize Select2 with your options
            $categoriaSelect.select2({
                placeholder: 'Categoria',
                allowClear: true,
                language: "pt"
            });

            // Initialize other selects and plugins as usual:
            $('.bairros').select2({
                placeholder: 'Bairro',
                allowClear: true,
                language: "pt",
            });

            // $('.destaques-carousel--item').lightSlider({
            //     item: 1,
            //     slideMargin: 0,
            //     loop: true,
            //     pauseOnHover: true
            // });

            // $('.banner-carousel').lightSlider({
            //     item: 1,
            //     loop: true,
            //     slideMove: 1,
            //     auto: true,
            //     pauseOnHover: true,
            //     pause: 10000,
            //     speed: 1000,
            //     pager: true,
            //     slideMargin: 200,
            //     easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
            //     controls: false
            // });


            // $('.carousel').owlCarousel({
            //     loop: true,
            //     margin: 25,
            //     nav: true,
            //     dots: true,
            //     autoplayHoverPause: true,
            //     responsive: {
            //         0: {
            //             items: 1
            //         },
            //         600: {
            //             items: 2
            //         },
            //         1000: {
            //             items: 3
            //         }
            //     }
            // });


        });
    </script>


    <script>
        // Global cache for bairros options (optional)
        var bairrosCache = {};

        // Functions to show or hide the overlay.
        function showBairrosOverlay() {
            $('#bairros-container .overlay').show();
        }

        function hideBairrosOverlay() {
            $('#bairros-container .overlay').hide();
        }

        function disableBairrosSelect() {
            var $campoBairro = $("#bairros");
            $campoBairro.prop('disabled', true);
            $campoBairro.html('<option value="0">Todos</option>');
            showBairrosOverlay();
        }

        function enableBairrosSelect() {
            var $campoBairro = $("#bairros");
            $campoBairro.prop('disabled', false);
            hideBairrosOverlay();
        }

        // On page load, disable bairros if no cidade is selected.
        $(document).ready(function() {
            var initialCidade = $("#cidade").val();
            if (!initialCidade || initialCidade === "0") {
                disableBairrosSelect();
            }
        });

        $(document).on("change", "#cidade", function() {
            var cidade = $(this).val();
            var $campoBairro = $("#bairros");
            var selectedBairros = $campoBairro.val();

            if (cidade && cidade !== "0") {
                // Show overlay immediately before fetching (or using cache)
                showBairrosOverlay();

                if (bairrosCache.hasOwnProperty(cidade)) {
                    // Use cached result and reinitialize Select2.
                    $campoBairro.html(bairrosCache[cidade]);
                    $campoBairro.select2('destroy').select2({
                        placeholder: 'Bairro',
                        allowClear: true,
                        language: "pt"
                    });
                    if (selectedBairros && selectedBairros.length > 0) {
                        $campoBairro.val(selectedBairros).trigger('change');
                    }
                    $campoBairro.prop('disabled', false);
                    // Hide overlay after processing cached data.
                    hideBairrosOverlay();
                } else {
                    $.ajax({
                        type: "POST",
                        url: 'getBairro.php',
                        data: {
                            cidade: cidade
                        },
                        beforeSend: function() {
                            // Re-show overlay while the AJAX call is running.
                            showBairrosOverlay();
                            $campoBairro.prop('disabled', true);
                        },
                        success: function(result) {
                            // Cache the result for future use.
                            bairrosCache[cidade] = result;
                            $campoBairro.html(result);
                            // Reinitialize the Select2 instance.
                            $campoBairro.select2('destroy').select2({
                                placeholder: 'Bairro',
                                allowClear: true,
                                language: "pt"
                            });
                            if (selectedBairros && selectedBairros.length > 0) {
                                $campoBairro.val(selectedBairros).trigger('change');
                            }
                            $campoBairro.prop('disabled', false);
                        },
                        error: function() {
                            $campoBairro.prop('disabled', true);
                            $campoBairro.html('<option value="">Erro ao carregar bairros</option>');
                        },
                        complete: function() {
                            // Only remove the overlay when ALL steps have been completed.
                            hideBairrosOverlay();
                        }
                    });
                }
            } else {
                disableBairrosSelect();
            }
        });





        // document.addEventListener("DOMContentLoaded", function() {
        //     // Wait until Owl Carousel is fully initialized:
        //     $('.carousel-dots.owl-carousel').on('initialized.owl.carousel', function() {
        //         setTimeout(function() {
        //             let maxHeight = 0;
        //             const items = document.querySelectorAll('.property-item');

        //             // 1. Find the max height
        //             items.forEach(item => {
        //                 const itemHeight = item.offsetHeight;
        //                 if (itemHeight > maxHeight) {
        //                     maxHeight = itemHeight;
        //                 }
        //             });

        //             // 2. Set each property-item's height to the max height
        //             items.forEach(item => {
        //                 item.style.height = maxHeight + 'px';
        //             });

        //         }, 100); // small timeout to ensure images are loaded, or you can use an onload callback
        //     });
        // });
    </script>




    <!-- <script>
        const BASE_URL = '<?= URL_SITE ?>';
    </script> -->
    <script src="assets/js/pages/card_interaction.js"></script>


</body>

</html>