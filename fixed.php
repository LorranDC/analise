<?php
namespace Source;

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

// Define os números de WhatsApp
$numerosVarginha = ['5535997045026', '5535997008827'];

// Lógica para alternar entre os números a cada clique
if (!isset($_SESSION['ultimo_indice'])) {
    $_SESSION['ultimo_indice'] = 0;
} else {
    // Incrementa e usa o módulo para alternar entre 0 e 1
    $_SESSION['ultimo_indice'] = ($_SESSION['ultimo_indice'] + 1) % count($numerosVarginha);
}

$numeroVarginha = $numerosVarginha[$_SESSION['ultimo_indice']];
$numeroEloi = '5535999850105';  // Número fixo para Elói Mendes
?>
<style>
    .link {
        display: block;
        margin-bottom: 15px; /* Espaço aumentado entre as opções */
        text-decoration: none;
        color: black; /* Cor do link para melhor visualização */
        font-weight: bold;
    }

    .link:before {
        content: "● "; /* Ponto de marcação */
        color: red; /* Cor do ponto de marcação */
    }
</style>
<div class="whatsapp fixed">
    <div class="whatsapp-tab shadow-2">
        <i class="fa fa-whatsapp fa-3x fa-fw"></i>
    </div>
    <div class="whatsapp-box hidden shadow-2">
        <div class="whatsapp-form--header active">
            <fieldset>
                <legend>Com quem você deseja conversar?</legend>
                <a href="https://wa.me/<?= $numeroVarginha ?>" class="link">Samar Varginha</a>
                <a href="https://wa.me/<?= $numeroEloi ?>" class="link">Samar Elói Mendes</a>
            </fieldset>
        </div>
    </div>
</div>
