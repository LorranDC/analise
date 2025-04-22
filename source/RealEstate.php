<?php

namespace Source;


abstract class RealEstate extends Models{

    public function salvaFotoInteiraMiniatura($imagem_temp, $diretorio, $nome_img, $nome_imgMenor, $diretorioMiniatura, $padraow, $padraoh=null, $redirect=false){
        if(!is_dir($diretorio)){
            mkdir($diretorio, 0777, true);
        }

        move_uploaded_file($imagem_temp, $diretorio . $nome_img);
        $this->criaMarcaDAgua($diretorio.$nome_img);

        $info = getimagesize($diretorio . $nome_img);
        if ($info['mime'] != 'image/jpeg'){
            $infoImg = $this->separaExt($nome_img);
            $nomeJpg = $infoImg['img'].".jpg";
            $im = imagecreatefrompng($diretorio . $nome_img);
            imagejpeg($im, $diretorio . $nomeJpg);
            imagedestroy($im);
            if(file_exists($diretorio . $nome_img)){unlink($diretorio . $nome_img);}
        }else{
            $nomeJpg = $nome_img;
        }

        $cortarimg = $diretorio . $nomeJpg;
        require_once "lib/WideImage.php";
        $image = \WideImage::load($cortarimg);
        $tamanho = getimagesize($cortarimg);

        $arrayMW = array(); //Array do padraow
        $arrayMH = array(); //Array do padraowh
        $arrayDM = array(); //Array dos diretórios das miniaturas

        if(is_array($padraow)){
            $arrayMW = $padraow;
            $arrayMH = $padraoh;
            $arrayDM = $diretorioMiniatura;
        }else{
            $arrayMW[] = $padraow;
            $arrayMH[] = $padraoh;
            $arrayDM[] = $diretorioMiniatura;
        }
        
        foreach ($arrayMW as $key => $item){
            if($arrayMH[$key] == null){
                $arrayMH[$key] = $arrayMW[$key];
            }

            if($tamanho['0'] >= $tamanho['1']){
                if($tamanho['0'] == $tamanho['1']){
                    $maior = $arrayMH[$key];
                    if($arrayMW[$key] > $arrayMH[$key]){
                        $maior = $arrayMW[$key];
                    }
                    $height = $maior;
                    $width  = $maior;
                }else{
                    $height = $arrayMH[$key];
                    $width  = (($tamanho['0'] * $arrayMH[$key]) / $tamanho['1']);
                }
            }else{
                $height = (($tamanho['1'] * $arrayMW[$key]) / $tamanho['0']);
                $width  = $arrayMW[$key];
            }
            
            if($width < $arrayMW[$key]){
                $width = $arrayMW[$key];
                $height  = (($tamanho['1'] * $arrayMW[$key]) / $tamanho['0']);
                if($height < $arrayMH[$key]){
                    $percent = (1 - ($height*1)/$arrayMH[$key]) + 1;
                    $width = $width*$percent;
                    $height = $height*$percent;
                }
            }else if($height < $arrayMH[$key]){
                $height = $arrayMH[$key];
                $width  = (($tamanho['0'] * $arrayMH[$key]) / $tamanho['1']);
                if($width < $arrayMW[$key]){
                    $percent = (1 - ($width*1)/$arrayMW[$key]) + 1;
                    $width = $width*$percent;
                    $height = $height*$percent;
                }
            }

            $dir = $arrayDM[$key];
            if(!is_dir($dir)){
                mkdir($dir, 0777, true);
            }
            
            $infoImg = $this->separaExt($nome_imgMenor);
            $nome_imgMenor = $infoImg['img'].".jpg";
            $diretorioMini = $dir.$nome_imgMenor;
		
            $image = $image->resize($width, $height);		
            $image = $image->crop('center', 'center', $arrayMW[$key], $arrayMH[$key]);
            $image->saveToFile($diretorioMini);
            $this->compressorImagens($diretorioMini, $diretorioMini, 60);
        }

        $this->compressorImagens($diretorio . $nomeJpg, $diretorio . $nomeJpg, 60);
        
        if(!empty($redirect)){
          
            exit();
        }
        
    }
    
    public function cortaImgMiniatura($original, $diretorio, $padraow, $padraoh){
        require_once "WideImage.php";
        $tamanho = getimagesize($original);

        if($tamanho['0'] >= $tamanho['1']){
            if($tamanho['0'] == $tamanho['1']){
                $maior = $padraoh;
                if($padraow > $padraoh){
                    $maior = $padraow;
                }
                $height = $maior;
                $width  = $maior;
            }else{
                $height = $padraoh;
                $width  = (($tamanho['0'] * $padraoh) / $tamanho['1']);
            }
        }else{
            $height = (($tamanho['1'] * $padraow) / $tamanho['0']);
            $width  = $padraow;
        }
        
        if($width < $padraow){
            $width = $padraow;
            $height  = (($tamanho['1'] * $padraow) / $tamanho['0']);
            if($height < $padraoh){
                $percent = (1 - ($height*1)/$padraoh) + 1;
                $width = $width*$percent;
                $height = $height*$percent;
            }
        }else if($height < $padraoh){
            $height = $padraoh;
            $width  = (($tamanho['0'] * $padraoh) / $tamanho['1']);
            if($width < $padraow){
                $percent = (1 - ($width*1)/$padraow) + 1;
                $width = $width*$percent;
                $height = $height*$percent;
            }
        }

        $image = \WideImage::load($original);
        $image = $image->resize($width, $height);		
        $image = $image->crop('center', 'center', $padraow, $padraoh);
        $image->saveToFile($diretorio);
        
        $this->compressorImagens($diretorio, $diretorio, 60);
    }
    
    function compressorImagens($source, $destination, $quality) {
        $info = getimagesize($source);
        
        if ($info['mime'] == 'image/jpeg'){
            $image = \imagecreatefromjpeg($source);
		}else if ($info['mime'] == 'image/gif'){
            $image = \imagecreatefromgif($source);
		}else if ($info['mime'] == 'image/png'){
            $image = \imagecreatefrompng($source);
		}

		//header('Content-type: image/jpeg');
		\imagejpeg($image, $destination, $quality);
		
        //criawebp
        $explode = explode("/", $destination);
        $indices = count($explode)-1;
        $infoImg = $this->separaExt($explode[$indices]);
        $explode[$indices] = $infoImg['img'].".webp";
        $destinowebp = implode("/", $explode);
        \imagewebp($image, $destinowebp);

        // Free up memory
        \imagedestroy($image);
        return $destination;
    }

    function separaExt($img){
        $explode = explode(".", $img);
        $total = count($explode)-1;
        $ext = $explode[$total];
        unset($explode[$total]);
        
        return array("img" => implode("-", $explode), "ext" => $ext);
    }

    function criaMarcaDAgua($arquivo) {
        require_once "lib/WideImage.php";

        $marcaAgua  = '../../../assets/images/properties/marca-agua-samar.png';

        $fundo = \WideImage::load($arquivo);
        $logo  = \WideImage::load($marcaAgua);

        list($width_arquivo, $height_arquivo, $type, $attr) = getimagesize($arquivo);
        list($width_marca_dagua, $height_marca_dagua, $type2, $attr2) = getimagesize($marcaAgua);

        /*Redimensiona Imóvel*/
        if ($width_arquivo > $height_arquivo) {
            $nova_largura = 800;
            $nova_altura = ((800 * $height_arquivo) / $width_arquivo);
        } else {
            $nova_altura = 600;
            $nova_largura = ((600 * $width_arquivo) / $height_arquivo);
        }
        /*FIM Redimensiona Imóvel*/

        $fundo = $fundo->resize($nova_largura, $nova_altura);

        /*Redimensiona Marca D'água*/
        $largura = $nova_largura/4;
        //$largura = 680;

        $altura = ($largura * $height_marca_dagua) / $width_marca_dagua;

        $logo = $logo->resize($largura, $altura);
        /*FIM Redimensiona Marca D'água*/
        
        $nova_img = $fundo->merge($logo, 'right-10', 'top+10', 100);

        //$nova_img->output('jpg', 90);
        @$nova_img->saveToFile($arquivo);
    }
    
    function nome_unico($diretorio, $buscar_nome, $tipo='') {
        $infoImg = $this->separaExt($buscar_nome);
        $ext = $infoImg['ext'];
        $nomeimg = Ferramentas::remover_caracter($infoImg['img']);
        
        $buscar_nome = $nomeimg.".".$ext;

        if (file_exists($diretorio . $buscar_nome)) {
            $num = 0;
            $nomeimg2 = $nomeimg . '_' . "$num" . '.' . $ext;

            while (file_exists($diretorio . $nomeimg2)) {
                $num++;
                $nomeimg2 = $nomeimg . '_' . "$num" . '.' . $ext;
            }
        } else {
            $nomeimg2 = $buscar_nome;
        }
        
        return $nomeimg2;
    }
}


?>