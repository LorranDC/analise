<?php
    namespace Source;
    use Source\Imoveis;
    require 'vendor/autoload.php';
 
    $tipo = isset($_POST['tipo']) ?? "aluguel";

    Imoveis::listaCidades($tipo);

?>