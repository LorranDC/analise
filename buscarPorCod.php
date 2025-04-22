<?php
    namespace Source;
    require 'vendor/autoload.php';

    // ======== Usuário digita código e deseja encontrar o imóvel ========
    // Verifica se o código foi digitado
    $cod = isset($_GET['codigo-imovel']) ? $_GET['codigo-imovel'] : 0;

    // Redireciona para a página do imóvel com o codigo especificado
    echo "<meta http-equiv='refresh' content='0;URL=imovel?cod=$cod'>";
    exit(); 
