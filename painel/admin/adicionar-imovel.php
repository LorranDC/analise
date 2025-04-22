<?php

use Source\Painel\Imoveis;
use Source\Painel\Autenticacao;

require '../../vendor/autoload.php';

$auth                  = new Autenticacao;
$imoveis               = new Imoveis;
$cidade                = "1";
$exibirBairros         = $imoveis->listaBairrosAsList($cidade);
$exibirCaracteristicas = $imoveis->listaCaracteristicas();

?>

<!doctype html>
<html lang="pt-BR">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>


<!-- <head> -->
<link rel="stylesheet" href="../assets/vendor/select2/select2.css">
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
        <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <h2>Adicionar Imóvel</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#"><i class="fa fa-dashboard"></i></a>
                                </li>
                                <li class="breadcrumb-item">Imóveis</li>
                                <li class="breadcrumb-item active">Novo</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <form action="php/createImovel.php" id="add-imovel" method="post" enctype="multipart/form-data">

                    <div class="row clearfix">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="header">
                                    <h5>Resumo</h5>
                                    <small>*Campos com asterisco são obrigatórios</small>
                                </div>
                                <div class="body">
                                    <div class="row clearfix">
                                        <div class="input-group col-sm-6 mb-4">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" style="height: 36px;">Tipo*</span>
                                            </div>
                                            <select class="form-control" name="categoria" id="categoria">
                                                <option value="apartamento">apartamento</option>
                                                <option value="casa">casa</option>
                                                <option value="chacara/sitio">chacara/sitio</option>
                                                <option value="comercial">comercial</option>
                                                <option value="sala-comercial">sala comercial</option>
                                                <option value="terreno">terreno</option>
                                            </select>
                                        </div>

                                        <div class="input-group col-lg-3 col-md-12 col-sm-12">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" style="height: 36px;">Cidade*</span>
                                            </div>
                                            <select class="form-control" name="cidade" id="cidade"
                                                onchange="carregaBairros(this)">
                                                <?= $imoveis->listaCidadesParaFiltro(); ?>

                                            </select>
                                        </div>
                                        <div class="input-group col-lg-3 col-md-12 col-sm-12">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" style="height: 36px;">Bairro*</span>
                                            </div>
                                            <select class="form-control" name="bairro" id="bairro">
                                                <option value="">Selecione uma cidade primeiro</option>
                                            </select>

                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <label for="descricao">Descrição</label>
                                                    <textarea rows="4" class="form-control no-resize" id="descricao"
                                                        name="descricao"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 class="mt-4">Informações</h5>
                                    <div class="row clearfix">
                                        <!-- Radio buttons for selecting imovel type -->
                                        <!-- Radio Buttons to select property type -->
                                        <div class="col-sm-12">
                                            <div class="mb-2">
                                                <label class="fancy-radio">
                                                    <input type="radio" name="tipo" value="Aluguel" id="aluguel" required data-parsley-errors-container="#error-radio">
                                                    <span><i></i>Aluguel</span>
                                                </label>
                                                <label class="fancy-radio">
                                                    <input type="radio" name="tipo" value="Vendas" id="vendas">
                                                    <span><i></i>Vendas</span>
                                                </label>
                                            </div>
                                        </div>

                                        <!-- Linking Section in the Create Imóvel form -->
                                        <div class="col-lg-12">
                                            <div id="linking-section" style="display: none; margin-top: 20px;">
                                                <div class="form-group">
                                                    <label class="fancy-checkbox">
                                                        <input type="checkbox" id="link_checkbox" name="link_imoveis_active">
                                                        <span id="link-label"></span>
                                                    </label>
                                                </div>
                                                <div class="form-group" id="linked-imovel-field" style="display: none;">
                                                    <label for="linked_imovel_id">ID do imóvel vinculado</label>
                                                    <input type="number" id="linked_imovel_id" name="linked_imovel_id" class="form-control w-25" placeholder="Digite o ID do imóvel vinculado">
                                                </div>
                                            </div>
                                        </div>

                                        <script>
                                            document.addEventListener('DOMContentLoaded', function() {
                                                var radios = document.querySelectorAll('input[name="tipo"]');
                                                var linkingSection = document.getElementById('linking-section');
                                                var linkLabel = document.getElementById('link-label');
                                                var linkCheckbox = document.getElementById('link_checkbox');
                                                var linkedField = document.getElementById('linked-imovel-field');

                                                function updateLinkingSection() {
                                                    var selectedRadio = document.querySelector('input[name="tipo"]:checked');
                                                    if (selectedRadio) {
                                                        linkingSection.style.display = 'block';
                                                        if (selectedRadio.value.toLowerCase() === 'aluguel') {
                                                            linkLabel.textContent = 'Disponível para venda: (Marque se este imóvel estiver disponível para venda e insira o ID do imóvel de venda)';
                                                        } else if (selectedRadio.value.toLowerCase() === 'vendas') {
                                                            linkLabel.textContent = 'Disponível para locação: (Marque se este imóvel estiver disponível para locação e insira o ID do imóvel de aluguel)';
                                                        }
                                                    } else {
                                                        linkingSection.style.display = 'none';
                                                    }
                                                }

                                                // Toggle the linked property field based on the checkbox state
                                                linkCheckbox.addEventListener('change', function() {
                                                    if (this.checked) {
                                                        linkedField.style.display = 'block';
                                                    } else {
                                                        linkedField.style.display = 'none';
                                                        document.getElementById('linked_imovel_id').value = '';
                                                    }
                                                });

                                                radios.forEach(function(radio) {
                                                    radio.addEventListener('change', updateLinkingSection);
                                                });

                                                updateLinkingSection();
                                            });
                                        </script>




                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="valor">Valor*</label>
                                                <input type="text" class="form-control" id="valor" name="valor">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="quartos">Quartos</label>
                                                <input type="number" class="form-control" id="quartos" name="quartos">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="banheiros">Banheiros</label>
                                                <input type="number" class="form-control" id="banheiros"
                                                    name="banheiros">
                                            </div>
                                        </div>

                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <span style="font-weight: 600">Possui garagem?</span>
                                                <div class="toggle-switch">
                                                    <span class="label">Não</span>
                                                    <label class="switch">
                                                        <input type="checkbox" name="garagem">
                                                        <span class="slider"></span>
                                                    </label>
                                                    <span class="label">Sim</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="area-construida">Área Construída</label>
                                                <input type="text" class="form-control" id="areaC" name="areaC">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="area-construida">Área do terreno</label>
                                                <input type="text" class="form-control" id="areaT" name="areaT">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="fracao-ideal">Fração ideal</label>
                                                <input type="text" class="form-control" id="fracao-ideal" name="fracao-ideal">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="numero">Número</label>
                                                <input type="text" class="form-control" id="numero" name="numero">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="ap">Apartamento</label>
                                                <input type="text" class="form-control" id="ap" name="ap">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="cep">CEP</label>
                                                <input type="text" class="form-control" id="cep" name="cep"
                                                    onblur="consultaCEP(this)">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="cod">Código do Imóvel</label>
                                                <input type="number" class="form-control" id="cod" name="cod"
                                                    value="<?= $imoveis->getMaiorCodigo() !== null ? $imoveis->getMaiorCodigo() + 1 : "" ?>">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="sala">Sala</label>
                                                <input type="text" class="form-control" id="sala" name="sala">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="endereco">Endereço</label>
                                                <textarea rows="4" class="form-control no-resize" id="endereco"
                                                    name="endereco"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-12 col-sm-12">
                                            <div class="form-group">
                                                <label for="maps">Link do imóvel no google maps</label>
                                                <input type="text" class="form-control" id="maps" name="maps">
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-12 col-sm-12">
                                            <div class="form-group">
                                                <label for="maps">Link do vídeo do Youtube</label>
                                                <input type="text" class="form-control" id="video" name="video">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div id="caracteristicas" class="col-sm-12 col-md-4 col-lg-4">
                                            <h5 class="mt-4">Características</h5>
                                            <div>
                                                <div class="mb-2 d-flex flex-column" id="show-features">
                                                    <?= $exibirCaracteristicas ?>
                                                    <div class="input-group nova-carac">
                                                        <div class="add-carac input-group">
                                                            <input type="text" class="form-control" id="new-feature"
                                                                name="nova-caracteristica"
                                                                placeholder="Nova característica">
                                                            <div class="input-group-append">
                                                                <button class="btn btn-outline-primary" type="button"
                                                                    onclick="createCaracteristica()">Adicionar</button>
                                                            </div>
                                                        </div>
                                                        <div class="allow-value input-group">
                                                            <div class="input-group">
                                                                <div class="input-group-prepend">
                                                                    <label class="input-group-text"
                                                                        for="value-type">Permite Valor?</label>
                                                                </div>
                                                                <select class="custom-select form-control"
                                                                    id="value-type">
                                                                    <option value="0" selected="">Tipo do valor</option>
                                                                    <option value="1">Valor unitário (ex.: 7, 2, 13...)
                                                                    </option>
                                                                    <option value="2">Valor em real (ex.: R$700,00)
                                                                    </option>
                                                                </select>
                                                                <small>deixe "Tipo do valor" selecionado se a
                                                                    característica não permitir valor</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="atributos"
                                            class="col-sm-12 col-md-6 col-lg-6 offset-md-2 offset-lg-2 mb-2 d-flex flex-column">
                                            <h5 class="mt-4">Atributos</h5>
                                            <label class="fancy-checkbox">
                                                <input type="checkbox" name="destaque">
                                                <span>Destaque</span>
                                            </label>
                                            <label class="fancy-checkbox">
                                                <input type="checkbox" name="lancamento">
                                                <span>Lançamento</span>
                                            </label>
                                            <label class="fancy-checkbox">
                                                <input type="checkbox" name="indisponivel">
                                                <span>Indisponível</span>
                                            </label>
                                            <label class="fancy-checkbox">
                                                <input type="checkbox" name="reservado">
                                                <span>Reservado</span>
                                            </label>
                                            <label class="fancy-checkbox">
                                                <input type="checkbox" name="valor-a-combinar">
                                                <span>Valor a combinar</span>
                                            </label>

                                            <div class="row">
                                                <div id="pontos_proximos"
                                                    class="col-sm-12 col-md-6 col-lg-8 mb-2 d-flex flex-column">
                                                    <h5 class="mt-4">Pontos Próximos</h5>

                                                    <?php
                                                    // Fetch all pontos_proximos
                                                    $allPontos = Imoveis::getAllPontosProximos();
                                                    foreach ($allPontos as $ponto):
                                                    ?>
                                                        <label class="fancy-checkbox">
                                                            <input type="checkbox" name="pontos_proximos[]" value="<?= $ponto->id ?>">
                                                            <span>
                                                                <i class="fa-solid <?= $ponto->icone ?>"></i>
                                                                <?= htmlspecialchars($ponto->estabelecimento) ?>
                                                            </span>
                                                        </label>
                                                    <?php endforeach; ?>



                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-6 col-md-12 col-sm-12">
                                            <h5 class="col-12 mt-4">Fotos*</h5>
                                            <div class="form-group file-upload">
                                                <input type="file" name="arquivos[]" id="arquivos" multiple>
                                            </div>
                                            <div id="image-preview" class="row mt-3"></div> <!-- Div para pré-visualização -->
                                        </div>

                                        <script>
                                            document.addEventListener('DOMContentLoaded', () => {
                                                const fileInput = document.getElementById('arquivos');
                                                const previewContainer = document.getElementById('image-preview');

                                                fileInput.addEventListener('change', () => {
                                                    previewContainer.innerHTML = ''; // Limpa a pré-visualização anterior
                                                    const files = Array.from(fileInput.files);

                                                    if (files.length > 10) {
                                                        Swal.fire('Limite excedido!', 'Você pode enviar no máximo 10 imagens por vez.', 'warning');
                                                        fileInput.value = '';
                                                        return;
                                                    }

                                                    files.forEach((file, index) => {
                                                        if (!file.type.startsWith('image/')) {
                                                            Swal.fire('Arquivo inválido!', 'Por favor, envie apenas arquivos de imagem.', 'error');
                                                            return;
                                                        }

                                                        const reader = new FileReader();
                                                        reader.onload = (e) => {
                                                            const imgContainer = document.createElement('div');
                                                            imgContainer.style.position = 'relative';
                                                            imgContainer.style.display = 'inline-block';
                                                            imgContainer.style.margin = '5px';

                                                            const img = document.createElement('img');
                                                            img.src = e.target.result;
                                                            img.alt = file.name;
                                                            img.style.width = '100px';
                                                            img.style.height = '100px';
                                                            img.style.objectFit = 'cover';
                                                            img.style.border = '1px solid #ddd';
                                                            img.style.borderRadius = '5px';

                                                            const removeButton = document.createElement('button');
                                                            removeButton.textContent = 'X';
                                                            removeButton.style.position = 'absolute';
                                                            removeButton.style.top = '5px';
                                                            removeButton.style.right = '5px';
                                                            removeButton.style.backgroundColor = 'red';
                                                            removeButton.style.color = 'white';
                                                            removeButton.style.border = 'none';
                                                            removeButton.style.borderRadius = '50%';
                                                            removeButton.style.width = '20px';
                                                            removeButton.style.height = '20px';
                                                            removeButton.style.cursor = 'pointer';
                                                            removeButton.style.fontSize = '12px';

                                                            removeButton.addEventListener('click', () => {
                                                                // Remove o arquivo da lista de arquivos
                                                                const updatedFiles = Array.from(fileInput.files).filter((_, i) => i !== index);
                                                                updateFileInput(updatedFiles); // Atualiza o campo de input
                                                                imgContainer.remove(); // Remove o elemento da pré-visualização
                                                            });

                                                            imgContainer.appendChild(img);
                                                            imgContainer.appendChild(removeButton);
                                                            previewContainer.appendChild(imgContainer);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    });
                                                });

                                                function updateFileInput(files) {
                                                    const dataTransfer = new DataTransfer();
                                                    files.forEach(file => dataTransfer.items.add(file));
                                                    fileInput.files = dataTransfer.files;
                                                }
                                            });
                                        </script>

                                    </div>


                                    <div class="col-sm-12">
                                        <div class="mt-4">
                                            <button type="button" id="save-button" class="btn btn-primary">
                                                <span class="button__text">Salvar</span>
                                            </button>


                                            <a href="listar-imoveis.php" class="btn btn-default">Cancelar</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            </form>
        </div>
    </div>

    </div>

    <!-- Javascript -->
    <script src="../assets/bundles/libscripts.bundle.js"></script>
    <script src="../assets/bundles/vendorscripts.bundle.js"></script>

    <!-- page js file -->


    <!-- Máscaras JQuery -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.maskedinput/1.4.1/jquery.maskedinput.min.js" integrity="sha512-d4KkQohk+HswGs6A1d6Gak6Bb9rMWtxjOa0IiY49Q3TeFd5xAzjWXDCBW9RS7m86FQ4RzM2BdHmdJnnKRYknxw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->
    <script src="../assets/vendor/jquery-inputmask/jquery.inputmask.bundle.js"></script>
    <script src="../assets/vendor/select2/select2.js"></script>

    <script type="text/javascript">
        $(document).ready(function() {
            $("#cep").inputmask("99.999-999");
            $("#valor").inputmask('R$ 999.999.999,99', {
                numericInput: true
            });
            $('#bairro').select2();
        });
    </script>

    <script>
        function carregaBairros(el) {
            let cidade = el.value; // Captura o valor da cidade selecionada
            if (cidade) {
                $.ajax({
                    type: "POST",
                    url: 'php/getBairro.php', // Caminho correto para o script PHP que retorna os bairros
                    data: {
                        cidade: cidade
                    }, // Envia o ID da cidade selecionada
                    success: function(result) {
                        // Atualiza o select de bairros com as opções retornadas
                        document.getElementById('bairro').innerHTML = result;
                        document.getElementById('bairro').disabled = false; // Reativa o campo de bairros
                    },
                    error: function() {
                        alert('Erro ao carregar bairros. Tente novamente.');
                    }
                });
            } else {
                // Caso nenhuma cidade seja selecionada, desabilita o campo de bairros
                document.getElementById('bairro').innerHTML = '<option value="">Selecione uma cidade primeiro</option>';
                document.getElementById('bairro').disabled = true;
            }
        }


        function createCaracteristica() {
            const tipo = document.getElementById("value-type").value;
            const id = "";
            const feat = document.getElementById("new-feature").value;
            const fallback = document.getElementById("caracteristicas").innerHTML;
            if (feat.length > 0) {
                $.ajax({
                    type: "POST",
                    url: 'php/createCaracteristica.php',
                    data: {
                        tipo: tipo,
                        feat: feat,
                        imovel_id: id,
                        fallback: fallback
                    },
                    success: function(result) {
                        document.getElementById("caracteristicas").innerHTML = result;
                    }
                })
            }
        }

        function consultaCEP(el) {
            cep = el.value.replace(".", "").replace("_", "").replace("-", "");
            if (cep.length === 8) {
                $.ajax({
                    type: "POST",
                    url: "https://viacep.com.br/ws/" + cep + "/json",
                    dataType: "jsonp",
                    success: function(result) {
                        document.getElementById("endereco").value = result.logradouro;
                    }
                })
            }
        }
    </script>
    <script>
        document.getElementById('save-button').addEventListener('click', function() {
            const form = document.getElementById('add-imovel');
            const formData = new FormData(form);

            Swal.fire({
                title: 'Enviando...',
                text: 'Por favor, aguarde enquanto processamos os dados.',
                icon: 'info',
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            fetch(form.action, {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
                    return response.json(); // Converter para JSON
                })
                .then(data => {
                    Swal.close();
                    if (data.success) {
                        Swal.fire({
                            title: 'Sucesso!',
                            text: data.message,
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        }).then(() => {
                            window.location.href = 'listar-imoveis.php';
                        });
                    } else {
                        let errorList = data.errors ? data.errors.map(err => `<li>${err}</li>`).join('') : 'Erro desconhecido.';
                        Swal.fire({
                            title: 'Erro!',
                            html: `<strong>Corrija os seguintes itens:</strong><ul style="text-align:left">${errorList}</ul>`,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                    }
                })
                .catch(error => {
                    console.error('Erro no envio:', error);
                    Swal.close();
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Erro inesperado no servidor. Consulte o administrador.',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                });
        });
    </script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const fileInput = document.getElementById('arquivos');
            const saveButton = document.getElementById('save-button');
            const form = document.getElementById('add-imovel');

            // alerta ao escolher arquivos
            fileInput.addEventListener('change', () => {
                if (fileInput.files.length > 10) {
                    Swal.fire('Limite excedido!',
                        'Você pode enviar no máximo 10 imagens por vez.',
                        'warning');
                    fileInput.value = '';
                }
            });

            // clique em Salvar
            saveButton.addEventListener('click', e => {
                if (fileInput.files.length > 10) {
                    Swal.fire('Erro!',
                        'O limite máximo de 10 imagens foi excedido. Remova algumas antes de continuar.',
                        'error');
                    return; // não envia
                }
                // form.submit(); // envia normalmente
            });
        });
    </script>



    <script src="../assets/bundles/mainscripts.bundle.js"></script>
</body>

</html>