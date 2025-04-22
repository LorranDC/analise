<?php
require '../../vendor/autoload.php';
use Source\Painel\Autenticacao;

$auth = new Autenticacao;
?>
    <div id="left-sidebar" class="sidebar">
        <button type="button" class="btn-toggle-offcanvas"><i class="fa fa-arrow-left"></i></button>
        <div class="sidebar-scroll">
            <div class="user-account">
                <img src="../assets/images/user.png" class="rounded-circle user-photo" alt="User Profile Picture">
                <div class="dropdown">
                    <span>Olá,</span>
                    <a href="javascript:void(0);" class="dropdown-toggle user-name" data-toggle="dropdown"><strong><?=$_SESSION['nomeAdm']?></strong></a>
                    <ul class="dropdown-menu dropdown-menu-right account">
                        <li><a href="../logout.php"><i class="fa fa-fw fa-power-off"></i>Sair</a></li>
                    </ul>
                </div>                
                <hr>
            </div>
            <!-- Nav tabs -->
                
            <!-- Tab panes -->
            <div class="tab-content padding-0">
                <div class="tab-pane active" id="menu">
                    <nav id="left-sidebar-nav" class="sidebar-nav">
                        <ul class="metismenu li_animation_delay">
                            <li class=" "><a href="../"><i class="fa fa-fw fa-dashboard"></i><span>Painel</span></a></li>
                            <li><a href="#Property" class="has-arrow"><i class="fa fa-fw fa-home"></i><span>Imóveis</span></a>
                                <ul>
                                    <li><a href="adicionar-imovel.php">Adicionar Imóvel</a></li>
                                    <li><a href="listar-imoveis.php">Lista de Imóveis</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#Cidades" class="has-arrow"><i class="fa fa-fw fa-city"></i><span>Cidades</span></a>
                                <ul>
                                    <li><a href="adicionar-cidade.php">Adicionar Cidade</a></li>
                                    <li><a href="listar-cidades.php">Exibir Cidades</a></li>
                                </ul>
                            </li>
                            <li><a href="#Bairros" class="has-arrow"><i class="fa fa-fw fa-map"></i>Bairros</a>
                                <ul>
                                    <li><a href="adicionar-bairro.php">Adicionar Bairro</a></li>
                                    <li><a href="listar-bairros.php">Exibir Bairros</a></li>
                                </ul>
                            </li>
                            <li><a href="#Posts" class="has-arrow"><i class="fa fa-fw fa-newspaper"></i><span>Blog</span></a>
                                <ul>
                                    <li><a href="adicionar-post.php">Criar Post</a></li>
                                    <li><a href="listar-posts.php">Lista de Posts</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>    
            </div>          
        </div>
    </div>