<?php
    use Source\Painel\Imoveis;
    use Source\Ferramentas;
    use Source\Painel\Autenticacao;
    require '../../../vendor/autoload.php';

    $auth = new Autenticacao;

    $imoveis = new Imoveis;
    
    $tipo = isset($_POST['tipo']) ? $_POST['tipo'] : '';
    $caracteristica = isset($_POST['feat']) ? $_POST['feat'] : '';
    $caracteristicas = $imoveis->getCaracteristicas();

    foreach($caracteristicas as $k => $v){
        if($caracteristica === $caracteristicas[$k]['caracteristica']){
            $result = $_POST['fallback'];
            echo $result;
            die;
        }
    }

    $url = Ferramentas::remove_caractere_unico($caracteristica);

    $dados = [
        'caracteristica' => $caracteristica,
        'url'            => $url,
        'permite_valor'  => $tipo,
    ];

    $imoveis->insert('caracteristicas', $dados, 0);
    $caracteristicas = $imoveis->getCaracteristicas();


    if(isset($_POST['imovel_id']) && !empty($_POST['imovel_id'])){
        $imovelID = $_POST['imovel_id'];
        $imovel = $imoveis->getImovel($imovelID);
        $imovelCarac = json_decode($imovel['caracteristicas'], true);
        
        $result = '<h5 class="mt-4">Características</h5>
            <div class="col-sm-12">
                <div class="mb-2 d-flex flex-column">';
        foreach($caracteristicas as $key => $caracteristica){
            $value = isset($imovelCarac[$caracteristica['id']]) ? $imovelCarac[$caracteristica['id']] : '';
            switch($caracteristica['permite_valor']){
                case "0": $box = ''; break;
                case "1": $box = '<input type="text" class="form-control carac-value" name="'.$caracteristica['url'].'_val" value="'.$value.'" placeholder="Quantidade">'; break;
                case "2": $box = '<input type="text" class="form-control carac-value" name="'.$caracteristica['url'].'_val" value="'.$value.'" placeholder="Valor">'; break;
                default: $box = ''; break;
            }
            $box = ($caracteristica['url'] === "garagem") ? '<input type="text" class="form-control carac-value" name="'.$caracteristica['url'].'_val" value="'.$value.'" placeholder="N. de vagas">' : $box;
    
            $checked = ((!empty($imovelCarac) ? array_key_exists($caracteristica['id'], $imovelCarac) : false) ? "checked" : "");
            $result .= '<label class="fancy-checkbox">
            <input type="checkbox" '.$checked.' name="'.$caracteristica['url'].'">
            <span>'.htmlspecialchars($caracteristica['caracteristica']).'</span>
            '.$box.'
            </label>';
        }
        $result .= '
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
    ';
    }else{
        $exibirCaracteristicas = $imoveis->listaCaracteristicas();
        $exibirCaracteristicas .= '<div class="input-group nova-carac">
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
        </div>';
        $result = $exibirCaracteristicas;
    }

    



echo $result;
?>