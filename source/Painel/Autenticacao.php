<?php

namespace Source\Painel;

use Source\Conexao;
use Source\Ferramentas;

class Autenticacao extends Conexao
{

    private $login;
    private $senha;

    function __construct($login = false)
    {
        $this->setSessao();
        if (!$login) {
            if (!isset($_SESSION['logadoAdm'])) {
                echo "<meta http-equiv='refresh' content='0;URL=../'>";
                exit();
            }
        } else {
            if (isset($_SESSION['logadoAdm'])) {
                echo "<meta http-equiv='refresh' content='0;URL=admin/'>";
                exit();
            }
        }
    }

    function setSessao()
    {
        if (!isset($_SESSION)) {
            session_name("adm");

            // Configurações para a sessão durar 6 horas
            ini_set('session.gc_maxlifetime', 21600); // 6 horas em segundos
            ini_set('session.cookie_lifetime', 21600); // 6 horas em segundos

            session_start();

            $_SESSION['adm'] = array(
                'limite' => 12,
                'imoveis--ordem' => "codigoD",
                'imoveis--quartos' => "0",
                'imoveis--banheiros' => "0",
                'imoveis--status' => "0",
                'imoveis--cidade' => "0",
                'imoveis--categoria' => "0",
                'imoveis--busca' => '',
                'imoveis--buscar-por-cod' => '',
                'bairros--cidade' => "0",
                'bairros--ordem' => "0",
                'bairros--busca' => ''
            );
        }
    }

    public function setLogin($login)
    {
        $this->login = $login;
    }

    public function setSenha($senha)
    {
        $this->senha = Ferramentas::protege_senha($senha);
    }

    public function getLogin()
    {
        return $this->login;
    }

    public function getSenha()
    {
        return $this->senha;
    }

    public function logarAdm()
    {
        if (isset($_POST['usuario']) && isset($_POST['senha'])) {
            $pdo = parent::getDB();
            $this->setLogin($_POST['usuario']);
            $this->setSenha($_POST['senha']);
            $logar = $pdo->prepare("SELECT * FROM usuarios WHERE usuario = ? AND senha = ? AND ativo = ?");
            $logar->bindValue(1, $this->getLogin());
            $logar->bindValue(2, $this->getSenha());
            $logar->bindValue(3, 1);
            $logar->execute();
            if ($logar->rowCount() == 1) :
                $dados = $logar->fetch(\PDO::FETCH_OBJ);
                $_SESSION['idUsuarioAdm'] = $dados->id;
                $_SESSION['nomeAdm'] = $dados->nome;
                $_SESSION['emailAdm'] = $dados->email;
                $_SESSION['logadoAdm'] = true;
                echo "<meta http-equiv='refresh' content='0;URL=admin/index'>";
                return true;
            else :
                echo '  <script type="text/javascript" async>
                            $(document).ready(function(){
                                    demo.initChartist();

                                    $.notify({
                                    icon: "pe-7s-attention",
                                    message: "Opsss!</b> - Os dados não conferem."

                                },{
                                    type: "danger",
                                    timer: 4000
                                });

                            });
                        </script>';
                return false;
            endif;
        }
    }

    public function protegeAdm()
    {
        if (!isset($_SESSION['idUsuarioAdm']) || !isset($_SESSION['nomeAdm']) || !isset($_SESSION['emailAdm']) || !isset($_SESSION['logadoAdm'])) {
            echo "<meta http-equiv='refresh' content='0;URL=../index'>";
            exit();
        }
    }

    public function logoutAdm()
    {
        unset($_SESSION['idUsuarioAdm']);
        unset($_SESSION['nomeAdm']);
        unset($_SESSION['emailAdm']);
        unset($_SESSION['logadoAdm']);
        echo "<meta http-equiv='refresh' content='0;URL=../painel/index'>";
    }

    public function loginJaExiste($login)
    {
        $pdo = parent::getDB();
        $logar = $pdo->prepare("SELECT * FROM usuarios WHERE usuario = ?");
        $logar->bindValue(1, $login);
        $logar->execute();
        return $logar->rowCount() !== 0;
    }

    public function novoAdm($login, $nome, $email, $senha)
    {
        $pdo = parent::getDB();
        $novoAdm = $pdo->prepare("INSERT INTO usuarios (nome, email, usuario, senha, ativo) VALUES (?, ?, ?, ?, ?)");
        $novoAdm->bindValue(1, $nome);
        $novoAdm->bindValue(2, $email);
        $novoAdm->bindValue(3, $login);
        $this->setSenha($senha);
        $novoAdm->bindValue(4, $this->getSenha());
        $novoAdm->bindValue(5, 1);
        $novoAdm->execute();
    }
}
