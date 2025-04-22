<?php

use Source\Ferramentas;

// Read filter values directly from $_GET
$categoria = isset($_GET['categoria']) ? array_map('strtolower', (array)$_GET['categoria']) : [];
$t         = $_GET['tipo'] ?? "1";  // "1" for Alugar, "2" for Comprar
$range     = $_GET['faixa-preco'] ?? 0;
$cidade    = $_GET['cidade'] ?? 0;   // Use "0" if no cidade is selected

?>
<form action="imoveis.php#properties-list" method="get" class="mb-0">
  <div class="gaius--crate">
    <div class="gaius--tabs">
      <div class="tab-container alugar-js" id="alugar">
        <div class="tab <?= ($t === "1") ? "active" : "" ?>">Alugar</div>
      </div>
      <div class="tab-container comprar-js" id="comprar">
        <div class="tab <?= ($t === "2") ? "active" : "" ?>">Comprar</div>
      </div>
      <!-- Hidden input will pass the tipo value ("1" or "2") -->
      <input type="hidden" name="tipo" class="aluga-compra" id="aluga-compra" value="<?= $t ?>">
      <div class="gaius--divider-1"></div>
      <div class="gaius--divider-2"></div>
    </div>
    <div class="gaius--box">
      <div class="gaius--flex">
        <!-- Categoria -->
        <div class="gaius--form-element">
          <div class="icon">
            <i class="fa fa-home fa-lg fa-fw stroke-transparent"></i>
          </div>
          <div class="rectangle">
            <div class="select--box">
              <i class="fa fa-angle-down"></i>
              <select aria-label="Categoria" name="categoria[]" id="select-type" class="categoria">
                <option class="text-capitalize" value="apartamento" <?= in_array("apartamento", $categoria) ? "selected" : "" ?>>Apartamento</option>
                <option class="text-capitalize" value="casa" <?= in_array("casa", $categoria) ? "selected" : "" ?>>Casa</option>
                <option class="text-capitalize" value="sala-comercial" <?= in_array("sala-comercial", $categoria) ? "selected" : "" ?>>Sala Comercial</option>
                <option class="text-capitalize" value="chácara/sítio" <?= in_array("chácara/sítio", $categoria) ? "selected" : "" ?>>Chácara/Sítio</option>
                <option class="text-capitalize" value="comercial" <?= in_array("comercial", $categoria) ? "selected" : "" ?>>Comercial</option>
                <option value="terreno" <?= in_array("terreno", $categoria) ? "selected" : "" ?>>Terreno</option>
              </select>
            </div>
          </div>
        </div>
        <!-- Cidade -->
        <div class="gaius--form-element">
          <div class="icon">
            <i class="fas fa-city fa-lg fa-fw stroke-transparent"></i>
          </div>
          <div class="rectangle">
            <div class="select--box">
              <i class="fa fa-angle-down"></i>
              <?php
              $t = $_GET['tipo'] ?? "1";
              // Convert "1" => "aluguel", "2" => "vendas"
              $convertedTipo = ($t === "1") ? "aluguel" : "vendas";
              ?>
              <select name="cidade" id="cidade">
                <option value="0">Cidade</option>
                <?php Source\Imoveis::listaCidades($convertedTipo); ?>
              </select>
            </div>
          </div>
        </div>
        <!-- Bairros Field -->
        <div id="bairros-container" class="gaius--form-element" style="position: relative;">
          <div class="icon">
            <i class="fa fa-map-location-dot fa-lg fa-fw stroke-transparent"></i>
          </div>
          <div class="rectangle overflow-scroll">
            <div class="select--box">
              <i class="fa fa-angle-down" style="z-index: 50;"></i>
              <select aria-label="Bairros" name="bairros[]" id="bairros" class="bairros" multiple="multiple">
                <?php
                if (!empty($cidade) && $cidade != 0) {
                  echo Source\Imoveis::listaBairros($cidade);
                }
                ?>
                
              </select>
              
            </div>
            
            <div class="overlay">Selecione a cidade primeiro</div>
          </div>
          
          
          
        </div>
        <!-- Faixa de preço -->
        <div class="gaius--form-element">
          <div class="icon">
            <i class="fa fa-money-bill-wave fa-lg fa-fw stroke-transparent"></i>
          </div>
          <div class="rectangle overflow-scroll">
            <div class="select--box">
              <i class="fa fa-angle-down" style="z-index: 50;"></i>
              <select aria-label="Faixa de preço" name="faixa-preco" id="preco" class="preco">
                <?php include_once 'sliderRangeValues.php'; ?>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div name="botaoBusca">
    <input type="submit" name="submit" class="btn btn--primary btn--block" value="pesquisar">
  </div>
  <div name="buscar-com-cod" class="buscar-com-cod">
    <a class="btn btn--secondary btn--block mb-3" data-toggle="modal" data-target="#exampleModal" style="cursor: pointer;">
      Buscar com código <i class="fa fa-search fa-fw"></i>
    </a>
  </div>
</form>

<script>
  // Function to load cities via AJAX
  function carregarCidades(tipo) {
    $.ajax({
      type: "POST",
      url: 'getCidadeFront.php',
      data: {
        tipo: tipo
      },
      success: function(result) {
        $("#cidade").html(result);
      }
    });
  }
  // Function to load cities and neighborhoods via AJAX
  function carregarCidadesEBairros(tipo) {
    carregarCidades(tipo);
    var cidade = $("#cidade").val();
    $.ajax({
      type: "POST",
      url: 'getBairro.php',
      data: {
        cidade: cidade
      },
      success: function(res) {
        $('#bairros').html(res).prop('disabled', false);
      },
      error: function() {
        $('#bairros').html('<option value="">Erro ao carregar bairros</option>').prop('disabled', true);
      }
    });
  }
  $(document).ready(function() {
    // Set initial active tab based on hidden input value
    var tipoAtual = $("#aluga-compra").val();
    if (!tipoAtual || tipoAtual === "1") {
      $("#alugar .tab").addClass("active");
    } else {
      $("#comprar .tab").addClass("active");
    }
    // Tab click event to toggle between "Alugar" and "Comprar"
    $(".tab-container").on("click", function() {
      var tipo = $(this).attr('id') === 'alugar' ? "1" : "2";
      $("#aluga-compra").val(tipo);
      $(".tab").removeClass("active");
      $(this).find(".tab").addClass("active");
    });
  });
</script>