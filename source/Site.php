<?php

namespace Source;

class Site extends RealEstate
{
    function geraTodosTiposDestaques()
    {
        $tipos = ['', 'casa', 'apartamento', 'sala-comercial', 'terreno'];
        $imovel = new Imoveis();
        $resultados = [];

        foreach ($tipos as $tipo) {
            $resultados[$tipo] = $imovel->destaques($tipo);
        }

        return $resultados; // Agora retorna os destaques agrupados por tipo
    }

    // Cria destaques – optimized query with file-based caching
    function destaques($tipo = null)
    {

        // Define base conditions with alias "i." for clarity.
        $where = "i.destaque = :destaque AND i.ativo = :ativo AND i.indisponivel = :indisponivel";
        $parametros = [
            'destaque'     => 1,
            'ativo'        => 1,
            'indisponivel' => 0
        ];

        // Add type filter if provided.
        if (!empty($tipo)) {
            $where .= " AND LOWER(i.categoria) = :tipo";
            $parametros['tipo'] = strtolower($tipo);
        }

        $pdo = parent::getDB();
        $query = "SELECT i.id, i.cod, i.valor, i.categoria, i.tipo, i.valor_a_combinar, 
                         i.quartos, i.banheiros, i.garagem, b.bairro, c.cidade
                  FROM imoveis i
                  INNER JOIN bairros b ON i.bairro = b.id
                  INNER JOIN cidade c ON i.cidade = c.id
                  WHERE $where
                  ORDER BY i.id DESC
                  LIMIT 9";

        try {
            $listar = $pdo->prepare($query);
            $listar->execute($parametros);
            $dados = $listar->fetchAll();

            $itens = '';
            // foreach ($dados as $row) {
            //     if (empty($row['cod']) || empty($row['valor']) || empty($row['categoria'])) {
            //         continue;
            //     }
            //     $itens .= $this->buildPropertyItem($row);
            // }

            // Site.php (dentro do método destaques())
            foreach ($dados as $row) {
                if (empty($row['cod']) || empty($row['valor']) || empty($row['categoria'])) {
                    continue;
                }
                $item = $this->buildPropertyItem($row);

                // Apenas para o tipo "casa", envolve em .swiper-slide
                if ($tipo === 'casa') {
                    $item = '<div class="swiper-slide">' . $item . '</div>';
                }

                $itens .= $item;
            }

            // Also save the output as JSON (or save the raw data if you prefer)
            $jsonData = [
                'tipo'      => $tipo,
                'html'      => $itens,
                'timestamp' => time()
            ];
            file_put_contents(__DIR__ . '/cache/imoveis/destaques_' . md5($tipo) . '.json', json_encode($jsonData));

            return $itens;
        } catch (\PDOException $e) {
            error_log("Database error in destaques: " . $e->getMessage());
            return '';
        }
    }

    public function buildPropertyItem($row)
    {
        $interaction = Imoveis::getUserInteraction($row['id']);
        $likeActive = ($interaction === 'like') ? 'fa-solid active' : 'fa-regular';
        $dislikeActive = ($interaction === 'dislike') ? 'fa-solid active' : 'fa-regular';

        $tipoRow = htmlspecialchars($row['tipo']);
        $tempo = (strtolower($tipoRow) === 'aluguel') ? '<span class="time">/mês</span>' : '';
        $codigo = htmlspecialchars($row['cod']);
        $preco = 'R$ ' . number_format($row['valor'], 2, ',', '.') . ' ' . $tempo;
        $bairro = htmlspecialchars($row['bairro']);
        $fotos = Imoveis::listaFotos($row['id']);
        $cidade = htmlspecialchars($row['cidade']);
        $categoria = htmlspecialchars($row['categoria']);
        $quartos = $row['quartos'] ?? '0';
        $banheiros = $row['banheiros'] ?? '0';

        $garagem = match ($row['garagem']) {
            1, '1' => "Sim",
            0, null, "" => "Não",
            default => "Não"
        };

        // Pontos próximos
        $linkedPontos = Imoveis::getPontosProximosByImovelId($row['id']);
        $nearbyLocations = '';
        foreach ($linkedPontos as $ponto) {
            $nearbyLocations .= '
            <div class="property--nearby-location">
                <i class="fas ' . htmlspecialchars($ponto->icone) . '"></i>
                <span>' . htmlspecialchars($ponto->estabelecimento) . '</span>
            </div>';
        }

        // Verifica se o imóvel tem linkado para venda/locação
        $linkTagHTML = '';
        $linked = Imoveis::getLinkedImovel($row['id']);
        if ($linked) {
            $currentType = strtolower($row['tipo']);
            if ($currentType === 'vendas' && !empty($linked->id_aluguel)) {
                $linkTagHTML = '<div class="property--linked"><span>Disponível para locação</span></div>';
            } elseif ($currentType === 'aluguel' && !empty($linked->id_venda)) {
                $linkTagHTML = '<div class="property--linked"><span>Disponível para venda</span></div>';
            }
        }

        if (!empty($linkTagHTML)) {
            $nearbyLocations = $linkTagHTML . $nearbyLocations;
        }

        $descricao = '
        <div class="property--features">
            <div class="property--feature-item">
                <i class="fa-solid fa-bed"></i>
                <span>' . $quartos . '</span>
            </div>
            <div class="property--feature-item">
                <i class="fa-solid fa-bath"></i>
                <span>' . $banheiros . '</span>
            </div>
            <div class="property--feature-item">
                <i class="fa-solid fa-car"></i>
                <span>' . $garagem . '</span>
            </div>
        </div>';

        return '
        <a href="imovel?cod=' . $codigo . '" class="property-item">
            <div>
                <div class="property--img">' . $fotos . '</div>

                <div class="property--interaction" data-item-id="' . $row['id'] . '">
                    <i class="fa-solid fa-share-nodes share"></i>
                    <i class="fa-thumbs-down dislike ' . $dislikeActive . '"></i>
                    <i class="fa-heart like ' . $likeActive . '"></i>
                </div>

                <div class="property--content">
                    <div class="property--info">
                        <h5 class="property--title">' . $categoria . ' em ' . $cidade . '</h5>
                        <p class="property--location">Bairro: ' . $bairro . '</p>
                        <div class="property--price-code">
                            <span class="property--price">' . $preco . '</span>
                            <span class="property--code">Cod. ' . $codigo . '</span>
                        </div>
                    </div>
                    <div class="property--features-status">
                        ' . $descricao . '
                        <span class="property--status">' . $tipoRow . '</span>
                    </div>
                    <div class="divider"></div>
                </div>
            </div>
            <div class="property--nearby-locations">
                ' . $nearbyLocations . '
            </div>
        </a>';
    }





    static function relacionados($imovelID)
    {
        $pdo = parent::getDB();
        $query = "SELECT i.tipo, i.categoria, i.cidade, i.quartos, i.valor 
                  FROM imoveis i
                  WHERE i.id = :id";
        $listar = $pdo->prepare($query);
        $listar->execute(['id' => $imovelID]);
        $dados = $listar->fetchAll();

        if (!$dados || !isset($dados[0])) {
            return;
        }

        $tipo = $dados[0]['tipo'];
        $categoria = $dados[0]['categoria'];
        $cidade = $dados[0]['cidade'];
        $quartos = $dados[0]['quartos'];
        $valor = "R$" . ($dados[0]['valor'] * 0.7) . " - R$" . ($dados[0]['valor'] * 1.3);

        Imoveis::listaImoveis($tipo, [$categoria], $cidade, 0, $quartos, 0, $valor, false, 'recente');
    }

    static function estruturaPaginacao($qtdPag, $pg, $prox, $ant, $tipo, $arquivo)
    {
        $paginacao = '';
        $url = Ferramentas::UrlAtual();
        $partes = parse_url($url);
        if (!empty($partes['query'])) {
            $vars = [];
            parse_str($partes['query'], $vars);
        }

        $url = (($tipo != "") ? "$arquivo?" : '');

        if ($qtdPag != 0) {
            $paginacao .= '<div class="col-xs-12 col-sm-12 col-md-12 text-center">';
            $paginacao .= '<ul class="pagination">';
            if ($pg > 1) {
                $vars['pg'] = $ant;
                $parametros = Ferramentas::formataUrl($vars);
                $paginacao .= '<li><a href="' . URL_SITE . $url . $parametros . '#properties-list"><i class="fa fa-angle-left" aria-hidden="true"></i></a></li>';
            } else {
                $paginacao .= '<li><a href="#" aria-label="Anterior"><i class="fa fa-angle-left" aria-hidden="true"></i></a></li>';
            }

            if ($qtdPag >= 1 && $pg <= $qtdPag) {
                for ($i = 1; $i <= $qtdPag; $i++) {
                    if ($i == $pg) {
                        $paginacao .= '<li class="active"><a href="#" aria-label="' . $i . '">' . $i . '</a></li>';
                    } else {
                        if ((($i == 3) && ($pg >= 6)) || (($i == $qtdPag - 2) && ($qtdPag - $pg > 4))) {
                            $paginacao .= "<li><a href='#'>...</a></li>";
                        }
                        if (($i == 1) || ($i == 2) || ($i == $pg - 2) || ($i == $pg - 1) || ($i == $pg + 1) || ($i == $pg + 2) || ($i == $qtdPag - 1) || ($i == $qtdPag)) {
                            $vars['pg'] = $i;
                            $parametros = Ferramentas::formataUrl($vars);
                            $paginacao .= "<li><a " . (($pg == $i) ? 'class="active"' : '') . " href='" . URL_SITE . $url . $parametros . "#properties-list'>" . $i . "</a></li>";
                        }
                    }
                }
            }

            if ($pg < $qtdPag) {
                $vars['pg'] = $prox;
                $parametros = Ferramentas::formataUrl($vars);
                $paginacao .= '<li><a href="' . URL_SITE . $url . $parametros . '#properties-list"><i class="fa fa-angle-right" aria-hidden="true"></i></a></li>';
            } else {
                $paginacao .= '<li><a href="#" aria-label="Posterior"><i class="fa fa-angle-right" aria-hidden="true"></i></a></li>';
            }
            $paginacao .= '</ul></div>';
        }
        return $paginacao;
    }

    function ordemFotos($imovelID)
    {
        $pdo = parent::getDB();
        $sql = "SELECT * FROM arquivos WHERE id_imovel = ? ORDER BY ordem";
        $query = $pdo->prepare($sql);
        $query->bindValue(1, $imovelID, \PDO::PARAM_INT);
        $query->execute();

        $fotos = [];
        foreach ($query->fetchAll() as $row) {
            $fotos[$row['ordem']] = $row['arquivo'];
        }
        return $fotos;
    }
}
