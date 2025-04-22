<?php
    use Source\Painel\Imoveis;
    use Source\Painel\Autenticacao;
    require '../../vendor/autoload.php';

    $auth = new Autenticacao;
    $imoveis    = new Imoveis;
    $ordem      = $_SESSION['adm']['imoveis--ordem'];
    $quartos    = $_SESSION['adm']['imoveis--quartos'];
    $banheiros  = $_SESSION['adm']['imoveis--banheiros'];
    $stat       = $_SESSION['adm']['imoveis--status'];
    $cidade     = $_SESSION['adm']['imoveis--cidade'];
    $cat        = $_SESSION['adm']['imoveis--categoria'];
    $busca      = "";
    $buscarCod  = $_SESSION['adm']['imoveis--buscar-por-cod'];

    $exibirImoveis = $imoveis->listaImoveis($ordem);

?>

<!doctype html>
<html lang="pt-BR">

<!-- <head> -->
<?php include 'includes/head.php'?>
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
    <?php include 'includes/top-navbar.php'?>

    <!-- main left menu -->
    <?php include 'includes/left-menu.php'?>

    <!-- rightbar icon div -->
    <?php include 'includes/right-menu.php'?>

    <!-- mani page content body part -->
    <div id="main-content">
        <div class="container-fluid">
            <div class="block-header">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <h2 id="titulo" >Lista de Imóveis</h2>
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#" aria-label="Imovel"><i class="fa fa-home"></i></a></li>                            
                            <li class="breadcrumb-item">Imóveis</li>
                            <li class="breadcrumb-item active">Lista</li>
                        </ul>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="d-flex flex-row-reverse">
                            <div class="page_action">
                                <a href="adicionar-imovel.php" class="btn btn-primary">Adicionar Imóvel</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="body">
                            <form action="" id="tabela-imoveis" method="post">
                                <input type="hidden" id="ordem-lista" name="ordem" value="<?=(!empty($ordem) ? $ordem : 'codigoD')?>">
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-search"></i></span>
                                                </div>
                                                <input value="<?=$busca?>" type="text" class="form-control" id="busca" placeholder="Buscar..." onkeyup="fazerBusca(this.value)">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-code"></i></span>
                                                </div>
                                                <input value="<?=$buscarCod?>" type="number" min="1" max="99999" class="form-control" placeholder="Buscar por código" id="buscar-p-cod" onkeyup="carregaTabela()">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-4 col-sm-6">
                                        <div class="form-group">
                                            <select class="form-control show-tick" id="quartos" onchange="carregaTabela()">
                                                <option value="0" <?=(empty($quartos) ? 'selected' : '')?>>Quartos</option>
                                                <option value="1" <?=($quartos === '1' ? 'selected' : '')?>>1</option>
                                                <option value="2" <?=($quartos === '2' ? 'selected' : '')?>>2</option>
                                                <option value="3" <?=($quartos === '3' ? 'selected' : '')?>>3</option>
                                                <option value="4" <?=($quartos === '4' ? 'selected' : '')?>>4</option>
                                                <option value="5" <?=($quartos === '5' ? 'selected' : '')?>>5</option>
                                                <option value="-" <?=($quartos === '-' ? 'selected' : '')?>>-</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-4 col-sm-6">
                                        <div class="form-group">
                                            <select class="form-control show-tick" id="banheiros" onchange="carregaTabela()">
                                                <option value="0" <?=(empty($banheiros) ? 'selected' : '')?>>Banheiros</option>
                                                <option value="1" <?=($banheiros === '1' ? 'selected' : '')?>>1</option>
                                                <option value="2" <?=($banheiros === '2' ? 'selected' : '')?>>2</option>
                                                <option value="3" <?=($banheiros === '3' ? 'selected' : '')?>>3</option>
                                                <option value="4" <?=($banheiros === '4' ? 'selected' : '')?>>4</option>
                                                <option value="5" <?=($banheiros === '5' ? 'selected' : '')?>>5</option>
                                                <option value="-" <?=($banheiros === '-' ? 'selected' : '')?>>-</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-4 col-sm-6">
                                        <div class="form-group">
                                            <select class="form-control show-tick" id="stat" onchange="carregaTabela()">
                                                <option value="0" <?=($stat === 0 ? 'selected' : '')?>>Status</option>
                                                <option value="Aluguel" <?=($stat === "Aluguel" ? 'selected' : '')?>>Aluguel</option>
                                                <option value="Vendas" <?=($stat === "Vendas" ? 'selected' : '')?>>Vendas</option>
                                                <option value="indisponivel" <?=($stat === "indisponivel" ? 'selected' : '')?>>Indisponível</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-4 col-sm-6">
                                        <div class="form-group">
                                            <select class="form-control show-tick" id="cidade" onchange="carregaTabela()">
                                                    <?php Source\Imoveis::listaCidadesHome(); ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-4 col-sm-6">
                                        <div class="form-group">
                                            <select class="form-control show-tick" id="categoria" onchange="carregaTabela()">
                                                <option value="0" <?=($cat === "0" ? 'selected' : '')?>>Tipo</option>
                                                <option value="apartamento" <?=($cat === "apartamento" ? 'selected' : '')?>>apartamento</option>
                                                <option value="casa" <?=($cat === "casa" ? 'selected' : '')?>>casa</option>
                                                <option value="chacara/sitio" <?=($cat === "Sítio/Chácara" ? 'selected' : '')?>>Chacara/Sítio</option>
                                                <option value="comercial" <?=($cat === "comercial" ? 'selected' : '')?>>comercial</option>
                                                <option value="terreno" <?=($cat === "terreno" ? 'selected' : '')?>>terreno</option>
                                                <option value="sala-comercial" <?=($cat === "Sala-Comercial" ? 'selected' : '')?>>Sala Comercial</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <input type="reset" class="form-control btn btn-outline-secondary" id="reset" onclick="resetForm()">
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-12 col-sm-12 offset-lg-4">
                                        <div class="form-group d-flex align-items-center justify-content-center">
                                            <span>Exibir</span>
                                            <input class="form-control custom-slot" type="number" name="itens-por-pagina" id="itens-p-pag" value="<?=(!empty($_SESSION['adm']['limite']) ? $_SESSION['adm']['limite'] : 12)?>" onchange="onChange(this)">
                                            <span>resultados por página.</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th class="border-top-0" onclick="changeOrder1(this)" value="cod">Código<i class="fa fa-caret-down d-inline"></i></th>
                                        <th class="border-top-0">Imóvel</th>
                                        <!--<th class="border-top-0">Quartos</th> -->
                                        <!--<th class="border-top-0">Banheiros</th> -->
                                        <!--<th class="border-top-0">Garagem</th> -->
                                        <th class="border-top-0">Tipo</th>
                                        <th class="border-top-0 text-center" onclick="changeOrder2(this)" value="valor">Valor<i class="fa fa-caret-down d-inline"></i></th>
                                        <th class="border-top-0">Status</th>
                                        <th class="border-top-0">Ações</th>
                                    </tr>
                                </thead>
                                <tbody id="lista-imoveis">
                                    <?=$exibirImoveis['itens']?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="paginacao">
                        <?=$exibirImoveis['paginacao']?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Javascript -->
<script src="../assets/bundles/libscripts.bundle.js"></script>    
<script src="../assets/bundles/vendorscripts.bundle.js"></script>

<!-- page js file -->
<script src="../assets/bundles/mainscripts.bundle.js"></script>

<!-- Dialog JS UI -->
<script src="../assets/vendor/sweetalert/sweetalert.min.js"></script>
<script src="../assets/js/dialogs.js"></script>

<script>
    function onChange(el){
        el.setAttribute("onblur", "onBlur(this)");
    }

    function onBlur(el){
        carregaTabela();
        el.setAttribute("onblur");
    }

    function fazerBusca(el){
        if(el.length > 3 || el.length === 0){
            carregaTabela();
        }
    }

    function carregaTabela(){
        let valor = document.getElementById('itens-p-pag').value;
        let order = document.getElementById('ordem-lista').value;
        let beds  = document.getElementById('quartos').value;
        let baths = document.getElementById('banheiros').value;
        let stat  = document.getElementById('stat').value;
        let city  = document.getElementById('cidade').value;
        let cat   = document.getElementById('categoria').value;
        let busca = document.getElementById('busca').value;
        let bPCod = document.getElementById('buscar-p-cod').value;
        $.ajax({
            type: "POST",
            url: 'php/getImoveis.php',
            data: {
                value: valor,
                ordem: order,
                quartos: beds,
                banheiros: baths,
                stat: stat,
                cidade: city,
                categoria: cat,
                busca: busca,
                buscarPorCod: bPCod
            },
            dataType: 'json',
            success: function(result){
                if(result.itens != ''){
                    document.getElementById('lista-imoveis').innerHTML = result.itens;
                    document.getElementById('paginacao').innerHTML = result.paginacao;
                }else{
                    document.getElementById('lista-imoveis').innerHTML = '<td colspan="9"><h3 class="text-danger text-center">Não foi possível encontrar nenhum resultado!</h3></td>';
                }
            }
        })
    }

    function changeOrder1(el){
        let order = document.getElementById("ordem-lista").value;
        let tabelaImoveis = document.getElementById('tabela-imoveis');
        switch (el.innerHTML){
            case 'Código<i class="fa fa-caret-down d-inline"></i>':
                order = 'codigoA';
                el.innerHTML = 'Código<i class="fa fa-caret-up d-inline"></i>';
                break;
            case 'Código<i class="fa fa-caret-up d-inline"></i>':
                order = 'codigoD';
                el.innerHTML = 'Código<i class="fa fa-caret-down d-inline"></i>';
                break;
            default:
                order = 'codigoD';
        }
        document.getElementById("ordem-lista").value = order;

        carregaTabela()
    }

    function changeOrder2(el){
        let order = document.getElementById("ordem-lista").value;
        let tabelaImoveis = document.getElementById('tabela-imoveis');
        switch (el.innerHTML){
            case 'Valor<i class="fa fa-caret-down d-inline"></i>':
                order = 'valorA';
                el.innerHTML = 'Valor<i class="fa fa-caret-up d-inline"></i>';
                break;
            case 'Valor<i class="fa fa-caret-up d-inline"></i>':
                order = 'valorD';
                el.innerHTML = 'Valor<i class="fa fa-caret-down d-inline"></i>';
                break;
        }
        document.getElementById('ordem-lista').value = order;

        carregaTabela()
    }
    function resetForm() {
        document.getElementById('itens-p-pag').value = 12;
        document.getElementById('ordem-lista').value = 'codigoD';
        document.getElementById('quartos').value = "0";
        document.getElementById('quartos').selectedIndex[0] = "selected";
        document.getElementById('banheiros').value = "0";
        document.getElementById('banheiros').selectedIndex[0] = "selected";
        document.getElementById('stat').value = "0";
        document.getElementById('stat').selectedIndex[0] = "selected";
        document.getElementById('cidade').value = "0";
        document.getElementById('cidade').selectedIndex[0] = "selected";
        document.getElementById('categoria').value = "0";
        document.getElementById('categoria').selectedIndex[0] = "selected";
        document.getElementById('busca').value = "";
        document.getElementById('buscar-p-cod').value = "";

        carregaTabela();
    }
</script>
</body>
</html>
