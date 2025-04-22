<?php
namespace Source;
use Source\Support\Email;

use Source\Models;
class Funcoes extends Models{

    public function verifyReCAPTCHA($paginaRetorno="contato"){
        if(isset($_POST['g-recaptcha-response'])) {
            $url = "https://www.google.com/recaptcha/api/siteverify";
            $secret = "6LfIh7EiAAAAACgDZyNXjuEkcJ5w6y7-gQ4Ccf6Z";
            $token = $_POST['g-recaptcha-response'];
            $sufixoUrl = '?secret='.$secret.'&response='.$token;
            $response = file_get_contents($url.$sufixoUrl);

            $res = json_decode($response, true);

            if(($res['success'] != 1)) {
                echo "<meta http-equiv='refresh' content='0;URL=$paginaRetorno'>";
                echo "<script type='text/javascript'> alert('Não foi possível comprovar a sua identidade! if'); </script>";
                exit();
            }
        }else{
            echo "<meta http-equiv='refresh' content='0;URL=$paginaRetorno'>";
            echo "<script type='text/javascript'> alert('Não foi possível obter nenhuma resposta!'); </script>";
            exit();
        }
    }
    

    

    public function limpaPost($post){

        $variavelLimpa = htmlspecialchars($post, ENT_QUOTES, 'UTF-8');

        $variavelSuja = htmlspecialchars_decode($variavelLimpa);

        return $variavelSuja;

    }

    

    function protect($str) {

        /*** Função para retornar uma string/Array protegidos contra SQL/Blind/XSS Injection*/

        if( !is_array( $str ) ) {                      

            $str = @preg_replace( '/(from|select|insert|delete|where|drop|union|order|update|database)/i', '', $str );

            $str = @preg_replace( '/(&lt;|<)?script(\/?(&gt;|>(.*))?)/i', '', $str );

            $str = @preg_replace("/(from|select|insert|delete|where|drop table|show tables)/i","",$str);

            $str = str_replace("<script","",$str);

            $str = str_replace("script>","",$str);

            $str = str_replace("<Script","",$str);

            $str = str_replace("Script>","",$str);

            $str = trim($str);

            $tbl = get_html_translation_table( HTML_ENTITIES );

            $tbl = array_flip( $tbl );

            $str = addslashes( $str );

            $str = strip_tags( $str );

            return strtr( $str, $tbl );

        } else {

            return $str;

        }

    }

    

    function proteger( $str ){

        if( !is_array( $str ) ) {

            $str = preg_replace("/(from|select|insert|delete|where|drop table|show tables)/i","",$str);

            $str = preg_replace('~&amp;#x([0-9a-f]+);~ei', 'chr(hexdec("\\1"))', $str);

            $str = preg_replace('~&amp;#([0-9]+);~e', 'chr("\\1")', $str);

            $str = str_replace("<script","",$str);

            $str = str_replace("script>","",$str);

            $str = str_replace("<Script","",$str);

            $str = str_replace("Script>","",$str);

            $str = trim($str);

            $tbl = get_html_translation_table(HTML_ENTITIES);

            $tbl = array_flip($tbl);

            $str = addslashes($str);

            $str = strip_tags($str);

            

            return strtr($str, $tbl);

        }else{

            return $str;

        }

    }

    

    public function isMobile() {

        $is_mobile = false;

 

        //Se tiver em branco, não é mobile

        if ( empty($_SERVER['HTTP_USER_AGENT']) ) {

            $is_mobile = false;

 

        //Senão, se encontrar alguma das expressões abaixo, será mobile

        } elseif ( strpos($_SERVER['HTTP_USER_AGENT'], 'Mobile') !== false

            || strpos($_SERVER['HTTP_USER_AGENT'], 'Android') !== false

            || strpos($_SERVER['HTTP_USER_AGENT'], 'Silk/') !== false

            || strpos($_SERVER['HTTP_USER_AGENT'], 'Kindle') !== false

            || strpos($_SERVER['HTTP_USER_AGENT'], 'BlackBerry') !== false

            || strpos($_SERVER['HTTP_USER_AGENT'], 'Opera Mini') !== false

            || strpos($_SERVER['HTTP_USER_AGENT'], 'Opera Mobi') !== false ) {

                $is_mobile = true;

 

        //Senão encontrar nada, não será mobile

        } else {

            $is_mobile = false;

        }

 

        return $is_mobile;

    }
    public function securityCode(){

        return md5('check'.$_SERVER['REMOTE_ADDR'].$_SERVER['HTTP_USER_AGENT']);

    }
    public function pegaParametroUrl($url){

        $explode = explode("/", $url);

        return $explode;

    }
    public function validar_email($email) {

        $email_final = trim($email);

        // Retorna true para email valido e false para email invalido
        return filter_var($email_final, FILTER_VALIDATE_EMAIL);

    }
    public function remover_caracter($string) {

        $string = trim($string);

        $string = preg_replace("/(á|à|â|ã|ä|Á|À|Â|Ã|Ä)/", "a", $string);

        $string = preg_replace("/(é|è|ê|É|È|Ê)/", "e", $string);

        $string = preg_replace("/(í|ì|Í|Ì)/", "i", $string);

        $string = preg_replace("/(ó|ò|ô|õ|ö|Ó|Ò|Ô|Õ|Ö)/", "o", $string);

        $string = preg_replace("/(ú|ù|ü|Ú|Ù|Ü)/", "u", $string);

        $string = preg_replace("/(ç|Ç)/", "c", $string);

        $string = preg_replace("(/)", "-", $string);

        $string = preg_replace("/[][><}{)(:;,.!?*%~^`&#@]/", "-", $string);

        $string = preg_replace("/( )/", "-", $string);

        $string = preg_replace("/(--)/", "-", $string);

        $string = preg_replace("(  | |®|º)", "-", $string);

        $string = preg_replace("(--)", "-", $string);

        $string = strtolower($string);

        return $string;

    }
    public function alertaRedir($mensagemRedir, $pagina) {

        echo "<script>alert('{$mensagemRedir}')</script>";

        echo '<script>location.href="' . URL_ADMIN . $pagina . '"</script>';

    }

    

    public function criarAlert($titulo='', $texto='', $id=''){

        $_SESSION['alerta']['titulo'] = $titulo;

        $_SESSION['alerta']['texto'] = $texto;

        $_SESSION['alerta']['id'] = $id;

    }

    

    public function exibeAlerta(){

        $titulo = ((isset($_SESSION['alerta']['titulo'])) ? $_SESSION['alerta']['titulo'] : '');

        $texto = ((isset($_SESSION['alerta']['texto'])) ? $_SESSION['alerta']['texto'] : '');

        $id = ((isset($_SESSION['alerta']['id'])) ? $_SESSION['alerta']['id'] : '');

        

        $alert = '';

        

        if(!empty($titulo) && !empty($texto)){

            $alert =   '<div id="dialog-message'.$id.'" title="'.$titulo.'">

                            '.$texto.'

                        </div>
                    <script>

                        $( function() {

                            $( "#dialog-message'.$id.'" ).dialog({

                                //dialogClass: "ui-state-error",

                                closeOnEscape: true,

                                modal: true,

                                buttons: {

                                    Ok: function() {

                                        $( this ).dialog( "close" );

                                    }

                                }

                            });

                          } );

                    </script>';

        }

        

        unset($_SESSION['alerta']);

        

        return $alert;

    }

    

    public function mask($val, $mask) {

        $maskared = '';

        $k = 0;

        for ($i = 0; $i <= strlen($mask) - 1; $i++) {

            if ($mask[$i] == '#') {

                if (isset($val[$k]))

                    $maskared .= $val[$k++];

            }

            else {

                if (isset($mask[$i]))

                    $maskared .= $mask[$i];

            }

        }

        return $maskared;

    }

    

    public function maskCPF($num){

        $num = $this->soNumero($num);

        if(strlen($num) == 11){

            $num = $this->mask($num,'###.###.###-##');

        }

        return $num;

    }

    

    public function maskTelefone($num){

        $num = $this->soNumero($num);

        if(strlen($num) == 11){

            $num = $this->mask($num,'(##) #####-####');

        }

        if(strlen($num) == 10){

            $num = $this->mask($num,'(##) ####-####');

        }

        if(strlen($num) == 9){

            $num = $this->mask($num,'(##) #######');

        }

        

        return $num;

    }
    function tirarEspaco($local){       

        $stringCorrigida = str_replace(' ', '%20', $local);

        return $stringCorrigida;

    }

    

    function primeiroNome($nome){

        $explode = explode(' ', trim($nome));

        return $explode[0];

    }

    

    function soNumero($str) {

        return preg_replace("/[^0-9]/", "", trim($str));

    }

    

    public function proguraLog($message){

        $find = $this->findDataBySeveral('logs', $message, 'mensagem', false);

        $total = ((!empty($find)) ? 1 : 0);

        return $total;

    }

    

    public function urlAtual(){

        $dominio = $_SERVER['HTTP_HOST'];

        $url = "https://" . $dominio . $_SERVER['REQUEST_URI'];

        return $url;

    }

    

    function dadosEnvio($ass, $destinatario, $html, $copia='', $attach=array(), $sobe=false){

        

        if(SMTP_MAIL['acesso']/*  == 1 */){

            $email = new Email();
            $email->add($ass, $html, "", $destinatario, $copia);
            /**VERIFICA ANEXOS*/

            $totalAnexos = count($attach);

            if($totalAnexos > 0){

                foreach($attach as $anexo){

                    $email->attach($anexo[0],$anexo[1]);

                }

            }

            /**FIM VERIFICA ANEXOS*/
            $email->send();
            if(!$email->error()){

                return true;

            }else{

                return false;

            }

        }else{
            echo 'failed';
            // $this->dadosEnvio2($ass, SMTP_MAIL['from_name'], $destinatario, $html, $copia);

        }

        

    }

    

   /*  function dadosEnvio2($assunto, $from, $destinatario, $html, $copia="", $arquivo="", $nomeArquivo=""){

        if (file_exists("../lib/phpmailer/class.phpmailer.php")){

            require_once "../lib/phpmailer/class.phpmailer.php";

        }else if (file_exists("../../lib/phpmailer/class.phpmailer.php")){

            require_once "../../lib/phpmailer/class.phpmailer.php";

        }else{

            require_once "lib/phpmailer/class.phpmailer.php";

        }
        $mail = new PHPMailer();

        

        // Define os dados do servidor e usuário

        $host = 'mail.gtamultimidia.com.br'; // o smtp

        $username = 'robot@gtamultimidia.com.br'; // o email do usuario

        $password = '@Yhu789lo!!';  // a senha
        $mensagem = $html;
        //Parametros

        $mail->CharSet = "UTF-8"; 

        $mail->Host = $host;

        $mail->Port = '587';

        $mail->Username = $username;

        $mail->Password = $password;

        $mail->SMTPKeepAlive = true;

        $mail->Mailer = "smtp";

        $mail->IsSMTP();

        $mail->SMTPAuth = true;

        $mail->CharSet = 'utf-8';

        $mail->SMTPDebug = 0;
         // Define o remetente

        $mail->From = $username;

        $mail->Sender = $username;

        $mail->FromName = '=?UTF-8?B?' . base64_encode($from) . '?=';
        // Define os destinatrio(s)

        if(is_array($destinatario)){

            foreach($destinatario as $emailDestinatario){

                $mail->AddAddress($emailDestinatario); 

            }

        }else{

           $mail->AddAddress($destinatario); 

        }

        if($copia != ""){

            foreach($copia as $email){

                $mail->AddBCC($email, 'GTA Multimidia');

            }            

        }

        $mail->CharSet = 'utf-8'; // Charset da mensagem (opcional)

        $mail->IsHTML(true);

        

        // Texto e Assunto

        $mail->Subject = '=?UTF-8?B?' . base64_encode($assunto) . '?=';

        $mail->addReplyTo($username);

        $mail->Body = $mensagem;
        $mail->AltBody = $mensagem;

        

        if($arquivo != ""){

            $mail->AddAttachment($arquivo, $nomeArquivo);

        }
        $enviado = $mail->Send();

        return $enviado;

    } */

    

}
?>