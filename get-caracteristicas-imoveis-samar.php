<?php

function remove_caractere_unico($string)
{
    $url2 = trim($string);
    $url2 = preg_replace("/(á|à|â|ã|ä|Á|À|Â|Ã|Ä)/", "a", $url2);
    $url2 = preg_replace("/(é|è|ê|É|È|Ê)/", "e", $url2);
    $url2 = preg_replace("/(í|ì|Í|Ì)/", "i", $url2);
    $url2 = preg_replace("/(ó|ò|ô|õ|ö|Ó|Ò|Ô|Õ|Ö)/", "o", $url2);
    $url2 = preg_replace("/(ú|ù|ü|Ú|Ù|Ü)/", "u", $url2);
    $url2 = preg_replace("/(ç|Ç)/", "c", $url2);
    $url2 = preg_replace("(/)", "", $url2);
    $url2 = preg_replace("/(-)/", " ", $url2);
    $url2 = preg_replace("/(_)/", " ", $url2);
    $url2 = preg_replace("/[][><}{)(:;,.!?*%~^`&#@]/", "", $url2);
    $url2 = preg_replace("/( )/", "-", $url2);
    $url2 = preg_replace("/(--)/", "-", $url2);
    $url2 = preg_replace("(--)", "-", $url2);
    $url2 = preg_replace("(  | |®|°|¨|$|=|}|{|:|;|§|'|\\\|[+]|[|]|[–])", "", $url2);
    $url2 = preg_replace("(--)", "-", $url2);
    $url2 = strtolower($url2);
    return $url2;
}

function caracteristicas_imoveis_samar()
{
    $pdo = Source\Conexao::getDB();
    if (!$pdo) {
        die('Erro ao criar a conexão');
    } else {
        $count = 0;
        $listarCaracteristicas = $pdo->prepare("SELECT * FROM `caracteristicas` 
        WHERE caracteristica != 'andares' ORDER BY `id` ASC");

        $listarCaracteristicas->execute();

        $caracteristicas = $listarCaracteristicas->fetchAll(PDO::FETCH_ASSOC);


        $listar = $pdo->prepare('SELECT * FROM imoveis ORDER BY id');
        $listar->execute();

        $imoveis = $listar->fetchAll();

        foreach ($imoveis as $imovel) {
            $quant = 0;
            $descricao = remove_caractere_unico($imovel['descricao']);
            $caracteristicasImovel = array();
            echo "Imóvel {$imovel['id']}:<br>
                <ul>";
            foreach ($caracteristicas as $caracteristica) {
                $nomeCaracteristica = $caracteristica['caracteristica'];
                $idCaracteristica = $caracteristica['id'];
                $urlCaracteristica = $caracteristica['url'];
                if (strpos($descricao, $nomeCaracteristica) !== FALSE) {
                    $caracteristicasImovel[$idCaracteristica] = "";
                    echo "<li>{$nomeCaracteristica}</li>";
                    $quant++;
                }
            }
            $json = json_encode($caracteristicasImovel);
            echo "<li>json: $json</li></ul>";

            $count++;

            if ($quant > 0) {
                $set = "SET caracteristicas = '{$json}'";
                $sql = "UPDATE imoveis $set WHERE id = {$imovel['id']}";
                echo $sql . "<br><br>";
                $update = $pdo->prepare($sql);
                $update->execute();
            }
        }

        echo "TOTAL: {$count}";
    }
}
