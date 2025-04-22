<?php
    namespace Source;
    use Source\Imoveis;
    require 'vendor/autoload.php';

    Imoveis::listaCidadesHome($_POST['tipo']);

?>