<?php
namespace Source\Painel;
// Importa a classe models, que é filha de conexao, que conecta com o banco de dados
use Source\Ferramentas;
use Source\RealEstate;

//  é classe filha de Models - de modo a usar as mesmas informações de host, usuario e senha
abstract class Dashboard extends RealEstate {

    function estruturaPaginacao($qtdPag, $pg, $prox, $ant, $tipo, $arquivo) {
        $paginacao = '';
        // $tipo = strtolower($tipo);


        $url = Ferramentas::UrlAtual();
        $partes = parse_url($url);
        if(!empty($partes['query'])) {
            $vars = [];
            parse_str($partes['query'], $vars);
        }

        $url = '../../painel/admin/'.$arquivo.'?';

        if ($qtdPag != 0) {
            $paginacao .= '<nav aria-label="Page navigation example">';
            $paginacao .= '<ul class="pagination">';
            if ($pg > 1) {
                $vars['pg'] = $ant;
                $parametros = Ferramentas::formataUrl($vars);
                $paginacao .= '<li class="page-item"><a class="page-link" href="'.$url.$parametros. '">Anterior</a></li>';

            } else {
                $paginacao .= '<li class="page-item disabled"><a class="page-link" href="#">Anterior</a></li>';
            }

            if ($qtdPag >= 1 && $pg <= $qtdPag) {
                for ($i = 1; $i <= $qtdPag; $i++) {
                    if ($i == $pg) {
                        $paginacao .= '<li ' . ( ($pg == $i) ? 'class="page-item active"' : 'class="page-item"' ) . '><a class="page-link" href="#">' . $i . '</a></li>';
                    } else {
                        if ((($i == 3 ) && ($pg >= 6)) || ($i == $qtdPag - 2 ) && ($qtdPag - $pg > 4)) {
                            $paginacao .= '<li class="page-item"><a class="page-link" href="#">...</a></li>';
                        }
                        if (($i == 1 ) || ($i == 2 ) || ($i == $pg - 2 ) || ($i == $pg - 1) || ($i == $pg + 1 ) || ($i == $pg + 2) || ($i == $qtdPag - 1) || ($i == $qtdPag)) {
                            $vars['pg'] = $i;
                            $parametros = Ferramentas::formataUrl($vars);
                            $paginacao .= "<li " . ( ($pg == $i) ? 'class="page-item active"' : 'class="page-item"' ) . "><a class='page-link' href='".$url.$parametros."'>" . $i . "</a></li>";
                        }
                    }
                }
            }

            if ($pg < $qtdPag) {
                $vars['pg'] = $prox;
                $parametros = Ferramentas::formataUrl($vars);
                $paginacao .= '<li class="page-item"><a class="page-link" href="'.$url.$parametros.'">Próximo</a></li>';
            } else {
                $paginacao .= '<li class="page-item disabled"><a class="page-link" href="#">Próximo</a></li>';
            }
            $paginacao .= '</ul>
            </nav>';
        }
        return $paginacao;
    }

}