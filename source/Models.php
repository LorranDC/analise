<?php

namespace Source;

use Source\Conexao;

class Models extends Conexao{

    public function insert($tabela, $dados, $ativo) {
        $arrayValores = array();
        $arrayColunas = array();
        
        $count = 1;
        if ($ativo) {
            $dados["ativo"] = 1;
        }
        
        foreach($dados as $key => $v){
            $arrayValores[] = '?';
            $arrayColunas[] = $key;
        }
        
        $pdo = parent::getDB();
        $cadastrar = $pdo->prepare("INSERT INTO $tabela (".implode(', ',$arrayColunas).") VALUES (".implode(', ',$arrayValores).")");
        foreach ($dados as $valor) {
            $cadastrar->bindValue($count, $valor);
            $count++;
        }
        
        return $cadastrar->execute();
    }

    public function saveById($tabela, $dados, $id) {
        $edita = '';
        $totalPosicoes = count($dados) - 1;
        $posicao = 0;
        foreach ($dados as $key => $coluna) {
            $edita .= (($posicao == $totalPosicoes) ? " $key = ?" : "$key = ?," );
            $posicao++;
        }
        $count = 1;
        $dados["id"] = $id;
        $pdo = parent::getDB();
        $editar = $pdo->prepare("UPDATE $tabela set $edita WHERE id=?");
        foreach ($dados as $coluna) {
            $editar->bindValue($count, $coluna);
            $count++;
        }

        return $editar->execute();
    }
    
    public function selectSeveral($tabela, $dados, $ativo, $order) {
        if ($ativo) {
            $dados["ativo"] = 1;
        }
        $totalPosicoes = count($dados) - 1;
        $posicao = 0;
        $valores = ((count($dados) > 0) ? "WHERE " : "");
        foreach ($dados as $key => $coluna) {
            $valores .= (($posicao == $totalPosicoes) ? " $key = ? " : "$key = ? AND " );
            $posicao++;
        }
        $count = 1;
        $pdo = parent::getDB();
        $select = $pdo->prepare("SELECT * FROM $tabela $valores $order");

        foreach ($dados as $coluna) {
            $select->bindValue($count, $coluna);
            $count++;
        }
        $select->execute();
        return $select;
    }
    
    public function saveByOptional($tabela, $dados, $optional, $id) {
        $edita = '';
        $totalPosicoes = count($dados) - 1;
        $posicao = 0;
        foreach ($dados as $key => $coluna) {
            $edita .= (($posicao == $totalPosicoes) ? " $key = ?" : "$key = ?," );
            $posicao++;
        }
        $count = 1;
        $dados["id"] = $id;
        $pdo = parent::getDB();
        $editar = $pdo->prepare("UPDATE $tabela set $edita WHERE $optional=?");
        foreach ($dados as $coluna) {
            $editar->bindValue($count, $coluna);
            $count++;
        }

        return $editar->execute();
    }

    public function deleleteByActive($tabela, $id) {
        $pdo = parent::getDB();
        $deletar = $pdo->prepare("UPDATE $tabela set ativo = ? WHERE id=?");
        $deletar->bindValue(1, 0);
        $deletar->bindValue(2, $id);

        return $deletar->execute();
    }

    public function delete($tabela, $id) {
        $pdo = parent::getDB();
        $deletar = $pdo->prepare("DELETE FROM $tabela WHERE id=?");
        $deletar->bindValue(1, $id);

        return $deletar->execute();
    }

    public function deleteByCustomColumn($tabela, $coluna, $valor){
        $pdo = parent::getDB();
        $deletar = $pdo->prepare("DELETE FROM $tabela WHERE $coluna=?");
        $deletar->bindValue(1, $valor);

        return $deletar->execute();
    }
    
    public function findDataById($tabela, $id, $ativo) {
        $porAtivo = (($ativo) ? " AND ativo = ?" : "");
        $pdo = parent::getDB();
        $listar = $pdo->prepare("SELECT * FROM $tabela WHERE id = ? $porAtivo");
        $listar->bindValue(1, $id);
        if ($ativo) {
            $listar->bindValue(2, 1);
        }
        $listar->execute();
        return $listar->fetch(\PDO::FETCH_OBJ);
    }
    
    public function findDataBySeveral($tabela, $id, $chave, $ativo) {
        $porAtivo = (($ativo) ? " AND ativo = ?" : "");
        $pdo = parent::getDB();
        $listar = $pdo->prepare("SELECT * FROM $tabela WHERE $chave = ? $porAtivo");
        $listar->bindValue(1, $id);
        if ($ativo) {
            $listar->bindValue(2, 1);
        }
        $listar->execute();
        return $listar->fetch(\PDO::FETCH_OBJ);
    }
    
    public function findDataByIdListar($tabela, $id, $ativo) {
        $porAtivo = (($ativo) ? " AND ativo = ?" : "");
        $pdo = parent::getDB();
        $listar = $pdo->prepare("SELECT * FROM $tabela WHERE id = ? $porAtivo");
        $listar->bindValue(1, $id);
        if ($ativo) {
            $listar->bindValue(2, 1);
        }
        $listar->execute();
        return $listar;
    }

    public function getDataTable($tabela, $ativo) {
        $porAtivo = (($ativo) ? " WHERE ativo = ?" : "");
        $pdo = parent::getDB();
        $listar = $pdo->prepare("SELECT * FROM $tabela $porAtivo");
        if ($ativo) {
            $listar->bindValue(1, 1);
        }
        $listar->execute();

        return $listar->fetchAll();
    }

    public function getLastInsert($tabela, $coluna='id') {
        $pdo = parent::getDB();
        $listar = $pdo->prepare("SELECT $coluna FROM $tabela ORDER BY $coluna DESC LIMIT 1");
        $listar->execute();
        return $listar->fetch(\PDO::FETCH_OBJ)->$coluna;
    }
    
    public function returnData($tabela, $ativo, $order) {
        $pdo = parent::getDB();
        
        $SQLAtivo = (($ativo !== "") ? " WHERE $ativo = ? " : "");
        $SQLOrder = (($order !== "") ? " ORDER BY $order DESC " : "");
        
        $listar = $pdo->prepare("SELECT * FROM $tabela $SQLAtivo $SQLOrder");
        if($ativo !== ""){
            $listar->bindValue(1, 1);
        }
        $listar->execute();
        
        //return $listar->fetch(\PDO::FETCH_OBJ);
        return $listar->fetchAll();
    }
    
}
?>