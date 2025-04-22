<?php

use Source\Ferramentas;

$url = Ferramentas::UrlAtual();
$partes = parse_url($url);
if (!empty($partes['query'])) {
    $vars = [];
    parse_str($partes['query'], $vars);
}
$categoria = (isset($vars['categoria']) ? $vars['categoria'] : '');
$range = isset($_GET['faixa-preco']) ? $_GET['faixa-preco'] : 0;
$t = $_GET['tipo'] ?? "aluguel"; // Define Alugar como padrão

?>
<form action="imoveis.php#properties-list" method="get" class="mb-0">

    <div class="gaius--crate">

        <!-- Tabs Alugar/Comprar -->
        <div class="gaius--tabs">
            <div class="tab-container alugar-js" id="alugar">
                <div class="tab <?= $t == "aluguel" ? "active" : "" ?>">Alugar</div>
            </div>
            <div class="tab-container comprar-js" id="comprar">
                <div class="tab <?= $t == "vendas" ? "active" : "" ?>">Comprar</div>
            </div>
            <input type="hidden" name="tipo" class="aluga-compra" id="aluga-compra" value='<?= $t ?>'>
            <div class="gaius--divider-1"></div>
            <div class="gaius--divider-2"></div>
        </div>

        <!-- Campos do Formulário -->
        <div class="gaius--box">
            <div class="gaius--flex">

                <!-- Categoria -->
                <div class="gaius--form-element">
                    <div class="icon"><i class="fa fa-home fa-lg fa-fw stroke-transparent"></i></div>
                    <div class="rectangle">
                        <div class="select--box">
                            <i class="fa fa-angle-down"></i>
                            <select name="categoria[]" id="select-type" class="form-select">
                                <option value="0" <?= empty($categoria) ? "selected" : '' ?>>Todos</option>
                                <option value="apartamento">Apartamento</option>
                                <option value="casa">Casa</option>
                                <option value="sala-comercial">Sala Comercial</option>
                                <option value="Chácara/Sítio">Chácara/Sítio</option>
                                <option value="comercial">Comercial</option>
                                <option value="terreno">Terreno</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Quartos -->
                <div class="gaius--form-element">
                    <div class="icon"><i class="fa fa-bed fa-lg fa-fw stroke-transparent"></i></div>
                    <div class="rectangle">
                        <input type="number" name="quartos" min="0" placeholder="Quartos" class="form-control" value="<?= htmlspecialchars($_GET['quartos'] ?? '') ?>">
                    </div>
                </div>

                <!-- Garagem -->
                <div class="gaius--form-element">
                    <div class="icon"><i class="fa fa-car fa-lg fa-fw stroke-transparent"></i></div>
                    <div class="rectangle">
                        <div class="select--box">
                            <i class="fa fa-angle-down"></i>
                            <select name="garagem" class="form-select">
                                <option value="">Garagem</option>
                                <option value="1">Com garagem</option>
                                <option value="0">Sem garagem</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Cidade -->
                <div class="gaius--form-element">
                    <div class="icon"><i class="fas fa-city fa-lg fa-fw stroke-transparent"></i></div>
                    <div class="rectangle">
                        <div class="select--box">
                            <i class="fa fa-angle-down"></i>
                            <select name="cidade" id="cidade" class="form-select">
                                <option value="0">Cidade</option>
                                <?php Source\Imoveis::listaCidades($t); ?>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Bairros -->
                <div class="gaius--form-element">
                    <div class="icon"><i class="fa fa-map-location-dot fa-lg fa-fw stroke-transparent"></i></div>
                    <div class="rectangle">
                        <div class="select--box">
                            <i class="fa fa-angle-down"></i>
                            <select name="bairros[]" id="bairros" class="form-select">
                                <option value="0">Todos</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Faixa de Preço -->
                <div class="gaius--form-element">
                    <div class="icon">
                        <i class="fa fa-money-bill-wave fa-lg fa-fw stroke-transparent"></i>
                    </div>
                    <div class="rectangle">
                        <div class="select--box">
                            <i class="fa fa-angle-down"></i>
                            <select name="faixa-preco" id="preco" class="form-select">
                                <?php
                                if (file_exists('sliderRangeValues.php')) {
                                    include 'sliderRangeValues.php';
                                } else {
                                    echo "<option value='0'>Erro ao carregar faixas de preço</option>";
                                }
                                ?>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Botões -->
    <div name="botaoBusca">
        <input type="submit" name="submit" class="btn btn--primary btn--block" value="Pesquisar">
    </div>
    <div name="buscar-com-cod" class="buscar-com-cod text-center">
        <a class="btn btn--secondary btn--block mb-3" data-toggle="modal" data-target="#exampleModal" style="cursor: pointer;">
            Buscar com código <i class="fa fa-search fa-fw"></i>
        </a>
    </div>
</form>

<!-- Scripts -->
<script>
    function carregarCidades(tipo) {
        $.ajax({
            type: "POST",
            url: 'getCidadeFront.php',
            data: {
                tipo: tipo
            },
            success: function(result) {
                $("#cidade").html(result);
                carregarBairros($("#cidade").val());
            }
        });
    }

    function carregarBairros(cidade) {
        if (cidade && cidade !== "0") {
            $.ajax({
                type: "POST",
                url: 'getBairro.php',
                data: {
                    cidade: cidade
                },
                success: function(res) {
                    $('#bairros').html(res).prop('disabled', false);
                }
            });
        } else {
            $('#bairros').html('<option value="0">Todos</option>').prop('disabled', true);
        }
    }

    $(document).ready(function() {
        // Define a tab ativa com base no valor do input hidden
        function atualizarTabs(tipo) {
            $('.tab').removeClass('active'); // Remove todas as classes 'active'
            if (tipo === 'aluguel') {
                $('#alugar .tab').addClass('active');
            } else {
                $('#comprar .tab').addClass('active');
            }
        }

        // Inicializa corretamente com o valor da URL
        let tipoAtual = $('#aluga-compra').val();
        atualizarTabs(tipoAtual);

        // Clique nas abas
        $('.tab-container').on('click', function() {
            let tipo = $(this).attr('id') === 'alugar' ? 'aluguel' : 'vendas';

            // Atualiza o campo oculto
            $("#aluga-compra").val(tipo);

            // Atualiza visualmente as abas
            atualizarTabs(tipo);

            // Carrega cidades conforme o tipo selecionado
            carregarCidades(tipo);
        });

        // Carregar cidades com base no tipo já selecionado ao carregar a página
        carregarCidades(tipoAtual);
    });
</script>