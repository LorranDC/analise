<?php

namespace Source\Painel;

use Source\Conexao;
use Source\Ferramentas;

class AuthReg extends Autenticacao
{
    function __construct($login = false)
    {
        $this->setSessao();
    }
}