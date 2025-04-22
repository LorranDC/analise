<?php
    use Source\Painel\Imoveis;
    use Source\Models;
    use Source\Painel\Autenticacao;

    $auth = new Autenticacao;

    require '../../../vendor/autoload.php';

    $imoveis = new Imoveis;
    $models  = new Models;

    $id = isset($_POST['id']) ? $_POST['id'] : '';

    $models->delete('cidade', $id);
    echo "<meta http-equiv=\"refresh\" content=\"0; url=../listar-cidades.php\" />";
    exit();