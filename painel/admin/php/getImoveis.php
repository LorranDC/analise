<?php
    use Source\Painel\Imoveis;
    use Source\Painel\Autenticacao;
    
    require '../../../vendor/autoload.php';
    $auth = new Autenticacao;
    $imoveis = new Imoveis;
    
    $qtdPorPag  = isset($_POST['value']) ? $_POST['value'] : 12;
    $ordem      = isset($_POST['ordem']) ? $_POST['ordem'] : 'codigoD';
    $quartos    = isset($_POST['quartos']) ? $_POST['quartos'] : "0";
    $banheiros  = isset($_POST['banheiros']) ? $_POST['banheiros'] : "0";
    $stat       = isset($_POST['stat']) ? $_POST['stat'] : "0";
    $cidade     = isset($_POST['cidade']) ? $_POST['cidade'] : "0";
    $categoria  = isset($_POST['categoria']) ? $_POST['categoria'] : "0";
    $busca      = isset($_POST['busca']) ? $_POST['busca'] : "";
    $buscarCod  = isset($_POST['buscarPorCod']) ? $_POST['buscarPorCod'] : "";
    
    $_SESSION['adm']['limite']                  = $qtdPorPag;
    $_SESSION['adm']['imoveis--ordem']          = $ordem;
    $_SESSION['adm']['imoveis--quartos']        = $quartos;
    $_SESSION['adm']['imoveis--banheiros']      = $banheiros;
    $_SESSION['adm']['imoveis--status']         = $stat;
    $_SESSION['adm']['imoveis--cidade']         = $cidade;
    $_SESSION['adm']['imoveis--categoria']      = $categoria;
    $_SESSION['adm']['imoveis--busca']          = $busca;
    $_SESSION['adm']['imoveis--buscar-por-cod'] = $buscarCod;
    
    $exibirImoveis = $imoveis->listaImoveis($ordem);

    echo json_encode($exibirImoveis);
?>