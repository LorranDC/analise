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

    ?>
    <!-- Bootstrap 5 -->

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <link rel="stylesheet" href="assets/css/teste_header.css">
    <link rel="stylesheet" href="assets/css/home.css">
    <link href="https://cdn.jsdelivr.net/npm/tom-select@2.4.3/dist/css/tom-select.css" rel="stylesheet">

    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <!-- <link rel="stylesheet" href="assets/css/style.css"> -->


</head>

<body>
    <style>
        .swiper-pagination-bullet {
            background: #000 !important;
            /* Set a contrasting color */
            opacity: 0.7;
        }

        .swiper-pagination-bullet-active {
            background: #ff0000 !important;
            /* Active bullet color */
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
        document.addEventListener('DOMContentLoaded', function () {
            const popupSpan = document.getElementById('popupSpan');
            const closePopup = document.getElementById('closePopup');
            const popupContent = document.getElementById('popupContent');

            if (popupSpan && closePopup && popupContent) {
                // Exibir popup ao carregar a página
                window.addEventListener('load', function () {
                    popupSpan.classList.add('active');
                    popupContent.focus();
                });

                // Fechar popup ao clicar no botão "X"
                closePopup.onclick = function () {
                    popupSpan.classList.remove('active');
                };

                // Fechar popup ao clicar fora do conteúdo
                popupSpan.onclick = function (event) {
                    if (event.target !== popupContent && !popupContent.contains(event.target)) {
                        popupSpan.classList.remove('active');
                    }
                };

                // Fechar popup ao pressionar a tecla "Esc"
                document.addEventListener('keydown', function (event) {
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
        <?php include 'teste_header.php'; ?>

        <section id="customHeroSearch" class="custom-hero-search">
            <div class="container-fluid">
                <div class="row">
                    <div class="col d-flex justify-content-center align-items-center">
                        <!-- Background Image -->
                        <!-- <div class="custom-banner">
                            <img  class="img-fluid object-fit-cover" loading="lazy" src="assets/images/slider/slide-bg/new-bg.jpg" alt="Fundo">
                        </div> -->

                        <!-- Overlay Branco -->
                        <div class="custom-overlay"></div>



                        <!-- Form Section -->
                        <div class="custom-formulario-box bg-white">

                            <div class="custom-title">
                                <h1>Encontre o melhor imóvel para você!</h1>
                            </div>
                            <?php
                            include 'search-box.php';
                            ?>
                        </div>

                    </div>
                </div>
            </div>
        </section>


        <?php
        function fetchPropertiesByTipo($tipo)
        {

            $destaque = new Imoveis;

            $destaques = $destaque->geraTodosTiposDestaques();


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

        // Retrieve the HTML content from cache (for example, for all types by passing an empty string)
        $htmlProperties = fetchPropertiesByTipo('');

        // Use a regex to extract all <a ...>...</a> blocks that have the class "property-item"
        $slidesHtml = '';
        if (preg_match_all('/<a\s+[^>]*class="[^"]*\bproperty-item\b[^"]*"[^>]*>.*?<\/a>/is', $htmlProperties, $matches)) {
            foreach ($matches[0] as $propertyItem) {
                $slidesHtml .= '<div class="swiper-slide">' . $propertyItem . '</div>';
            }
        } else {
            $slidesHtml = '<p>Sem imóveis para exibir.</p>';
        }
        ?>



        <section class="properties-carousel py-5">
            <div class="container"> <!-- Bootstrap container to limit the width -->
                <div class="row">
                    <div class="col-12">
                        <h2 class="text-center mb-4">Imóveis Recém Adicionados</h2>
                        <div class="swiper-container"> <!-- or "swiper" if you prefer that class -->
                            <div class="swiper-wrapper">
                            <?php
                            //  echo $slidesHtml; 
                            ?>
                            </div>
                            <!-- Pagination (optional) -->
                            <div class="swiper-pagination"></div>
                            <!-- Navigation buttons (optional) -->
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Casas -->
        <section id="properties-carousel-casas" class="properties-carousel">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="heading heading-2 text-center mb-custom">
                            <h2 class="heading--title">Casas <span>que você pode amar</span></h2>
                            <p class="heading--desc"></p>
                        </div>
                    </div>
                </div>
                <div class="row properties properties-grid" id="casas">
                    <div class="col">
                        <div class="carousel carousel-dots" data-slide="3" data-slide-rs="2" data-autoplay="true"
                            data-nav="false" data-dots="true" data-space="25" data-loop="true" rewind="true"
                            data-speed="800">


                            <?php
                            // echo fetchPropertiesByTipo('casa'); 
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Apartamentos -->
        <section id="properties-carousel-apartamentos" class="properties-carousel">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="heading heading-2 text-center mb-custom">
                            <h2 class="heading--title">Apartamentos <span>que você pode se interessar</span></h2>
                            <p class="heading--desc"></p>
                        </div>
                    </div>
                </div>
                <div class="row properties properties-grid" id="apartamentos">
                    <div class="col">
                        <div class="carousel carousel-dots" data-slide="3" data-slide-rs="2" data-autoplay="true"
                            data-nav="false" data-dots="true" data-space="25" data-loop="true" rewind="true"
                            data-speed="800">


                            <?php
                            // echo fetchPropertiesByTipo('apartamento'); 
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Terrenos -->
        <section id="properties-carousel-terrenos" class="properties-carousel">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="heading heading-2 text-center mb-custom">
                            <h2 class="heading--title">Terrenos <span>que você pode investir</span></h2>
                            <p class="heading--desc"></p>
                        </div>
                    </div>
                </div>
                <div class="row properties properties-grid" id="terrenos">
                    <div class="col">
                        <div class="carousel carousel-dots" data-slide="3" data-slide-rs="2" data-autoplay="true"
                            data-nav="false" data-dots="true" data-space="25" data-loop="true" rewind="true"
                            data-speed="800">


                            <?php
                            // echo fetchPropertiesByTipo('terreno'); 
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Comerciais -->
        <section id="properties-carousel-comerciais" class="properties-carousel">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="heading heading-2 text-center mb-custom">
                            <h2 class="heading--title">Pontos Comerciais <span>que podem ser um ótimo negócio</span>
                            </h2>
                            <p class="heading--desc"></p>
                        </div>
                    </div>
                </div>
                <div class="row properties properties-grid" id="comerciais">
                    <div class="col">
                        <div class="carousel carousel-dots" data-slide="3" data-slide-rs="2" data-autoplay="true"
                            data-nav="false" data-dots="true" data-space="25" data-loop="true" rewind="true"
                            data-speed="800">


                            <?php
                            // echo fetchPropertiesByTipo('sala-comercial'); 
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="blog" class="blog blog-grid">

            <div class="container">
                <div class="row ">
                    <div class="col-12">
                        <div class="heading heading-2 text-center pt-40 mb-custom">
                            <h2 class="heading--title">Blog</h2>
                            <p class="heading--desc">Confira nossas últimas postagens!</p>
                        </div>
                    </div>

                    <div class="col-12">

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


        <?php include 'footer.php'; ?>
        <?php include 'fixed.php'; ?>

    </div>

    <!-- Bootstrap Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/tom-select@2.4.3/dist/js/tom-select.complete.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <!-- <script src="assets/js/plugins.js"></script>
    <script src="assets/js/functions.js"></script> -->

    <script type="text/javascript">
        document.addEventListener("DOMContentLoaded", function() {
            // Initialize Tom Select for the category select (#select-type)
            // Ensure the "multiple" attribute is set (Tom Select will handle multiple selections)
            document.getElementById('select-type').setAttribute('multiple', 'multiple');
            // Clear any pre-selected options
            document.getElementById('select-type').value = null;

            new TomSelect("#select-type", {
                placeholder: 'Categoria',
                allowEmptyOption: true,
                plugins: ['remove_button']
            });

            // Initialize with empty options first
            const bairrosSelect = new TomSelect("#bairros", {
                placeholder: 'Bairro',
                plugins: ['remove_button'],
                onInitialize: function() {
                    this.disable(); // Start disabled until city is selected
                }
            });

            //   // Reset the cidade dropdown to default value ("0")
            //   const cidadeSelect = document.getElementById("cidade");
            //   cidadeSelect.value = "0";
            //   // Optionally trigger the change event to update the bairros select
            //   const event = new Event("change");
            //   cidadeSelect.dispatchEvent(event);
            window.addEventListener('pageshow', function(event) {
                // If the page was restored from cache, force the cidade select to reset
                const cidadeSelect = document.getElementById("cidade");
                // Force a re-render by first clearing the value, then setting it to "0"
                cidadeSelect.value = "";
                cidadeSelect.selectedIndex = 0;
                // Dispatch change so that your bairros update code runs
                setTimeout(() => {
                    cidadeSelect.value = "0";
                    cidadeSelect.dispatchEvent(new Event("change"));
                }, 0);
            });

            //   // Initialize lightSlider for your carousels (jQuery-based)
            //   $('.destaques-carousel--item').lightSlider({
            //     item: 1,
            //     slideMargin: 0,
            //     loop: true,
            //     pauseOnHover: true
            //   });

            //   $('.banner-carousel').lightSlider({
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
            //   });
        });
    </script>

    <script>
        document.getElementById("cidade").addEventListener("change", function() {
            const cidade = this.value;
            const campoBairro = document.getElementById('bairros');

            // Destroy any existing Tom Select instance and clear options
            if (campoBairro.tomselect) {
                campoBairro.tomselect.destroy();
                campoBairro.innerHTML = '';
            }

            if (cidade && cidade !== "0") {
                fetch('getBairro.php', {
                        method: "POST",
                        body: new URLSearchParams({
                            cidade
                        }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                    .then(response => response.text())
                    .then(options => {
                        // Use DOMParser to parse the response so that it becomes proper HTML
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(options, 'text/html');
                        campoBairro.innerHTML = doc.body.innerHTML;

                        // Enable the bairros select
                        campoBairro.disabled = false;

                        // Reinitialize Tom Select on the bairros select
                        let ts = new TomSelect(campoBairro, {
                            placeholder: 'Bairro',
                            allowEmptyOption: true,
                            plugins: ['remove_button'],
                            render: {
                                option: function(data, escape) {
                                    return `<div>${escape(data.text)}</div>`;
                                }
                            }
                        });

                        // Force a refresh of options to ensure the dropdown works
                        ts.refreshOptions(true);

                        // Add an event listener so that when the control is clicked, the dropdown opens
                        ts.control_input.addEventListener('click', function() {
                            ts.open();
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching neighborhoods:', error);
                        campoBairro.innerHTML = '<option value="">Erro ao carregar bairros</option>';
                        campoBairro.disabled = true;
                    });
            } else {
                // No valid city selected: disable bairros select and show default option
                campoBairro.innerHTML = '<option value="0">Todos</option>';
                campoBairro.disabled = true;
                new TomSelect(campoBairro, {
                    placeholder: 'Bairro (selecione a cidade primeiro)',
                    disabled: true,
                    plugins: ['remove_button']
                });
            }

        });
    </script>

    <script>
        const swiper = new Swiper('.swiper-container', {
            // For a horizontal slider (the default), you can remove or change the direction:
            loop: true,
            slidesPerView: 3,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
            },
        });
    </script>

</body>

</html>