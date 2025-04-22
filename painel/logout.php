<?php
    require "../vendor/autoload.php";
    use Source\Painel\Imoveis;
    use Source\Painel\Autenticacao;
    
    $painel = new Imoveis();
    $login = new Autenticacao();
    $login->logoutAdm();
?>