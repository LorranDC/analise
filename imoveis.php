<?php

namespace Source;

use Source\Imoveis;

require 'vendor/autoload.php';
require_once 'source/Imoveis.php'; // Caminho correto para o arquivo

header('Content-Type: text/html; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

session_start();

// Define the current URL for use in AJAX
$url = $_SERVER['REQUEST_URI'];

// Process GET parameters
$tipo = $_GET['tipo'] ?? ""; // Tipo vazio significa "listar tudo"
// Convert numeric tipo to string if necessary
if ($tipo === "1") {
    $tipo = "aluguel";
} elseif ($tipo === "2") {
    $tipo = "vendas";
}

$categorias = isset($_GET['categoria'])
    ? (is_array($_GET['categoria']) ? $_GET['categoria'] : [$_GET['categoria']])
    : [];

$bairros = (isset($_GET['bairros']) && is_array($_GET['bairros']))
    ? $_GET['bairros']
    : [];

$cidade    = isset($_GET['cidade']) ? $_GET['cidade'] : 0;
$quartos   = isset($_GET['select-beds']) ? $_GET['select-beds'] : 0;
$banheiros = isset($_GET['select-baths']) ? $_GET['select-baths'] : 0;

if (!isset($_GET['valor-a-combinar']) || $_GET['valor-a-combinar'] !== "on") {
    $range = isset($_GET['faixa-preco']) ? $_GET['faixa-preco'] : 0;
} else {
    $range = "a-combinar";
}

$order      = isset($_GET['order']) ? $_GET['order'] : 0;
$_GET['pg'] = isset($_GET['pg']) ? $_GET['pg'] : 1;

$aviso = false;
if ((!empty($banheiros) || !empty($quartos)) && $_GET['pg'] == 1) {
    $aviso = true;
}

?>
<!DOCTYPE html>
<html dir="ltr" lang="pt-BR">

<head>
    <?php
    // Cast $cidade to string for proper match comparison (PHP match is strict)
    $cidadeStr = (string)$cidade;
    // Gera títulos mais descritivos para SEO.
    $localidade = "sua região"; // Valor padrão

    if (strtolower($tipo) === "aluguel") {
        $localidade = match ($cidadeStr) {
            "0" => "Varginha e Elói Mendes",
            "1" => "Varginha",
            "2" => "Elói Mendes",
            default => "Varginha e Elói Mendes",
        };
    } elseif (strtolower($tipo) === "vendas") {
        $localidade = match ($cidadeStr) {
            "0" => "Varginha e região",
            "1" => "Varginha",
            "2" => "Elói Mendes",
            "3" => "São Thomé das Letras",
            "4" => "Três Corações",
            default => "Varginha e região",
        };
    }

    $page_title = match ($tipo) {
        "aluguel" => "Alugue imóveis em {$localidade}",
        "vendas" => "Compre imóveis em {$localidade}",
        default => "Encontre imóveis em {$localidade}",
    };

    $page_title .= " - Imobiliária Samar";
    include 'head.php';
    ?>
    <!-- LightSlider Local CSS -->
    <link rel="stylesheet" href="assets/css/lightslider.css" />

    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>


    <link rel="stylesheet" href="assets/css/properties_swiper.css" />
</head>

<body>
    <style>
        /* Garante que a row use flex para alinhar os cards */
        .row.cards-row {
            display: flex;
            flex-wrap: wrap;

            .col {
                margin-bottom: 2rem;
            }
        }

        /* Faz com que cada coluna cresça com base na maior */
        .cards-row>[class*="col-"] {
            display: flex;
        }

        /* O card ocupa toda a altura da coluna */
        .property-item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            width: 100%;
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
        }

        /* Garante que as imagens fiquem na parte superior */
        .property--img {
            flex-shrink: 0;
        }

        /* O conteúdo central ocupa espaço restante */
        .property--content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        /* Seção com ícones e status */
        .property--features-status {
            margin-top: auto;
        }

        /* Pontos próximos sempre visíveis e alinhados */
        .property--nearby-locations {
            padding: 0px 20px 20px 20px;
            display: flex;
            justify-content: start;
            align-items: center;
            column-gap: 0.2rem;
            row-gap: 0.2rem;
            flex-wrap: wrap;
        }
    </style>

    <!-- Document Wrapper -->
    <div id="wrapper" class="wrapper clearfix">
        <?php
        include 'header.php';
        if ($aviso) {
            echo '<script>$(document).ready(function(){
                      $("#modal-aviso").modal("toggle");
                  });</script>
                <div class="modal fade" id="modal-aviso" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content p-30">
                        <h4>Tente fazer uma busca com menos filtros!</h4>
                        <span>
                            <p>Nosso site está passando por mudanças. Por isso, podem exisitr inconsistências na busca;</p>
                            <p>Você tentou filtrar a busca por imóveis com quartos ou banheiros.
                            <br>A fim de evitar maiores problemas, a busca por quantidade de banheiros está temporiariamente desabilitada.</p>
                            <p>Para obter melhores resultados, tente buscar <b>sem a filtragem de quartos e banheiros</b>.</p>
                        </span>
                    </div>
                </div>
            </div>';
        }
        ?>
        <!-- Hero Search -->
        <section id="heroSearch" class="d-flex hero-search mtop-100 pt-0 pb-0 imoveis">
            <div class="container">
                <div class="row g-4">
                    <div class="col-12 text-center custom-btn-margin">
                        <button id="openSearch" class="btn-custom-search">
                            <i class="fa fa-search"></i> PESQUISA AVANÇADA
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Painel Deslizante com Search Box -->
        <div id="searchPanel" class="search-panel">
            <div class="search-panel-content">
                <button id="closeSearch" class="btn btn-link close-btn">&times;</button>
                <div class="search-box-wrapper">
                    <?php include 'search-box2.php'; ?>
                </div>
            </div>
        </div>

        <!-- properties-list -->
        <section id="properties-list">
            <div class="container">
                <div class="row" id="prop-list">
                    <div class="col-xs-12 col-sm-12 col-md-12 mb-4">
                        <form method="GET" action="imoveis.php" id="filter-form">
                            <div class="row">
                                <div class="col-12 mb-4">
                                    <div class="properties-filter d-flex align-items-center justify-content-start">
                                        <label class="me-3">Ordenar por:</label>
                                        <select id="order" class="form-control form-select me-3" name="order" onchange="document.getElementById('filter-form').submit();" style="width: auto; cursor: pointer;">
                                            <option value="recente" <?= ($_GET['order'] ?? '') === 'recente' ? 'selected' : '' ?>>Mais recente</option>
                                            <option value="maior-valor" <?= ($_GET['order'] ?? '') === 'maior-valor' ? 'selected' : '' ?>>Maior preço</option>
                                            <option value="menor-valor" <?= ($_GET['order'] ?? '') === 'menor-valor' ? 'selected' : '' ?>>Menor preço</option>
                                            <option value="mais-vistos" <?= ($_GET['order'] ?? '') === 'mais-vistos' ? 'selected' : '' ?>>Mais vistos</option>
                                        </select>
                                        <div class="d-flex flex-column align-items-center justify-content-center">
                                            <i class="fa fa-angle-up clickable" style="cursor: pointer; margin-bottom: 2px;"></i>
                                            <i class="fa fa-angle-down clickable" style="cursor: pointer;"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div class="properties properties-grid">
                            <div class="row cards-row">
                                <?php
                                // Lista os imóveis com base nos filtros aplicados
                                Imoveis::listaImoveis(
                                    $tipo,
                                    $categorias,
                                    $cidade,
                                    $bairros,
                                    $quartos,
                                    $banheiros,
                                    $range,
                                    true,
                                    $order
                                );
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- #properties-list end -->

        <?php include 'footer.php'; ?>
        <?php include 'fixed.php'; ?>
    </div>

    <script src="assets/js/plugins.js"></script>
    <script src="assets/js/functions.js"></script>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            
            // Now init *each* property’s image‐slider
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

    <script>
        $(document).ready(function() {
            // $('.destaques-carousel--item').lightSlider({
            //     item: 1,
            //     slideMargin: 0,
            //     loop: true,
            //     pager: false
            // });
            // Ensure the element with id "categoria" exists; adjust if necessary.
            document.addEventListener("DOMContentLoaded", function() {
                const categoriaSelect = document.getElementById("categoria");
                if (categoriaSelect) {
                    categoriaSelect.addEventListener("change", function() {
                        console.log("Categoria selecionada: ", categoriaSelect.value);
                    });
                }
            });
        });
    </script>
    <script>
        function habilitaBairro(cidade) {
            var campoBairro = document.getElementById('bairros');
            if (cidade.length > 0) {
                $.ajax({
                    type: "POST",
                    url: 'getBairro.php',
                    data: {
                        cidade: cidade
                    },
                    success: function(result) {
                        campoBairro.disabled = false;
                        campoBairro.innerHTML = result;
                    }
                });
            } else {
                $('.bairros').select2({
                    placeholder: 'Bairro (selecione a cidade primeiro)',
                });
            }
        }

        $('.bairros').select2({
            placeholder: 'Bairros',
            allowClear: true,
            language: "pt"
        });

        $(document).on("change", "#cidade", function() {
            var cidade = $(this).val();
            habilitaBairro(cidade);
        });

        $(document).on("change", "#order", function() {
            let order = $(this).val();
            if (order.length > 0) {
                $.ajax({
                    type: "POST",
                    url: 'getOrder.php',
                    data: {
                        order: order,
                        url: '<?= $url ?>'
                    },
                    success: function(result) {
                        window.location.href = result;
                    }
                });
            }
        });
    </script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const openSearch = document.getElementById("openSearch");
            const closeSearch = document.getElementById("closeSearch");
            const searchPanel = document.getElementById("searchPanel");

            openSearch.addEventListener("click", () => {
                searchPanel.style.left = "0";
            });

            closeSearch.addEventListener("click", () => {
                searchPanel.style.left = "-100%";
            });

            searchPanel.addEventListener("click", (e) => {
                if (e.target === searchPanel) {
                    searchPanel.style.left = "-100%";
                }
            });

            
        });
    </script>

<script src="assets/js/pages/card_interaction.js"></script>

</body>
<?php
// Uncomment if necessary
// if ($tipo == 'vendas') {
//     echo '<script>
//     let comprar = document.querySelector(".comprar-js");
//     comprar.click();
//     </script>';
// }
?>

</html>