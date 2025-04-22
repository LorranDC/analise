<?php

use Source\Painel\Imoveis;
use Source\Painel\Autenticacao;
use Source\Funcoes;

require '../../vendor/autoload.php';

$auth = new Autenticacao;
$funcoes = new Funcoes;

$id = isset($_GET['id']) ? $_GET['id'] : "";

if (empty($id)) {
    $funcoes->criarAlert("Não foi possível carregar este imóvel!", "Houve algum problma na identificação deste imóvel. Tente de outra forma.", 3);
    $funcoes->exibeAlerta();
    header("Location: index.php");
    exit;
}

$imoveis = new Imoveis;
$imovel = $imoveis->getImovel($id);
$caracteristicas = $imoveis->getCaracteristicas();
$bairros = $imoveis->getBairros($imovel['cidade']);
$imovelCarac = json_decode($imovel['caracteristicas'], true);
$interacoes = $imoveis::contarInteracoes($id);

?>

<!doctype html>
<html lang="pt-BR">
<!-- SweetAlert2 CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">

<!-- SweetAlert2 JS -->
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
                            <h2>Editar Imóvel</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#"><i class="fa fa-home"></i></a></li>
                                <li class="breadcrumb-item">Imóveis</li>
                                <li class="breadcrumb-item active">Editar</li>
                            </ul>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <div class="d-flex flex-row-reverse">

                            </div>
                        </div>
                    </div>
                </div>
                <form action="php/updateImovel.php" id="edit-imovel" method="post" enctype="multipart/form-data">



                    <input type="hidden" name="id" value="<?= $id ?>">
                    <div class="row clearfix">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="header d-flex flex-row align-items-center">
                                    <h5 class="mr-3 mb-0">Resumo</h5>
                                    


                                    <div class="actions">
                                        <a href="../../imovel?cod=<?= $imovel['codigo'] ?>" target="_blank" class="btn btn-sm btn-icon btn-pure btn-default on-default button-edit" data-toggle="tooltip" data-original-title="Ver no site"><i class="far fa-eye" aria-hidden="true"></i></a>
                                    </div>
                                    <span class="badge-like badge badge-primary mr-2"><i class="fa fa-heart"></i> Curtidas: <?= $interacoes['like'] ?? 0 ?></span>
                                    <span class="badge-dislike badge badge-danger mr-2"><i class="fa fa-thumbs-down"></i> Não Curtiram: <?= $interacoes['dislike'] ?? 0 ?></span>
                                    <span class="badge-share badge badge-success"><i class="fa fa-share"></i> Compartilhamentos: <?= $interacoes['share'] ?? 0 ?></span>
                                    <ul class="header-dropdown">
                                        <li class="dropdown">
                                            <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"></a>
                                            <ul class="dropdown-menu dropdown-menu-right">
                                                <li>
                                                    <button type="button" class="btn btn-outline-danger" onclick="confirmDelete(<?= $id ?>)">
                                                        <i class="fa fa-trash"></i> Excluir Imóvel
                                                    </button>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div class="body">
                                    <div class="row clearfix">
                                        <div class="input-group col-sm-6 mb-4">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" style="height: 36px;">Tipo*</span>
                                            </div>
                                            <select class="form-control" name="categoria" id="categoria" readonly>
                                                <option value="apartamento" <?= ($imovel['categoria'] === "apartamento" ? "selected" : "") ?>>apartamento</option>
                                                <option value="casa" <?= ($imovel['categoria'] === "casa" ? "selected" : "") ?>>casa</option>
                                                <option value="chacara/sitio" <?= ($imovel['categoria'] === "chacara/sitio" ? "selected" : "") ?>>chacara/sitio</option>
                                                <option value="comercial" <?= ($imovel['categoria'] === "comercial" ? "selected" : "") ?>>comercial</option>
                                                <option value="terreno" <?= ($imovel['categoria'] === "terreno" ? "selected" : "") ?>>terreno</option>
                                                <option value="sala-comercial" <?= ($imovel['categoria'] === "sala-comercial" ? "selected" : "") ?>>Sala Comercial</option>
                                            </select>
                                        </div>

                                        <div class="input-group col-lg-3 col-md-12 col-sm-12">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" style="height: 36px;">Cidade*</span>
                                            </div>
                                            <select class="form-control" name="cidade" id="cidade" onchange="carregaBairros(this)">
                                                <?= $imoveis->listaCidadesParaFiltro($imovel['cidade']); ?>

                                            </select>
                                        </div>
                                        <div class="input-group col-lg-3 col-md-12 col-sm-12">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" style="height: 36px;">Bairro*</span>
                                            </div>
                                            <select class="form-control" name="bairro" id="bairro">
                                                <?php if (!empty($bairros)): ?>
                                                    <?php foreach ($bairros as $bairro): ?>
                                                        <option value="<?= $bairro['id']; ?>" <?= ($bairro['id'] == $imovel['bairro']) ? 'selected' : ''; ?>>
                                                            <?= $bairro['bairro']; ?>
                                                        </option>
                                                    <?php endforeach; ?>
                                                <?php else: ?>
                                                    <option value="">Nenhum bairro encontrado</option>
                                                <?php endif; ?>
                                            </select>

                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <div class="form-line">
                                                    <label for="descricao">Descrição</label>
                                                    <textarea rows="4" class="form-control no-resize" id="descricao" name="descricao"><?= $imovel['descricao']; ?></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 class="mt-4">Informações</h5>
                                    <div class="row clearfix">
                                        <!-- Property Type Radios -->
                                        <div class="col-sm-12">
                                            <div class="mb-2">
                                                <label class="fancy-radio">
                                                    <input type="radio" name="tipo" value="Aluguel" id="radio_aluguel" <?= (strtolower($imovel['tipo']) === 'aluguel') ? 'checked' : '' ?> required>
                                                    <span><i></i>Aluguel</span>
                                                </label>
                                                <label class="fancy-radio">
                                                    <input type="radio" name="tipo" value="Vendas" id="radio_vendas" <?= (strtolower($imovel['tipo']) === 'vendas') ? 'checked' : '' ?>>
                                                    <span><i></i>Vendas</span>
                                                </label>
                                            </div>
                                        </div>

                                        <?php
                                        // Fetch the linked property record (if any)
                                        $linkedImovel = \Source\Imoveis::getLinkedImovel($id);

                                        // For a property of type "Aluguel", the linked property should be the one for sale
                                        // For a property of type "Vendas", the linked property should be the one for rental
                                        if (strtolower($imovel['tipo']) === 'aluguel') {
                                            $linkedId  = $linkedImovel ? $linkedImovel->id_venda : '';
                                            $linkLabel = 'Disponível para venda: (Marque se este imóvel estiver disponível para venda e insira o ID do imóvel de venda)';
                                        } elseif (strtolower($imovel['tipo']) === 'vendas') {
                                            $linkedId  = $linkedImovel ? $linkedImovel->id_aluguel : '';
                                            $linkLabel = 'Disponível para locação: (Marque se este imóvel estiver disponível para locação e insira o ID do imóvel de aluguel)';
                                        } else {
                                            $linkedId  = '';
                                            $linkLabel = '';
                                        }
                                        $checked = !empty($linkedId) ? 'checked' : '';
                                        ?>
                                        <div class="col-lg-12">
                                            <div id="linking-section" style="display: block; margin-top: 20px;">
                                                <div class="form-group">
                                                    <label class="fancy-checkbox">
                                                        <input type="checkbox" id="link_checkbox" name="link_imoveis_active" <?= $checked ?>>
                                                        <span id="link-label"><?= $linkLabel ?></span>
                                                    </label>
                                                </div>
                                                <!-- This container will only be visible if the checkbox is checked -->
                                                <div class="form-group" id="linked-imovel-field" style="display: <?= $checked ? 'block' : 'none' ?>;">
                                                    <label for="linked_imovel_id">ID do imóvel vinculado</label>
                                                    <input type="number" id="linked_imovel_id" name="linked_imovel_id" class="form-control w-25" placeholder="Digite o ID do imóvel vinculado" value="<?= $linkedId ?>">
                                                </div>
                                            </div>
                                        </div>

                                        <script>
                                            document.addEventListener('DOMContentLoaded', function() {
                                                const radios = document.querySelectorAll('input[name="tipo"]');
                                                const linkingSection = document.getElementById('linking-section');
                                                const linkLabel = document.getElementById('link-label');
                                                const linkCheckbox = document.getElementById('link_checkbox');
                                                const linkedField = document.getElementById('linked-imovel-field');

                                                function updateLinkingSection() {
                                                    const selectedRadio = document.querySelector('input[name="tipo"]:checked');
                                                    if (selectedRadio) {
                                                        linkingSection.style.display = 'block';
                                                        if (selectedRadio.value.toLowerCase() === 'aluguel') {
                                                            linkLabel.textContent = 'Disponível para venda: (Marque se este imóvel estiver disponível para venda e insira o ID do imóvel de venda)';
                                                        } else if (selectedRadio.value.toLowerCase() === 'vendas') {
                                                            linkLabel.textContent = 'Disponível para locação: (Marque se este imóvel estiver disponível para locação e insira o ID do imóvel de aluguel)';
                                                        }
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

                                                // Initialize the linking section on page load
                                                updateLinkingSection();
                                            });
                                        </script>


                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="valor">Valor*</label>
                                                <input type="text" class="form-control" id="valor" name="valor" value="<?= $imovel['preco'] ?>" placeholder="999.999,99">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="quartos">Quartos</label>
                                                <input type="number" class="form-control" id="quartos" name="quartos" value="<?= $imovel['quartos'] ?>">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="banheiros">Banheiros</label>
                                                <input type="number" class="form-control" id="banheiros" name="banheiros" value="<?= $imovel['banheiros'] ?>">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <span style="font-weight: 600">Possui garagem?</span>
                                                <div class="toggle-switch">
                                                    <span class="label">Não</span>
                                                    <label class="switch">
                                                        <input type="checkbox" <?= $imovel['garagem'] ? "checked" : "" ?> name="garagem">
                                                        <span class="slider"></span>
                                                    </label>
                                                    <span class="label">Sim</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="area-construida">Área Construída</label>
                                                <input type="text" class="form-control" id="area-construida" name="areaC" value="<?= $imovel['areaC'] ?>">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="area-construida">Área do terreno</label>
                                                <input type="text" class="form-control" id="area-terreno" name="areaT" value="<?= $imovel['areaT'] ?>">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="fracao-ideal">Fração ideal</label>
                                                <input type="text" class="form-control" id="fracao-ideal" name="fracao-ideal" value="<?= $imovel['fracao_ideal'] ?>">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="numero">Número</label>
                                                <input type="text" class="form-control" id="numero" name="numero" value="<?= $imovel['numero'] ?>">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="ap">Apartamento</label>
                                                <input type="text" class="form-control" id="ap" name="ap" value="<?= $imovel['ap'] ?>">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="cep">CEP</label>
                                                <input type="text" class="form-control" id="cep" name="cep" value="<?= $imovel['cep'] ?>">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="cod">Código do Imóvel</label>
                                                <input type="text" class="form-control" id="cod" name="cod" value="<?= $imovel['codigo'] ?>" required>
                                            </div>
                                        </div>

                                        <div class="col-lg-2 col-md-4 col-sm-6">
                                            <div class="form-group">
                                                <label for="sala">Sala</label>
                                                <input type="text" class="form-control" id="sala" name="sala" value="<?= $imovel['sala'] ?>">
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="endereco">Endereço</label>
                                                <textarea rows="4" class="form-control no-resize" id="endereco" name="endereco"><?= $imovel['endereco'] ?></textarea>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-12 col-sm-12">
                                            <div class="form-group">
                                                <label for="maps">Link do imóvel no google maps</label>
                                                <input type="text" class="form-control" id="maps" name="maps" value="<?= $imovel['mapa'] ?>">
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-12 col-sm-12">
                                            <div class="form-group">
                                                <label for="video">Link do vídeo do Youtube</label>
                                                <input type="text" class="form-control" id="video" name="video" value="<?= $imovel['video'] ?>">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div id="caracteristicas" class="col-sm-12 col-md-4 col-lg-4">
                                            <h5 class="mt-4">Características</h5>
                                            <div class="col-sm-12">
                                                <div class="mb-2 d-flex flex-column">
                                                    <?php
                                                    foreach ($caracteristicas as $key => $caracteristica) {
                                                        $value = isset($imovelCarac[$caracteristica['id']]) ? $imovelCarac[$caracteristica['id']] : '';
                                                        switch ($caracteristica['permite_valor']) {
                                                            case "0":
                                                                $box = '';
                                                                break;
                                                            case "1":
                                                                $box = '<input type="text" class="form-control carac-value" name="' . $caracteristica['url'] . '_val" value="' . $value . '" placeholder="Quantidade">';
                                                                break;
                                                            case "2":
                                                                $box = '<input type="text" class="form-control carac-value" name="' . $caracteristica['url'] . '_val" value="' . $value . '" placeholder="Valor">';
                                                                break;
                                                            default:
                                                                $box = '';
                                                                break;
                                                        }
                                                        $box = ($caracteristica['url'] === "garagem") ? '<input type="text" class="form-control carac-value" name="' . $caracteristica['url'] . '_val" value="' . $value . '" placeholder="N. de vagas">' : $box;

                                                        $checked = ((!empty($imovelCarac) ? array_key_exists($caracteristica['id'], $imovelCarac) : false) ? "checked" : "");
                                                        echo '<label class="fancy-checkbox">
                                                        <input type="checkbox" ' . $checked . ' name="' . $caracteristica['url'] . '">
                                                        <span>' . htmlspecialchars($caracteristica['caracteristica']) . '</span>
                                                        ' . $box . '
                                                        </label>';
                                                    }
                                                    ?>
                                                    <div class="input-group nova-carac">
                                                        <div class="add-carac input-group">
                                                            <input type="text" class="form-control" id="new-feature" name="nova-caracteristica" placeholder="Nova característica">
                                                            <div class="input-group-append">
                                                                <button class="btn btn-outline-primary" type="button" onclick="createCaracteristica()">Adicionar</button>
                                                            </div>
                                                        </div>
                                                        <div class="allow-value input-group">
                                                            <div class="input-group">
                                                                <div class="input-group-prepend">
                                                                    <label class="input-group-text" for="value-type">Permite Valor?</label>
                                                                </div>
                                                                <select class="custom-select form-control" id="value-type">
                                                                    <option value="0" selected="">Tipo do valor</option>
                                                                    <option value="1">Valor unitário (ex.: 7, 2, 13...)</option>
                                                                    <option value="2">Valor em real (ex.: R$700,00)</option>
                                                                </select>
                                                                <small>deixe "Tipo do valor" selecionado se a característica não permitir valor</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="atributos" class="col-sm-12 col-md-6 col-lg-6 offset-md-2 offset-lg-2 mb-4 d-flex flex-column">
                                            <h5 class="mt-4">Atributos</h5>
                                            <label class="fancy-checkbox">
                                                <input type="checkbox" name="destaque" <?= (!empty($imovel['destaque']) ? " checked" : '') ?>>
                                                <span>Destaque</span>
                                            </label>
                                            <label class="fancy-checkbox">
                                                <input type="checkbox" name="lancamento" <?= (!empty($imovel['lancamento']) ? " checked" : '') ?>>
                                                <span>Lançamento</span>
                                            </label>
                                            <label class="fancy-checkbox">
                                                <input type="checkbox" name="indisponivel" <?= (!empty($imovel['indisponivel']) ? " checked" : '') ?>>
                                                <span>Indisponível</span>
                                            </label>
                                            <label class="fancy-checkbox">
                                                <input type="checkbox" name="reservado" <?= (!empty($imovel['reservado']) ? " checked" : '') ?>>
                                                <span>Reservado</span>
                                            </label>
                                            <label class="fancy-checkbox">
                                                <input type="checkbox" name="valor-a-combinar" <?= (!empty($imovel['valor_a_combinar']) ? " checked" : '') ?>>
                                                <span>Valor a combinar</span>
                                            </label>
                                            <div class="row">
                                                <div id="pontos_proximos" class="col-sm-12 col-md-6 col-lg-6 mb-2 d-flex flex-column">
                                                    <h5 class="mt-4">Pontos Próximos</h5>
                                                    <?php
                                                    // Fetch all pontos_proximos
                                                    $allPontos = $imoveis->getAllPontosProximos();
                                                    // Fetch pontos_proximos linked to the imóvel
                                                    $linkedPontos = $imoveis->getPontosProximosByImovelId($id); // Pass the correct imóvel ID
                                                    foreach ($allPontos as $ponto):
                                                        $isChecked = in_array($ponto->id, array_column($linkedPontos, 'id'));
                                                    ?>
                                                        <label class="fancy-checkbox">
                                                            <input type="checkbox"
                                                                name="pontos_proximos[]"
                                                                value="<?= $ponto->id ?>"
                                                                <?= $isChecked ? 'checked' : '' ?>>

                                                            <span>
                                                                <i class="fas <?= $ponto->icone ?>"></i>
                                                                <?= htmlspecialchars($ponto->estabelecimento) ?>
                                                            </span>
                                                        </label>
                                                    <?php endforeach; ?>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-sm-12">
                                            <h5 class="mt-4">
                                                Fotos*
                                                <small class="ml-4">
                                                    Clique e arraste as fotos para reordená-las.
                                                    <small class="custom-tooltip" data-text="Caso queira reordenar e adicionar novas fotos, primeiro adicione as imagens, SALVE, volte nesta página de edição e finalmente reordene-as.">
                                                        A reordenação não funcionará caso você adicione novas imagens. </small>
                                                </small>
                                            </h5>

                                            <div id="animated-thumbnails" class="list-unstyled row clearfix mt-4">
                                                <?php
                                                $ordem = [];
                                                $images = $imoveis->getImageById($id, 2);
                                                if (!empty($images)) :
                                                    foreach ($images as $key => $image) :
                                                        $index = $key + 1;
                                                        $file_name = explode('/', $image);
                                                        $filename = end($file_name);
                                                        $ordem[$index] = $filename;
                                                        $checked = ($filename === $imovel['foto_dest'] ? "checked" : "");
                                                ?>
                                                        <div class="col-lg-2 col-md-3 col-sm-4 m-b-30 draggable" id="foto-<?= $index ?>">
                                                            <div>
                                                                <div class="widgets">
                                                                    <button type="submit" formaction="php/deleteFile.php" name="image" class="delete custom-tooltip cus-tool-down" data-text="Remover imagem. Cuidado!" value="<?= $filename ?>">
                                                                        <i class="fa fa-fw fa-trash"></i>
                                                                    </button>
                                                                    <label class="fancy-checkbox custom-tooltip cus-tool-down" data-text="Definir como foto de destaque">
                                                                        <input type="checkbox" name="foto_destaque" class="alone-check" value="<?= $filename ?>" <?= $checked ?> onchange="uncheckForbidden(this)">
                                                                        <span></span>
                                                                    </label>
                                                                </div>
                                                                <a class="property-image-item" href="<?= $image ?>">
                                                                    <img class="img-fluid img-thumbnail" src="<?= $image ?>" alt="">
                                                                </a>
                                                            </div>
                                                            <small class="filename" id="filename"><?= $filename ?></small>
                                                        </div>

                                                    <?php
                                                    endforeach;
                                                else :
                                                    ?>
                                                    <span>Nenhuma imagem encontrada</span>
                                                <?php
                                                endif;
                                                ?>
                                            </div>
                                            <div class="col-lg-4 col-md-6 col-sm-12">
                                                <div class="form-group">
                                                    <input class="form-control" id="changevalues" type="text" name="ordem" value="" hidden>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-12 col-sm-12 mt-4">
                                                <h6>Adicionar imagens</h6>
                                                <div class="form-group file-upload">
                                                    <input type="file" name="arquivos[]" id="arquivos" multiple accept=".jpg, .jpeg">
                                                </div>
                                                <small>Apenas .jpg e .jpeg. Use um <a href="https://convert.io/image-converter">conversor de imagens</a> caso necessário.</small>
                                            </div>
                                        </div>

                                        <div class="col-sm-12">
                                            <div class="mt-4">
                                                <button type="button" id="save-button" class="btn btn-primary">Salvar</button>




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

    <!-- Draggable UI Jquery -->
    <link href="https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css" rel="stylesheet">
    <script src="https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
    <!-- page js file -->
    <!-- <script src="../assets/bundles/mainscripts.bundle.js"></script> -->


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
        /* $(function() {  
            $( ".draggable" ).draggable({ snap: true});  
          });   */
    </script>

    <script>
        function carregaBairros(el) {
            let cidade = el.value;
            if (cidade.length > 0) {
                $.ajax({
                    type: "POST",
                    url: 'php/getBairro.php', // Certifique-se de que esta rota retorna bairros corretamente
                    data: {
                        cidade: cidade
                    },
                    success: function(result) {
                        document.getElementById('bairro').innerHTML = result;
                    },
                    error: function() {
                        alert('Erro ao carregar bairros. Tente novamente.');
                    }
                });
            } else {
                document.getElementById('bairro').disabled = true;
            }
        }


        function createCaracteristica() {
            const tipo = document.getElementById("value-type").value;
            const id = "<?php echo $id; ?>";
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
    </script>
    <script type="text/javascript">
        $(function() {
            $("#animated-thumbnails")
                .sortable({
                    handle: "a.property-image-item",
                    update: function(event, ui) {
                        getNames();
                        document.getElementById("arquivos").disabled = true;
                    }
                });
        });


        function getNames() {
            const names = document.getElementsByClassName("filename");
            let allNames = [];
            for (let i = 0; i < names.length; i++) {
                allNames.push(names[i].innerHTML);
            }
            document.getElementById('changevalues').value = allNames;
        }

        function uncheckForbidden(el) {
            const checkboxes = document.getElementsByClassName("alone-check");
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            }
            el.checked = true;
        }

        function setValue(el) {
            el.value = getElementById("filename").innerHTML;
        }
    </script>
    <script>
        document.getElementById('save-button').addEventListener('click', () => {
            const obrig = ['cod', 'categoria', 'cidade', 'bairro', 'tipo'];
            const erros = [];

            obrig.forEach(nome => {
                const el = document.querySelector(`[name="${nome}"]`);
                if (!el || !el.value.trim()) {
                    el?.classList.add('is-invalid');
                    erros.push(`O campo ${nome} é obrigatório.`);
                } else {
                    el.classList.remove('is-invalid');
                }
            });

            if (erros.length) {
                Swal.fire('Erro!', `<ul>${erros.map(e=>`<li>${e}</li>`).join('')}</ul>`, 'error');
                return;
            }

            const formData = new FormData(document.getElementById('edit-imovel'));

            Swal.fire({
                title: 'Enviando…',
                text: 'Aguarde, por favor.',
                icon: 'info',
                allowOutsideClick: false,
                showConfirmButton: false
            });

            fetch('php/updateImovel.php', {
                    method: 'POST',
                    body: formData
                })
                .then(async r => {
                    const ct = r.headers.get('content-type') || '';
                    if (!ct.includes('application/json')) throw new Error((await r.text()).slice(0, 200));
                    return r.json();
                })
                .then(j => {
                    if (j.success) {
                        Swal.fire('Sucesso!', j.message, 'success')
                            .then(() => location.href = 'listar-imoveis.php');
                    } else {
                        const lista = j.errors?.map(e => `<li>${e}</li>`).join('') || j.message;
                        Swal.fire('Erro!', `<ul>${lista}</ul>`, 'error');
                    }
                })
                .catch(e => {
                    console.error(e);
                    Swal.fire('Erro!', 'Não foi possível processar sua solicitação.', 'error');
                });
        });
    </script>

    <script>
        function confirmDelete(id) {
            Swal.fire({
                title: 'Tem certeza?',
                text: "Essa ação não pode ser desfeita!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch('php/deleteImovel.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: `id=${id}`
                        })
                        .then(response => {
                            // First check if response is JSON
                            const contentType = response.headers.get('content-type');
                            if (!contentType || !contentType.includes('application/json')) {
                                return response.text().then(text => {
                                    throw new Error(`Resposta inválida: ${text.substring(0, 100)}`);
                                });
                            }
                            return response.json();
                        })
                        .then(data => {
                            if (data.success) {
                                Swal.fire({
                                    title: 'Excluído!',
                                    text: data.message,
                                    icon: 'success'
                                }).then(() => {
                                    window.location.href = 'listar-imoveis.php';
                                });
                            } else {
                                throw new Error(data.message || 'Erro desconhecido');
                            }
                        })
                        .catch(error => {
                            Swal.fire({
                                title: 'Erro!',
                                html: `Não foi possível excluir o imóvel.<br><small>${error.message}</small>`,
                                icon: 'error'
                            });
                            console.error('Error:', error);
                        });
                }
            });
        }
    </script>

    <!-- stubs silenciosos para o bundle não quebrar -->
    <div id="toggle_btn" style="display:none"></div>
    <div id="search_btn" style="display:none"></div>
    <div id="mobile_btn" style="display:none"></div>

    <!-- stubs p/ IDs que o bundle exige -->
    <script>
        ['#toggle_btn', '#search_btn', '#mobile_btn', '.menu-toggle', '.sidebar-toggle', '.right_icon_toggle']
        .forEach(sel => {
            if (!document.querySelector(sel)) {
                const dummy = document.createElement('div');
                dummy.style.display = 'none';
                if (sel[0] === '#') dummy.id = sel.slice(1);
                else dummy.className = sel.replace(/^\\./, '');
                document.body.appendChild(dummy);
            }
        });
    </script>


    <script src="../assets/bundles/mainscripts.bundle.js"></script>
</body>

</html>