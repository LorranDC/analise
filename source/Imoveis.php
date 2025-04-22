<?php

namespace Source;

/** 
 * ARQUIVO COM PRINCIPAIS CONSULTAS A `imoveis`
 */

use Source\Site;
use \PDO;

class Imoveis extends Site
{
    // Função que consulta várias informações dos imoveis para listá-los
    static function listaImoveis(
        $tipo,
        $categorias = [],
        $cidade = 0,
        $bairros = [],
        $quartos = 0,
        $banheiros = 0,
        $range = 0,
        $temPaginacao = false,
        $order = 'recente'
    ) {
        try {
            // Sanitiza entrada
            $tipo = filter_var($tipo, FILTER_SANITIZE_STRING);
            $categorias = array_map(function ($cat) {
                return filter_var($cat, FILTER_SANITIZE_STRING);
            }, $categorias);
            $cidade = intval($cidade);
            $bairros = array_map('intval', $bairros);
            $quartos = intval($quartos);
            $banheiros = intval($banheiros);
            $range = filter_var($range, FILTER_SANITIZE_STRING);
            $order = in_array($order, ['recente', 'maior-valor', 'menor-valor', 'mais-vistos']) ? $order : 'recente';
        } catch (\Exception $e) {
            echo "Erro ao processar os parâmetros: " . $e->getMessage();
            return;
        }

        // Define limite e início, para fazer a paginação
        $limite = 12;
        $pg = (isset($_GET['pg'])) ? (int) $_GET['pg'] : 1;
        $inicio = ($pg * $limite) - $limite;
        // Define o LIMIT do query
        $sql_limit = " LIMIT $inicio, $limite";

        if (!empty($tipo)) {
            $where = "i.tipo = :tipo ";
            $paramarray = ['tipo' => $tipo];
        } else {
            $where = "i.tipo IN ('aluguel', 'vendas') ";
            $paramarray = [];
        }

        // Valores do ORDER BY
        $ordens  = [
            'recente'     => " ORDER BY i.id DESC ",
            'maior-valor' => " ORDER BY i.valor DESC ",
            'menor-valor' => " ORDER BY i.valor ASC ",
            'mais-vistos' => " ORDER BY v.visualizacoes DESC "
        ];
        $order = isset($ordens[$order]) ? $order : 'recente';
        $order_by = $ordens[$order];

        // Tempo para exibir no preço, conforme tipo
        $tempo = ($tipo === 'aluguel') ? '<span class="time">mês</span>' : '';

        // Verificação de quartos
        if (isset($_GET['quartos']) && $_GET['quartos'] !== "") {
            if ($_GET['quartos'] == 0) {
                $where .= " AND (i.quartos = :quartos OR i.quartos IS NULL) ";
            } else {
                $where .= " AND i.quartos = :quartos ";
            }
            $paramarray['quartos'] = $_GET['quartos'];
        }

        // Verificação de garagem
        if (isset($_GET['garagem']) && $_GET['garagem'] !== "") {
            $where .= " AND (i.garagem = :garagem OR (i.garagem IS NULL AND :garagem = 0)) ";
            $paramarray['garagem'] = $_GET['garagem'];
        }

        // Verificação de banheiros
        if (!empty($banheiros)) {
            $where .= " AND i.banheiros = :banheiros ";
            $paramarray['banheiros'] = $banheiros;
        }

        // Filtro para categorias
        if (!empty($categorias) && is_array($categorias) && !in_array("0", $categorias)) {
            $placeholders = [];
            foreach ($categorias as $key => $categoria) {
                $placeholders[] = ":categoria$key";
                $paramarray["categoria$key"] = $categoria;
            }
            if (!empty($placeholders)) {
                $where .= " AND i.categoria IN (" . implode(", ", $placeholders) . ")";
            }
        }

        // Filtro para cidade
        if (!empty($cidade)) {
            $where .= " AND c.id = :cidade ";
            $paramarray['cidade'] = $cidade;
        }

        // Filtro para bairros
        if (!empty($bairros)) {
            if (is_array($bairros) && !in_array("0", $bairros)) {
                $placeholders = [];
                foreach ($bairros as $key => $bairro) {
                    $placeholders[] = ":bairro$key";
                    $paramarray["bairro$key"] = $bairro;
                }
                $where .= " AND b.id IN (" . implode(", ", $placeholders) . ")";
            }
        }

        // Faixa de preço
        if ($range !== "a-combinar") {
            $minMax = explode('-', $range);
            $where_min = $where_max = '';
            if (count($minMax) == 2) {
                $minVal = preg_replace('/\D/', '', $minMax[0]);
                $maxVal = preg_replace('/\D/', '', $minMax[1]);
                if (!empty($minVal)) {
                    $where_min = " AND (i.valor+0) >= :mini ";
                    $paramarray['mini'] = (float)$minVal;
                }
                if (!empty($maxVal) && ($maxVal != "4000" && $maxVal != "4000000")) {
                    $where_max = " AND (i.valor+0) <= :maxi ";
                    $paramarray['maxi'] = (float)$maxVal;
                }
            }
            $where .= $where_min . $where_max . " AND i.valor_a_combinar = :combinar ";
            $paramarray['combinar'] = 0;
        } else {
            $where .= " AND i.valor_a_combinar = :combinar ";
            $paramarray['combinar'] = 1;
        }

        // Condições finais para imóveis ativos e disponíveis
        $where .= " AND i.ativo = :ativo AND i.indisponivel = :indisponivel ";
        $paramarray['ativo'] = 1;
        $paramarray['indisponivel'] = 0;

        // Conexão com o BD
        $pdo = parent::getDB();

        // ====================================================
        // 1. Query para total de resultados (para paginação)
        // ====================================================
        $queryCount = "SELECT COUNT(*) as total 
                       FROM imoveis i
                       INNER JOIN bairros b ON i.bairro = b.id
                       INNER JOIN cidade c ON i.cidade = c.id
                       LEFT JOIN visualizacoes v ON i.id = v.imovel_id
                       WHERE $where";
        $stmtCount = $pdo->prepare($queryCount);
        $stmtCount->execute($paramarray);
        $totalPaginacao = (int)$stmtCount->fetchColumn();
        $qtdPag = ceil($totalPaginacao / $limite);
        $prox = ($pg + 1);
        $ant = ($pg - 1);

        // ====================================================
        // 2. Query principal com LIMIT
        // ====================================================
        $query = "SELECT i.id, i.cod, i.valor, i.categoria, i.tipo, i.valor_a_combinar, 
                         i.quartos, i.banheiros, i.garagem, 
                         i.descricao, i.reservado, b.bairro, c.cidade 
                  FROM imoveis i
                  INNER JOIN bairros b ON i.bairro = b.id
                  INNER JOIN cidade c ON i.cidade = c.id
                  LEFT JOIN visualizacoes v ON i.id = v.imovel_id
                  WHERE $where
                  $order_by";
        // Verifica se algum parâmetro está como array (erro)
        foreach ($paramarray as $key => $value) {
            if (is_array($value)) {
                throw new \Exception("Parâmetro inválido: $key é um array. Verifique o filtro de bairros.");
            }
        }
        $listar = $pdo->prepare($query . $sql_limit);
        $listar->execute($paramarray);
        $dados = $listar->fetchAll();

        $itens = '';
        foreach ($dados as $row) {
            $itens .= self::renderCard($row, 'lista');
        }

        echo $itens;

        // Gera a paginação, se necessário
        $paginacao = '';
        if ($temPaginacao) {
            $paginacao = '<div class="col-xs-12 col-sm-12 col-md-12 text-center mt-2">
                            <ul class="pagination">' .
                Imoveis::estruturaPaginacao($qtdPag, $pg, $prox, $ant, $tipo, 'imoveis.php') .
                '</ul>
                          </div>';
        }

        // Exibe os itens ou mensagem de "nenhum resultado"
        if (empty($itens)) {
            if ($range !== "R$0 - R$999.999.999" && $range !== "a-combinar") {
                echo '<div class="no-results" style="text-align: center; margin: 20px;">
                      <p>Nenhum imóvel encontrado na faixa de preço selecionada.</p>
                      <a href="imoveis.php" class="btn btn-clear" style="padding: 15px; background-color: rgb(194, 4, 4); color: white; text-decoration: none; margin-bottom: 20px; display: inline-flex; justify-content: center; align-items: center; height: 50px;">Limpar filtros</a>
                      </div>';
            } else {
                echo '<div class="no-results" style="text-align: center; margin: 20px;">
                      <p>Nenhum imóvel encontrado com os filtros selecionados.</p>
                      <a href="imoveis.php" class="btn btn-clear" style="padding: 15px; background-color: rgb(194, 4, 4); color: white; text-decoration: none; margin-bottom: 20px; display: inline-flex; justify-content: center; align-items: center; height: 50px;">Limpar filtros</a>
                      </div>';
            }
        } else {
            echo $itens . $paginacao;
        }
    }

    public static function renderCard(array $row, string $contexto = 'lista'): string
    {
        $interaction = self::getUserInteraction($row['id']);
        $likeActive = ($interaction === 'like') ? 'fa-solid active' : 'fa-regular';
        $dislikeActive = ($interaction === 'dislike') ? 'fa-solid active' : 'fa-regular';

        $tipoRow = htmlspecialchars($row['tipo']);
        $tempo = (strtolower($tipoRow) === 'aluguel') ? '<span class="time">/mês</span>' : '';
        $codigo = htmlspecialchars($row['cod']);
        $preco = 'R$ ' . number_format(floatval($row['valor']), 2, ',', '.') . ' ' . $tempo;
        $bairro = htmlspecialchars($row['bairro']);
        $fotos = self::listaFotos($row['id']);
        $cidade = htmlspecialchars($row['cidade']);
        $categoria = htmlspecialchars($row['categoria']);
        $quartos = $row['quartos'] ?? '0';
        $banheiros = $row['banheiros'] ?? '0';
        $garagem = match ($row['garagem']) {
            1, '1' => "Sim",
            0, null, "" => "Não",
            default => "Não"
        };

        $linkedPontos = self::getPontosProximosByImovelId($row['id']);
        $nearbyLocations = '';
        foreach ($linkedPontos as $ponto) {
            $nearbyLocations .= '
            <div class="property--nearby-location">
                <i class="fas ' . htmlspecialchars($ponto->icone) . '"></i>
                <span>' . htmlspecialchars($ponto->estabelecimento) . '</span>
            </div>';
        }

        $linkTagHTML = '';
        $linked = self::getLinkedImovel($row['id']);
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

        $wrapperClass = ($contexto === 'home') ? 'carousel-item' : 'col col-12 col-sm-6 col-md-3 mb-4 me-3';

        return '
        <div class="' . $wrapperClass . '">
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
            </a>
        </div>';
    }





    // Lista fotos com base no ID do imóvel
    static function listaFotos(int $imovelID): string
{
    // relative to your project root
    $relDir = "assets/images/properties/{$imovelID}";

    // fetch the actual filenames
    $helper = new Imovel;
    $files  = $helper->getImageById($imovelID, 0);

    // How many slides you want max
    $maxSlides = 5;

    if (empty($files)) {
        // fallback when there are no photos
        return <<<HTML
        <div class="swiper property-images-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="assets/images/placeholder.jpg" alt="Sem foto do imóvel" class="img-fluid"/>
                </div>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-pagination"></div>
        </div>
        HTML;
    }

    // slice down to the first $maxSlides files
    $files = array_slice($files, 0, $maxSlides);

    // build each slide
    $slides = '';
    foreach ($files as $fullPath) {
        $file   = basename($fullPath);
        $imgUrl = "{$relDir}/{$file}";  // relative — no leading slash
        $slides .= <<<HTML
        <div class="swiper-slide">
            <img src="{$imgUrl}" alt="Foto do imóvel" class="img-fluid"/>
        </div>
        HTML;
    }

    // return the full swiper container
    return <<<HTML
    <div class="swiper property-images-swiper">
        <div class="swiper-wrapper">
            {$slides}
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-pagination"></div>
    </div>
    HTML;
}



    function getImageById($imovelID, $miniatura = 0)
    {
        $dir = "assets/images/properties/$imovelID/";
        if ($miniatura === 0) {
            $fotos = glob($dir . "*.{jpg,JPG,jpeg,JPEG}", GLOB_BRACE);
        } else {
            switch ($miniatura) {
                case 1:
                    $dir .= "miniaturas/273x182/";
                    break;
                case 2:
                    $dir .= "miniaturas/150x150/";
                    break;
                case 3:
                    $dir .= "miniaturas/50x50/";
                    break;
                case 4:
                    $dir .= "miniaturas/354x236/";
                    break;
            }
            $fotos = glob($dir . "*.{jpg,JPG,jpeg,JPEG}", GLOB_BRACE);
        }
        if (empty($fotos) && $miniatura !== 0) {
            return $this->getImageById($imovelID, 0);
        }
        $ordemFotos = $this->ordemFotos($imovelID);
        if (!empty($ordemFotos)) {
            foreach ($ordemFotos as $key => $value) {
                $ordemFotos[$key] = $dir . $value;
            }
            $union = array_unique(array_merge($ordemFotos, $fotos));
            return $this->setFotoDestaqueAsFirst($union, $imovelID, $dir);
        }
        return $this->setFotoDestaqueAsFirst($fotos, $imovelID, $dir);
    }

    function setFotoDestaqueAsFirst($files, $imovelID, $dir)
    {
        $fotoDestaque = $this->findDataById('imoveis', $imovelID, 1)->foto_destaque;
        if (empty($fotoDestaque)) {
            return $files;
        }
        foreach ($files as $key => $value) {
            if ($dir . $fotoDestaque === $value) {
                unset($files[$key]);
                array_unshift($files, $dir . $fotoDestaque);
                break;
            }
        }
        return $files;
    }

    // Lista Cidades
    static function listaCidades(string $tipo = null)
    {
        $pdo = parent::getDB();
        $tipo = strtolower($tipo);
        if ($tipo === 'aluguel') {
            $query = "SELECT id, cidade 
                      FROM cidade 
                      WHERE id IN (1, 2)
                      ORDER BY cidade ASC";
        } elseif ($tipo === 'vendas') {
            $query = "SELECT id, cidade 
                      FROM cidade
                      ORDER BY cidade ASC";
        } else {
            $query = "SELECT id, cidade 
                      FROM cidade
                      ORDER BY cidade ASC";
        }
        $listar = $pdo->prepare($query);
        $listar->execute();
        $dados = $listar->fetchAll();
        $cidadeSelecionada = $_GET['cidade'] ?? '';
        foreach ($dados as $row) {
            $selected = ($cidadeSelecionada == $row['id']) ? 'selected' : '';
            echo "<option value='{$row['id']}' {$selected}>"
                . htmlspecialchars($row['cidade']) . "</option>";
        }
    }

    static function listaCidadesHome(string $tipo = null)
    {
        $cidade = (isset($_GET['cidade']) ? $_GET['cidade'] : '');
        $pdo = parent::getDB();
        if ($tipo == 1) {
            $listar = $pdo->prepare("SELECT c.id, c.cidade FROM cidade c WHERE c.id in(1,2)");
        } else {
            $listar = $pdo->prepare("SELECT c.id, c.cidade FROM cidade c ");
        }
        $listar->execute();
        $dados = $listar->fetchAll();
        $options = '';
        if (empty($cidade)) {
            $options .= "<option value='0'>Cidade</option>";
        }
        foreach ($dados as $row) {
            $options .= "<option value='" . $row['id'] . "' " . ($cidade == $row['id'] ? "selected" : '')
                . ">" . htmlspecialchars($row['cidade']) . "</option>";
        }
        echo $options;
    }

    static function listaBairros($cidade)
    {
        if (empty($cidade)) {
            return "<option value='0'>Todos</option>";
        }

        $options = [];
        $options[] = "<option value='0'>Todos</option>";

        try {
            $pdo = parent::getDB();
            $stmt = $pdo->prepare("SELECT id, bairro FROM bairros WHERE cidade = :cidade ORDER BY bairro ASC");
            $stmt->execute(['cidade' => $cidade]);

            foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
                $options[] = sprintf(
                    '<option value="%d">%s</option>',
                    $row['id'],
                    htmlspecialchars($row['bairro'])
                );
            }
        } catch (\PDOException $e) {
            error_log("Error fetching bairros: " . $e->getMessage());
            return "<option value='0'>Erro ao carregar bairros</option>";
        }

        return implode("\n", $options);
    }


    // Recupera valores máximos e mínimos de imóveis sob venda e aluguel
    function getMaxMin()
    {
        $pdo = parent::getDB();
        $queryAluguel = ("SELECT MIN(valor) AS minalu,
                    MAX(valor) AS maxalu
            FROM `imoveis`
            WHERE tipo= :aluguel
                AND ativo= :ativo
                AND indisponivel = :indisponivel");
        $listar = $pdo->prepare($queryAluguel);
        $listar->execute(['aluguel' => 'Aluguel', 'ativo' => 1, 'indisponivel' => 0]);
        $dados = $listar->fetchAll();
        foreach ($dados as $row) {
            $minAluguel = $row['minalu'];
            $maxAluguel = $row['maxalu'];
        }
        $valores = [0 => $minAluguel, 1 => $maxAluguel];
        $queryVendas = ("SELECT MIN(valor) AS minven,
                    MAX(valor) AS maxven
            FROM `imoveis`
            WHERE tipo= :vendas
                AND valor > 0
                AND ativo= :ativo");
        $listar = $pdo->prepare($queryVendas);
        $listar->execute(['vendas' => 'Vendas', 'ativo' => 1]);
        $dados = $listar->fetchAll();
        foreach ($dados as $row) {
            $minVendas = $row['minven'];
            $maxVendas = $row['maxven'];
        }
        $valores[2] = $minVendas;
        $valores[3] = $maxVendas;
        return $valores;
    }

    // Gera quantidade de itens de cada coluna
    function qtdPorCategoria($coluna, $h5)
    {
        $pdo = parent::getDB();
        $query = ("SELECT $coluna, count(*) as quantidade FROM `imoveis` WHERE ativo = :ativo AND indisponivel = :indisponivel GROUP BY $coluna");
        if ($coluna == 'cidade') {
            $query = ("SELECT c.$coluna, count(*) as quantidade
            FROM `imoveis` i
            RIGHT JOIN cidade c ON c.id = i.cidade 
            WHERE ativo = :ativo AND indisponivel = :indisponivel 
            GROUP BY $coluna");
        }
        $listar = $pdo->prepare($query);
        $listar->bindValue(':ativo', 1);
        $listar->bindValue(':indisponivel', 0);
        $listar->execute();
        $dados = $listar->fetchAll();
        $colunas = [
            'categoria' => 'categoria',
            'tipo'      => 'tipo',
            'cidade'    => 'cidade',
            'valor'     => 'preco'
        ];
        $url = Ferramentas::UrlAtual();
        $partes = parse_url($url);
        if (!empty($partes['query'])) {
            $vars = [];
            parse_str($partes['query'], $vars);
        }
        $vars['faixa-preco'] = 0;
        $linhas = '<div class="widget widget-property">
        <div class="widget--title">
            <h5>' . $h5 . '</h5>
        </div>
        <div class="widget--content">
            <ul class="list-unstyled mb-0">';
        foreach ($dados as $row) {
            $vars[$colunas[$coluna]] = $row[$coluna];
            if ($row[$coluna] == "Elói Mendes") {
                $vars[$colunas[$coluna]] = 2;
            }
            if ($row[$coluna] == "Varginha") {
                $vars[$colunas[$coluna]] = 1;
            }
            $parametros = Ferramentas::formataUrl($vars);
            $linhas .= '<li>
            <a href="' . URL_SITE . 'imoveis?' . $parametros . '">' . htmlspecialchars($row[$coluna]) . ' <span>(' . $row['quantidade'] . ')</span></a>
        </li>';
        }
        $linhas .= '</ul>
            </div>
        </div>';
        return $linhas;
    }

    /**
     * Fetch pontos_proximos linked to a specific imóvel.
     * @param int $imovelId ID of the property.
     * @return array Array of linked establishments.
     */
    public static function getPontosProximosByImovelId($imovelId)
    {
        $pdo = parent::getDB();
        $sql = "
        SELECT pp.id, pp.estabelecimento, pp.icone
        FROM imoveis_pontos_proximos ipp
        JOIN pontos_proximos pp ON ipp.ponto_proximo_id = pp.id
        WHERE ipp.imovel_id = :imovel_id
        ORDER BY CHAR_LENGTH(pp.estabelecimento) ASC
        LIMIT 5
    ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':imovel_id', $imovelId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    /**
     * Retrieves the linked imovel record for the given imovel.
     *
     * This method checks if there is a row in the `imoveis_link` table where the
     * provided imovel ID appears either as the id_venda or id_aluguel.
     *
     * @param int $imovelId The current imovel's ID.
     * @return object|false Returns the linked imovel record as an object if found; otherwise false.
     */
    public static function getLinkedImovel($imovelId)
    {
        $pdo = parent::getDB();
        $sql = "
        SELECT * 
        FROM imoveis_link 
        WHERE id_venda = :imovelId OR id_aluguel = :imovelId 
        LIMIT 1
    ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['imovelId' => $imovelId]);
        return $stmt->fetch(PDO::FETCH_OBJ);
    }

    public static function getUserInteraction($itemId)
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $userId = $_SESSION['user']['id'] ?? null;
        $uniqueId = $_COOKIE['uniqueVisitorId'] ?? null;

        if (!$userId && !$uniqueId) {
            return null;
        }

        $pdo = \Source\Conexao::getDB();

        $stmt = $pdo->prepare("
        SELECT action FROM user_interactions 
        WHERE item_id = :item_id
        AND (
            (user_id IS NOT NULL AND user_id = :user_id)
            OR (user_id IS NULL AND unique_id = :unique_id)
        )
        ORDER BY user_id DESC
        LIMIT 1
    ");

        $stmt->execute([
            'item_id' => $itemId,
            'user_id' => $userId,
            'unique_id' => $uniqueId
        ]);

        return $stmt->fetchColumn() ?: null;
    }
}

// EOF
