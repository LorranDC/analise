<?php
require "vendor/autoload.php";

use Source\Funcoes;

$funcoes = new Funcoes();
$funcoes->verifyReCAPTCHA("index.php");

$file = fopen("emails-samar.txt", "a") or die("Não foi possível cadastrar");
$email = isset($_POST['newsletter-email']) ? $_POST['newsletter-email']."\n" : '';
if(!$funcoes->validar_email($email)) {
    echo "<script>alert('Falha ao validar o email! Tente novamente mais tarde ou use outro Endereço de email.');</script>";
    echo "<meta http-equiv=\"refresh\" content=\"0; url=index.php\" />";
    exit();
}
fwrite($file, $email);
fclose($file);
echo "<script>alert('Email $email cadastrado com sucesso!');</script>";
echo "<meta http-equiv=\"refresh\" content=\"0; url=index.php\" />";
exit();
?>