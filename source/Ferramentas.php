<?php

namespace Source;

/* CLASSE DE BUSCA NO SISTEMA */

class Ferramentas {
    /* Função para colocar caracteres na senha no intuito de deixa-la mais forte */

    static public function protege_senha($senha) {
        $codigo_padrao = "$423537*5944*@!&2!";
        $senha_final = $codigo_padrao . md5($senha);
        return $senha_final;
    }

    /* Função para retornar a date no formato brasileiro */
    
    static public function formata_data($data) {
        $explode = explode(" ", $data);
        $explode2 = explode("-", $explode[0]);
        $data = $explode2[2] . "/" . $explode2[1] . "/" . $explode2[0];
        $data_pt = array();
        $explode3 = explode(":", $explode[1]);
        $hora = $explode3[0] . ":" . $explode3[1];
        $data_pt['hora'] = $hora;
        $data_pt['dia'] = $data;
        return $data_pt;
    }
    
    static public function separaExt($img){
        $explode = explode(".", $img);
        $total = count($explode)-1;
        $ext = $explode[$total];
        unset($explode[$total]);
        
        return array("img" => implode("-", $explode), "ext" => $ext);
    }
    
    static public function montaPictureWebp($img, $title, $class=false, $id=false, $rel=false){
        $separa = Ferramentas::separaExt($img);
        $nomeImg    = $separa['img'];
        $extImg     = $separa['ext'];
        $extImg     = (($extImg=='jpg') ? 'jpeg' : $extImg);
        
		$conteudo = "";
		
		if(file_exists($img)){
			$conteudo .=   '<picture>
								<source srcset="'.$nomeImg.'.webp" type="image/webp">
								<source srcset="'.$img.'" type="image/'.$extImg.'">
								<img loading="lazy" src="'.$img.'" alt="'.$title.'" '.(($class != false) ? 'class="'.$class.'"' : '').' '.(($id != false) ? 'id="'.$id.'"' : '').' '.(($rel != false) ? 'rel="'.$rel.'"' : '').'/>
							</picture>';
        }
        return $conteudo;
    }
    
    static public function data_restante($data_termino) {
        $data_agora_int = strtotime(date('Y-m-d 00:00:00'));
        $data_termino_int = strtotime($data_termino);

        $segundos_restante_int = $data_termino_int - $data_agora_int;
        if ($segundos_restante_int < 86400) {
            $data_restante = gmdate("H:i:s", $segundos_restante_int);
        } else {
            $dias = (int) ($segundos_restante_int / 86400);
            $horas = ($segundos_restante_int % 86400);

            $data_restante = $dias . ' dias, ' . gmdate("H:i:s", $horas);
        }
        return $data_restante;
    }

    static public function formata_data_input($data) {
        $explode = explode(" ", $data);
        $data_input = array();
        $explode3 = explode(":", $explode[1]);
        $hora = $explode3[0] . ":" . $explode3[1];
        $data_input['hora'] = $hora;
        $data_input['dia'] = $explode[0];
        return $data_input;
    }

    static function remover_caracter($string) {
        $string = preg_replace("/(á|à|â|ã|ä|Á|À|Â|Ã|Ä)/", "a", $string);
        $string = preg_replace("/(é|è|ê|É|È|Ê)/", "e", $string);
        $string = preg_replace("/(í|ì|Í|Ì)/", "i", $string);
        $string = preg_replace("/(ó|ò|ô|õ|ö|Ó|Ò|Ô|Õ|Ö)/", "o", $string);
        $string = preg_replace("/(ú|ù|ü|Ú|Ù|Ü)/", "u", $string);
        $string = preg_replace("/(ç|Ç)/", "c", $string);
        $string = preg_replace("(/)", "", $string);
        $string = preg_replace("/[][><}{)(:;,.!?*%~^`&#@]/", "", $string);
        $string = preg_replace("/( )/", "-", $string);
        $string = preg_replace("/(--)/", "-", $string);
        $string = strtolower($string);
        return $string;
    }

    static function remove_caractere_unico($string){
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

    static public function protegeId($id) {
        $id2 = ($id + 35.8) * 4;
        $senha_final = md5("_\9?@+!364878" . $id2 . "7273177529");
        return $senha_final;
    }

    static public function UrlAtual() {
        $dominio = $_SERVER['HTTP_HOST'];
        $url = "http://" . $dominio . $_SERVER['REQUEST_URI'];
        return $url;
    }

    // Formata URL para usar no form
    static function formataUrl($vars){
        $parametros = [];
        foreach($vars as $key => $var){
            if(is_array($var)){
                foreach($var as $var2){
                    $parametros[] = $key.'[]='.$var2;
                }

            }else{
                $parametros[] = $key.'='.$var;
            }
        }
        return implode('&', $parametros);
    }
    
    static public function ativo($ativa){
        $dominio = $_SERVER['HTTP_HOST'];
        $url = "http://" . $dominio . $_SERVER['REQUEST_URI'];
        if(strpos($url, $ativa)){
            echo 'class="ativo"';
        }
        if($ativa == "index.php"){
            if(strpos($url, ".php") == FALSE){
                echo 'class="ativo"';
            }
        }
    }

    static public function precoCalculo($preco){

        $preco = trim($preco);

        $preco = preg_replace("/[][><}{)(._R$]/", "", $preco);

        $preco = preg_replace("/(,)/", ".", $preco);

        return $preco;

    }

}

?>