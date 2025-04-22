<?php

namespace Source;


use Source\Site;


class Banner extends Site
{

    static function ListaImagem()
    {

        $pdo = parent::getDB();    
        $listar = $pdo->prepare("SELECT nome FROM banner ORDER BY RAND();");  
        $listar->execute();
        $dados = $listar->fetchAll();
        foreach ($dados as $row) {
            echo '<li><img loading="lazy" src="'.$row['nome'].'" alt=""></li>';
        }
    }

    }

// EOF
