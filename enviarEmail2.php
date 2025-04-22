<?php
require "vendor/autoload.php";

use Source\Funcoes;

$funcoes = new Funcoes();
$funcoes->verifyReCAPTCHA("contato");

$email = htmlspecialchars($_POST['contact-email']);
if ($funcoes->validar_email($email) == TRUE) {
    $name       = htmlspecialchars($_POST['contact-name']);
    $celular    = htmlspecialchars($_POST['contact-phone']);
    $mensagem   = htmlspecialchars($_POST['contact-message']);
    $tipo       = "Lead - Jardim Vitória"; // Assunto específico para captação de leads
    $url        = $_POST['url'];

    // Mensagem que será enviada por email
    $msg  = "<b>Assunto: </b>" . $tipo . "<br>";
    $msg .= "<b>Nome: </b>"     . $name     . "<br>";
    $msg .= "<b>E-mail: </b>"   . $email    . "<br>";
    $msg .= "<b>Celular: </b>"  . $celular  . "<br>";
 

    $html = $msg;

    // Define destinatário e assunto
    $ass = "Lead - Jardim Vitória"; // Assunto fixo para o e-mail
    $destinatario = "contato@imobiliariasamar.com.br"; // Enviar para o e-mail fixo
    $copia = array("webmaster@gtamultimidia.com.br", "vendas@imobiliariasamar.com.br"); // Adicionar e-mails para cópia
    $from  = "Samar Imobiliária"; // Remetente

    // Função que envia o e-mail
    $enviado = $funcoes->dadosEnvio($ass, $destinatario, $html, $copia);

    // Verifica se o e-mail foi enviado com sucesso
    if ($enviado) {
        echo "<meta http-equiv='refresh' content='0;URL=$url'>";
        echo "<script type='text/javascript'> alert('Mensagem enviada, em breve entraremos em contato!'); </script>";
        exit;
    } else {
        echo "<meta http-equiv='refresh' content='0;URL=$url'>";
        echo "<script type='text/javascript'> alert('Falha ao enviar mensagem!'); </script>";
        exit;
    }
} else {
    echo "<meta http-equiv='refresh' content='0;URL=$url'>";
    echo "<script type='text/javascript'> alert('Por favor, insira um e-mail válido!'); </script>";
    exit;
}
