<?php 
require "vendor/autoload.php";

use Source\Funcoes;

$funcoes = new Funcoes();
$funcoes->verifyReCAPTCHA("contato");

// Obtém dados do formulário
$email = htmlspecialchars($_POST['contact-email']);
$name = htmlspecialchars($_POST['contact-name']);
$celular = htmlspecialchars($_POST['contact-phone']);
$mensagem = htmlspecialchars($_POST['contact-message']);
$tipo = htmlspecialchars($_POST['tipo-de-formulario']);
$imovel = isset($_POST['contact-imovel']) ? $_POST['contact-imovel'] : '';
$url = $_POST['url'];

// Monta a mensagem do e-mail
$msg = "<b>Tipo do contato: </b>" . $tipo . (!empty($imovel) ? " " . $imovel : '') . "<br>";
$msg .= "<b>Nome: </b>" . $name . "<br>";
$msg .= "<b>E-mail: </b>" . $email . "<br>";
$msg .= "<b>Celular: </b>" . $celular . "<br>";
$msg .= "<b>Mensagem: </b>" . $mensagem . "<br><br>";

$html = $msg;

// Define destinatário fixo e e-mails de cópia
$ass = "Site - Contato Formulario Samar"; // Assunto fixo para o e-mail
$destinatario = "contato@imobiliariasamar.com.br"; // E-mail fixo para envio
$copia = ["webmaster@gtamultimidia.com.br", "vendas@imobiliariasamar.com.br"]; // E-mails para cópia
$from = "Samar Imobiliária"; // Nome do remetente

// Envia o e-mail
$enviado = $funcoes->dadosEnvio($ass, $destinatario, $html, $copia);

// Redirecionamento e mensagem ao usuário
if ($enviado) {
    echo "<meta http-equiv='refresh' content='0;URL=$url'>";
    echo "<script type='text/javascript'> alert('Mensagem enviada, em breve entraremos em contato!'); </script>";
    exit;
} else {
    echo "<meta http-equiv='refresh' content='0;URL=$url'>";
    echo "<script type='text/javascript'> alert('Falha ao enviar mensagem!'); </script>";
    exit;
}
?>
