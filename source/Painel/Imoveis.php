<?php

namespace Source\Painel;

use \PDO; // Adiciona a classe PDO nativa do PHP


// ================= ARQUIVO COM PRINCIPAIS CONSULTAS A `imoveis` ================= //
// Importa a classe models, que é filha de conexao, que conecta com o banco de dados
use Source\Ferramentas;

// Imoveis é classe filha de Models - de modo a usar as mesmas informações de host, usuario e senha
class Imoveis extends Dashboard
{


    /**
     * Link two imoveis, enforcing that the linked imovel must be of the opposite type
     * and not already linked.
     *
     * @param int $currentId Current imovel ID.
     * @param int $otherId   The imovel ID to link.
     * @return bool|string Returns true on success, or an error message on failure.
     */
    public static function linkImoveisByCurrent($currentId, $otherId)
    {
        $pdo = parent::getDB();

        // Retrieve current imovel type
        $stmt = $pdo->prepare("SELECT tipo FROM imoveis WHERE id = :id");
        $stmt->execute(['id' => $currentId]);
        $current = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$current) {
            return "Imóvel atual não encontrado.";
        }

        // Retrieve the other imovel type
        $stmtOther = $pdo->prepare("SELECT tipo FROM imoveis WHERE id = :id");
        $stmtOther->execute(['id' => $otherId]);
        $other = $stmtOther->fetch(PDO::FETCH_ASSOC);
        if (!$other) {
            return "Imóvel para vinculação não encontrado.";
        }

        // Ensure the types are opposite:
        if (strtolower($current['tipo']) === strtolower($other['tipo'])) {
            return "Para vincular, os imóveis devem ser de tipos opostos (Venda x Aluguel).";
        }

        // Check if the other imovel is already linked in any record.
        $stmtLink = $pdo->prepare("
        SELECT id 
        FROM imoveis_link 
        WHERE id_venda = :otherId OR id_aluguel = :otherId
    ");
        $stmtLink->execute(['otherId' => $otherId]);
        if ($stmtLink->fetch(PDO::FETCH_ASSOC)) {
            return "O imóvel informado já está vinculado a outro imóvel.";
        }

        // Determine the roles:
        if (strtolower($current['tipo']) === 'vendas') {
            $idVenda = $currentId;
            $idAluguel = $otherId;
        } else {
            $idVenda = $otherId;
            $idAluguel = $currentId;
        }

        // Insert the linking record.
        $stmtInsert = $pdo->prepare("
        INSERT INTO imoveis_link (id_venda, id_aluguel)
        VALUES (:idVenda, :idAluguel)
    ");
        $success = $stmtInsert->execute([
            'idVenda' => $idVenda,
            'idAluguel' => $idAluguel
        ]);

        return $success ? true : "Erro ao inserir o vínculo.";
    }



    /**
     * Fetch all pontos_proximos (establishment types) from the database.
     * @return array Array of establishments with id, name, and icon.
     */
    public static function getAllPontosProximos()
    {
        $pdo = parent::getDB();
        $sql = "SELECT id, estabelecimento, icone FROM pontos_proximos ORDER BY estabelecimento";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
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
    ";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':imovel_id', $imovelId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    /**
     * Save pontos_proximos for a specific imóvel.
     * @param int $imovelId ID of the property.
     * @param array $pontosProximosIds Array of selected pontos_proximos IDs.
     */
    public static function savePontosProximosForImovel($imovelId, $pontosProximosIds)
    {
        $pdo = parent::getDB();

        // Start transaction
        $pdo->beginTransaction();

        try {
            // Delete existing links for the imóvel
            $sqlDelete = "DELETE FROM imoveis_pontos_proximos WHERE imovel_id = :imovel_id";
            $stmtDelete = $pdo->prepare($sqlDelete);
            $stmtDelete->bindValue(':imovel_id', $imovelId, PDO::PARAM_INT);
            $stmtDelete->execute();

            // Insert new links
            if (!empty($pontosProximosIds)) {
                $sqlInsert = "INSERT INTO imoveis_pontos_proximos (imovel_id, ponto_proximo_id) VALUES (:imovel_id, :ponto_proximo_id)";
                $stmtInsert = $pdo->prepare($sqlInsert);

                foreach ($pontosProximosIds as $pontoId) {
                    $stmtInsert->bindValue(':imovel_id', $imovelId, PDO::PARAM_INT);
                    $stmtInsert->bindValue(':ponto_proximo_id', $pontoId, PDO::PARAM_INT);
                    $stmtInsert->execute();
                }
            }

            // Commit transaction
            $pdo->commit();
        } catch (\Exception $e) {
            // Rollback on error
            $pdo->rollBack();
            throw new \Exception("Erro ao salvar pontos próximos: " . $e->getMessage());
        }
    }

    function listaImoveis($ordem)
    {

        $where        = " WHERE ativo = :ativo";
        $where_params = ['ativo' => 1];

        if ($_SESSION['adm']['imoveis--quartos'] !== "0") {
            if ($_SESSION['adm']['imoveis--quartos'] !== "-") {
                $where .= " AND i.quartos = :quartos ";
                $where_params['quartos'] = $_SESSION['adm']['imoveis--quartos'];
            } elseif ($_SESSION['adm']['imoveis--quartos'] === "-") {
                $where .= " AND i.quartos IS NULL ";
            }
        }

        if ($_SESSION['adm']['imoveis--banheiros'] !== "0") {
            if ($_SESSION['adm']['imoveis--banheiros'] !== "-") {
                $where .= " AND i.banheiros = :banheiros ";
                $where_params['banheiros'] = $_SESSION['adm']['imoveis--banheiros'];
            } elseif ($_SESSION['adm']['imoveis--banheiros'] === "-") {
                $where .= " AND i.banheiros IS NULL ";
            }
        }

        if (($_SESSION['adm']['imoveis--status'] !== "indisponivel") && $_SESSION['adm']['imoveis--status'] !== "0") {
            $where .= " AND i.tipo = :tipo ";
            $where_params['tipo'] = $_SESSION['adm']['imoveis--status'];
        } elseif ($_SESSION['adm']['imoveis--status'] === 'indisponivel') {
            $where .= " AND i.indisponivel = :stat ";
            $where_params['stat'] = 1;
        }

        if ($_SESSION['adm']['imoveis--cidade'] !== "0") {
            $where .= " AND i.cidade = :cidade ";
            $where_params['cidade'] = $_SESSION['adm']['imoveis--cidade'];
        }

        if ($_SESSION['adm']['imoveis--categoria'] !== "0") {
            $where .= " AND i.categoria = :categoria ";
            $where_params['categoria'] = $_SESSION['adm']['imoveis--categoria'];
        }

        if (!empty($_SESSION['adm']['imoveis--buscar-por-cod'])) {
            $where .= " AND i.cod LIKE :cod ";
            $where_params['cod'] = $_SESSION['adm']['imoveis--buscar-por-cod'] . "%";
        }
        if (!empty($_SESSION['adm']['imoveis--busca'])) {
            $where .= " AND (i.categoria LIKE :scategoria 
                        OR c.cidade LIKE :scidade
                        OR b.bairro LIKE :sbairro
                        OR i.endereco LIKE :sendereco
                        OR i.numero LIKE :snumero) ";
            $where_params['scategoria'] = "%" . $_SESSION['adm']['imoveis--busca'] . "%";
            $where_params['scidade']    = "%" . $_SESSION['adm']['imoveis--busca'] . "%";
            $where_params['sbairro']    = "%" . $_SESSION['adm']['imoveis--busca'] . "%";
            $where_params['sendereco']  = "%" . $_SESSION['adm']['imoveis--busca'] . "%";
            $where_params['snumero']    = "%" . $_SESSION['adm']['imoveis--busca'] . "%";
        }


        $ordenacao = [
            'codigoD' => " ORDER BY CAST(cod AS UNSIGNED) DESC ",
            'codigoA' => " ORDER BY CAST(cod AS UNSIGNED) ASC ",
            'valorA' => " ORDER BY valor ASC ",
            'valorD' => " ORDER BY valor DESC ",
            '' => ' ',
            '1' => ' ',
            0 => ' '
        ];

        $order_by  = $ordenacao[$ordem];

        $limite    = isset($_SESSION['adm']['limite']) ? $_SESSION['adm']['limite'] : 12;

        $pg        = (isset($_GET['pg'])) ? (int) $_GET['pg'] : 1;
        $inicio    = ($pg * $limite) - $limite;
        // Define o LIMIT do query
        $sql_limit = "LIMIT $inicio, $limite";

        $pdo       = parent::getDB();
        $sql       = "SELECT i.id, i.cod, i.tipo, i.categoria, i.endereco, i.numero,
                i.CEP, b.bairro, c.cidade, i.valor, i.foto_destaque, 
                i.quartos, i.banheiros, i.garagem, i.area_construida, i.area_terreno, 
                i.indisponivel 
                FROM `imoveis` i 
                INNER JOIN `cidade` c ON i.cidade = c.id 
                INNER JOIN `bairros` b ON i.bairro = b.id 
                $where 
                $order_by";

        // Prepara e executa o query, conforme padrões do PDO
        // Query feito SEM O LIMITE de itens por página...
        $result    = $pdo->prepare($sql);

        foreach ($where_params as $key => $where_param) {
            $result->bindValue(":" . $key, $where_param);
        }
        $result->execute();
        // ... para poder armazenar a quantidade total de linhas retornadas do query
        $totalPaginacao = $result->rowCount();
        // Gera total de págians e manipuila em qual página está
        $qtdPag         = ceil($totalPaginacao / $limite);
        $prox           = ($pg + 1);
        $ant            = ($pg - 1);

        // Refaz o query, dessa vez com o limite, para exibir uma quantidade limitada por página
        $result         = $pdo->prepare($sql . $sql_limit);

        foreach ($where_params as $key => $where_param) {
            $result->bindValue(":" . $key, $where_param);
        }
        $result->execute();

        $dados = $result->fetchAll();

        $itens = "";
        foreach ($dados as $row) {

            if (!empty($row['endereco'])) {
                $endereco = trim(htmlspecialchars($row['endereco'])) . ", " . $row['numero'];
            } else {
                $endereco = 'Endereço não informado.';
            }

            $garagem = match ($row['garagem']) {
                NULL, "" => '-',
                0, "0" => "Não",
                1, "1" => "Sim"
            };


            $info = [
                'categoria' => htmlspecialchars($row['categoria']),
                'cidade' => htmlspecialchars($row['cidade']),
                'endereco' => $endereco,
                'quartos' => empty($row['quartos']) ? '-' : $row['quartos'],
                'banheiros' => empty($row['banheiros']) ? '-' : $row['banheiros'],
                'garagem' => $garagem,
                'codigo' => $row['cod'],
                'preco' => "R$ " . number_format($row['valor'], 2, ',', '.'),
                'tipo' => htmlspecialchars($row['tipo']),
                'bairro' => htmlspecialchars($row['bairro'])
            ];

            $background = match ($info['tipo']) {
                'vendas', 'Vendas' => 'class="l-vendas"',
                'aluguel', 'Aluguel' => 'class="l-aluguel"'
            };

            $info['tipo'] = match ($info['tipo']) {
                'vendas', 'Vendas' => '<span class="badge badge-danger">' . $info['tipo'] . '</span>',
                'aluguel', 'Aluguel' => '<span class="badge badge-warning">' . $info['tipo'] . '</span>'
            };

            if ($row['indisponivel']) {
                $info['tipo'] = '<span class="badge badge-secondary">Indisponível</span>';
            }

            $item  = '<tr ' . $background . '>
                <td>' . $info['codigo'] . '</td> <!-- codigo -->
                <td class="d-flex"> <!-- imovel -->
                    <div>
                        <strong>' . $info['bairro'] . ' - ' . $info['cidade'] . '</strong>
                        <div class="font-13 text-muted hidden-md">' . $info['endereco'] . '</div>
                    </div>
                </td>
                <!-- <td>' . $info['quartos'] . '</td> <!-- quartos -->
                <!-- <td>' . $info['banheiros'] . '</td> <!-- banheiros -->
                <!-- <td>' . $info['garagem'] . '</td> <!-- garagem -->
                <td> <!-- categoria -->
                    <span class="text-capitalize">' . $info['categoria'] . '</span>
                </td>
                <td class="text-right"><strong class="text-info pr-5">' . $info['preco'] . '</strong></td> <!-- valor -->
                <td>' . $info['tipo'] . '</td> <!-- status -->
                <td class="actions"> <!-- ações -->
                    <a href="editar-imovel.php?id=' . $row['id'] . '" class="btn btn-sm btn-icon btn-pure btn-default on-default button-edit" data-toggle="tooltip" data-original-title="Editar"><i class="far fa-pen-to-square" aria-hidden="true"></i></a>
                    <a href="../../imovel.php?cod=' . $row['cod'] . '" target="_blank" class="btn btn-sm btn-icon btn-pure btn-default on-default button-edit" data-toggle="tooltip" data-original-title="Ver no site"><i class="far fa-eye" aria-hidden="true"></i></a>
                </td>
            </tr>';

            $itens .= $item;
        }

        $paginacao = $this->estruturaPaginacao($qtdPag, $pg, $prox, $ant, $tipo = 0, $arquivo = 'listar-imoveis.php');

        if ($itens === "") {
            $itens = '<td colspan="9"><h3 class="text-danger text-center">Não foi possível encontrar nenhum resultado!</h3></td>';
        }

        $dot     = "Ordem: " . $_SESSION['adm']['imoveis--ordem'];
        $dot .= "<br>Quartos: " . $_SESSION['adm']['imoveis--quartos'];
        $dot .= "<br>Banheiros: " . $_SESSION['adm']['imoveis--banheiros'];
        $dot .= "<br>Status: " . $_SESSION['adm']['imoveis--status'];
        $dot .= "<br>Cidade: " . $_SESSION['adm']['imoveis--cidade'];
        $dot .= "<br>Categoria " . $_SESSION['adm']['imoveis--categoria'];
        $dot .= "<br>Busca: " . "";
        $dot .= "<br>Busca por Código: " . $_SESSION['adm']['imoveis--buscar-por-cod'];

        $retorno = [
            'dot' => $dot,
            'itens' => $itens,
            'paginacao' => $paginacao
        ];

        return $retorno;
    }

    function getImovel($id)
    {
        $pdo    = parent::getDB();
        $sql    = "SELECT * FROM  `imoveis` WHERE id = ?";
        $result = $pdo->prepare($sql);
        $result->bindParam(1, $id);
        $result->execute();

        $dados = $result->fetchAll();

        foreach ($dados as $row) {

            $pontosProximos = self::getPontosProximosByImovelId($id);
            // Define e trata devidamente cada variável que será necessária
            // Algumas variáveis podem receber valor nulo, para serem concatenadas ao hmtl independente
            // de seu conteúdo
            $tipo            = htmlspecialchars($row['tipo']);
            $categoria       = $row['categoria'];
            $bairro          = htmlspecialchars($row['bairro']);
            $cidade          = htmlspecialchars($row['cidade']);
            $codigo          = $row['cod'];
            $quartos         = $row['quartos'];
            $banheiros       = $row['banheiros'];
            $garagem         = $row['garagem'];
            $areaConstruida  = $row['area_construida'];
            $areaTerreno     = $row['area_terreno'];
            $fracaoIdeal     = $row['fracao_ideal'];
            $endereco        = trim($row['endereco']);
            $numero          = $row['numero'];
            $ap              = $row['ap'];
            $sala            = $row['sala'];
            $reservado       = $row['reservado'];
            $mapa            = $row['mapa'];
            $video           = $row['videos'];
            $cep             = $row['CEP'];
            $descricao       = htmlspecialchars($row['descricao']);
            $fotoDestaque    = $row['foto_destaque'];
            $lancamento      = $row['lancamento'];
            $indisponivel    = $row['indisponivel'];
            $destaque        = $row['destaque'];
            $valorACombinar  = $row['valor_a_combinar'];

            // Valor do imóvel é tratado com vírgulas e pontos
            $preco           = number_format($row['valor'], 2, ',', '.');
            $caracteristicas = $row['caracteristicas'];

            $return          = [
                // Categoria (casa, apartamento...)
                'categoria' => $categoria,
                // Cidade (Varginha/Elói Mendes)
                'cidade' => $cidade,
                // Bairro
                'bairro' => $bairro,
                // Endereço
                'endereco' => $endereco,
                // Número do imóvel
                'numero' => $numero,
                // Número do apartamento
                'ap' => $ap,
                'sala' => $sala,
                // Tipo (Aluguel/Vendas)
                'tipo' => $tipo,
                // Valor do imóvel em R$
                'preco' => $preco,
                // Código do imóvel
                'codigo' => $codigo,
                // Se o imóvel está reservado ou não
                'reservado' => $reservado,
                'caracteristicas' => $caracteristicas,
                // Descrição do imóvel
                'descricao' => $descricao,
                // Link do Mapa (googlemaps)
                'mapa' => $mapa,
                // CEP do imóvel
                'cep' => $cep,
                // Link do vídeo no yt, caso haja
                'video' => $video,
                // Quantidade de quartos
                'quartos' => $quartos,
                // Quantidade de banheiros
                'banheiros' => $banheiros,
                'garagem' => $garagem,
                // Área construída
                'areaC' => $areaConstruida,
                // Área do terreno
                'areaT' => $areaTerreno,
                'fracao_ideal' => $fracaoIdeal,
                // Nome da foto de capa
                'foto_dest' => $fotoDestaque,
                // Se o imóvel é um lançamento
                'lancamento' => $lancamento,
                // Se o imóvel está em destaque
                'destaque' => $destaque,
                // Se o imóvel está indisponivel
                'indisponivel' => $indisponivel,
                // Se o valor é negociável
                'valor_a_combinar' => $valorACombinar,
                //Pontos próximos do Imóvel
                'pontos_proximos' => $pontosProximos,
            ];
        }

        /* foreach($return as $key => $value){
        if( empty($return[$key]) || !isset($return[$key]) ){
        $return[$key] = "";
        }
        } */

        return $return;
    }

    public function verificarBairroCidade($bairroId, $cidadeId)
    {
        $pdo = parent::getDB();
        $sql = "SELECT COUNT(*) as total FROM bairros WHERE id = :bairro AND cidade = :cidade";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':bairro', $bairroId, PDO::PARAM_INT);
        $stmt->bindValue(':cidade', $cidadeId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC)['total'] > 0;
    }


    public function listaCidades()
    {
        $pdo = parent::getDB();
        $sql = "SELECT id, cidade, estado, url FROM `cidade` ORDER BY cidade ASC";
        $result = $pdo->prepare($sql);
        $result->execute();

        $dados = $result->fetchAll(PDO::FETCH_ASSOC);
        $linhas = '';

        foreach ($dados as $cidade) {
            $linhas .= "<tr>
                <td>{$cidade['cidade']}</td>
                <td>{$cidade['url']}</td>
                <td>{$cidade['estado']}</td>
                <td><a href='listar-bairros.php?cidade={$cidade['id']}'>Bairros</a></td>
                <td><a href='listar-imoveis.php?cidade={$cidade['id']}'>Imóveis</a></td>
                <td>
                    <a href='editar-cidade.php?id={$cidade['id']}' class='btn btn-warning btn-sm'>Editar</a>
                    <a href='remover-cidade.php?id={$cidade['id']}' class='btn btn-danger btn-sm' onclick='return confirm(\"Tem certeza que deseja remover esta cidade?\")'>Excluir</a>
                </td>
            </tr>";
        }

        return $linhas;
    }





    function getCidade($url)
    {
        $pdo    = parent::getDB();
        $sql    = "SELECT * FROM `cidade` WHERE url = :url";
        $result = $pdo->prepare($sql);
        $result->bindValue(':url', $url);
        $result->execute();

        $dados = $result->fetchAll();

        foreach ($dados as $row) {
            $return = [
                'id' => $row['id'],
                'cidade' => $row['cidade'],
                'estado' => $row['estado'],
                'url' => $row['url']
            ];
        }

        return $return;
    }

    public function getCidadeById($id)
    {
        $pdo = parent::getDB();
        $sql = "SELECT id, cidade, estado, url FROM `cidade` WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $cidade = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verifica se a cidade foi encontrada
        if ($cidade) {
            return [
                'id' => $cidade['id'],
                'cidade' => $cidade['cidade'],
                'estado' => $cidade['estado'],
                'url' => $cidade['url'],
            ];
        }

        return null; // Retorna null caso não encontre
    }

    function listaBairros($cidade)
    {
        $pdo = parent::getDB(); // Chama a conexão do banco de dados
        $sql = "SELECT id, bairro FROM `bairros` WHERE cidade = ? ORDER BY bairro ASC";
        $result = $pdo->prepare($sql);
        $result->bindParam(1, $cidade, PDO::PARAM_INT);
        $result->execute();
        $bairros = $result->fetchAll();

        $options = '';
        foreach ($bairros as $bairro) {
            $options .= "<option value='{$bairro['id']}'>{$bairro['bairro']}</option>";
        }
        return $options;
    }


    public function listaBairrosAsList($cidadeId)
    {
        $pdo = parent::getDB();
        $sql = "SELECT id, bairro FROM bairros WHERE cidade = :cidadeId ORDER BY bairro ASC";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':cidadeId', $cidadeId, PDO::PARAM_INT);
        $stmt->execute();

        $bairros = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $options = '<option value="">Selecione um bairro</option>';

        foreach ($bairros as $bairro) {
            $options .= "<option value='{$bairro['id']}'>{$bairro['bairro']}</option>";
        }

        return $options;
    }

    function getBairros($cidade, $asList = false)
    {
        $pdo    = parent::getDB();
        $sql    = "SELECT id, bairro FROM `bairros` WHERE cidade = :cidade ORDER BY bairro ASC";
        $result = $pdo->prepare($sql);
        $result->execute(['cidade' => $cidade]);
        $dados = $result->fetchAll();

        if ($asList) {
            $itens = '';
            foreach ($dados as $row) {
                $itens .= "<option value='{$row['id']}'>{$row['bairro']}</option>";
            }
            return $itens;
        }

        return $dados;
    }


    function getBairro($url)
    {
        $pdo    = parent::getDB();
        $query  = "SELECT b.id, b.bairro, c.cidade, b.url FROM `bairros` b 
                  INNER JOIN `cidade` c ON b.cidade = c.id 
                  WHERE b.url = :url";
        $result = $pdo->prepare($query);
        $result->bindParam(':url', $url);
        $result->execute();

        $dados = $result->fetchAll();

        foreach ($dados as $row) {
            $return = [
                'id' => $row['id'],
                'bairro' => $row['bairro'],
                'cidade' => $row['cidade'],
                'url' => $row['url']
            ];
        }

        return $return;
    }

    function listaBairrosComPaginacao($cidade, $busca = '', $ordem = 'id ASC', $itensPorPagina = 12)
    {
        $pdo = parent::getDB();

        // Inicialização de variáveis para paginação
        $paginaAtual = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1;
        $offset = ($paginaAtual - 1) * $itensPorPagina;

        // Monta o SQL principal
        $sql = "SELECT b.id, b.bairro, c.cidade 
                FROM `bairros` b
                INNER JOIN `cidade` c ON b.cidade = c.id
                WHERE 1=1"; // Usado para simplificar a adição de condições dinâmicas

        // Filtros opcionais
        if (!empty($cidade) && $cidade > 0) {
            $sql .= " AND b.cidade = :cidade";
        }
        if (!empty($busca)) {
            $sql .= " AND b.bairro LIKE :busca"; // Busca por bairros com o termo informado
        }
        $sql .= " ORDER BY $ordem LIMIT :limite OFFSET :offset";

        // Prepara e executa a consulta principal
        $stmt = $pdo->prepare($sql);

        if (!empty($cidade) && $cidade > 0) {
            $stmt->bindValue(':cidade', $cidade, PDO::PARAM_INT);
        }
        if (!empty($busca)) {
            $stmt->bindValue(':busca', "%$busca%", PDO::PARAM_STR);
        }
        $stmt->bindValue(':limite', $itensPorPagina, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);

        $stmt->execute();
        $bairros = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Conta o total de registros para a paginação
        $sqlCount = "SELECT COUNT(b.id) AS total
                     FROM `bairros` b
                     WHERE 1=1";

        if (!empty($cidade) && $cidade > 0) {
            $sqlCount .= " AND b.cidade = :cidade";
        }
        if (!empty($busca)) {
            $sqlCount .= " AND b.bairro LIKE :busca";
        }

        $stmtCount = $pdo->prepare($sqlCount);

        if (!empty($cidade) && $cidade > 0) {
            $stmtCount->bindValue(':cidade', $cidade, PDO::PARAM_INT);
        }
        if (!empty($busca)) {
            $stmtCount->bindValue(':busca', "%$busca%", PDO::PARAM_STR);
        }

        $stmtCount->execute();
        $totalRegistros = $stmtCount->fetch(PDO::FETCH_ASSOC)['total'];
        $totalPaginas = ceil($totalRegistros / $itensPorPagina);

        // Cria os itens da tabela
        $itens = '';
        foreach ($bairros as $bairro) {
            $itens .= "<tr>
                <td>{$bairro['bairro']}</td>
                <td>{$bairro['cidade']}</td>
                <td>
                    <a href='editar-bairro.php?id={$bairro['id']}' class='btn btn-sm btn-warning'>Editar</a>
                    <a href='remover-bairro.php?id={$bairro['id']}' class='btn btn-sm btn-danger' onclick='return confirm(\"Deseja realmente remover este bairro?\");'>Remover</a>
                </td>
            </tr>";
        }

        // Cria a paginação
        $paginacao = "<nav><ul class='pagination'>";
        for ($i = 1; $i <= $totalPaginas; $i++) {
            $active = $i == $paginaAtual ? 'active' : '';
            $paginacao .= "<li class='page-item $active'><a class='page-link' href='?pagina=$i'>$i</a></li>";
        }
        $paginacao .= "</ul></nav>";

        // Retorna os itens e a paginação para exibição
        return [
            'itens' => $itens,
            'paginacao' => $paginacao,
        ];
    }


    public function deleteById($table, $id)
    {
        $pdo = parent::getDB();
        $sql = "DELETE FROM `$table` WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }



    function getBairroById($id)
    {
        $pdo = parent::getDB();
        $sql = "SELECT b.id, b.bairro, b.url, c.id AS cidade_id, c.cidade 
                FROM bairros b
                INNER JOIN cidade c ON b.cidade = c.id
                WHERE b.id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function verificarUsoBairro($bairroId)
    {
        $pdo = parent::getDB();
        $sql = "SELECT COUNT(*) as total FROM imoveis WHERE bairro = :bairro";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':bairro', $bairroId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC)['total'] > 0;
    }



    public function listaCidadesParaFiltro($cidadeSelecionada = null)
    {
        $pdo = parent::getDB();
        $sql = "SELECT id, cidade FROM `cidade` ORDER BY cidade ASC";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        $cidades = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $opcoes = '<option value="0">Todas</option>';

        foreach ($cidades as $cidade) {
            $selected = ($cidade['id'] == $cidadeSelecionada) ? 'selected' : '';
            $opcoes .= "<option value='{$cidade['id']}' $selected>{$cidade['cidade']}</option>";
        }

        return $opcoes;
    }


    public function verificarUsoCidade($cidadeId)
    {
        $pdo = parent::getDB();
        $sql = "SELECT COUNT(*) as total FROM imoveis WHERE cidade = :cidade";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':cidade', $cidadeId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC)['total'] > 0;
    }


    function getCaracteristicas()
    {
        $pdo    = parent::getDB();
        $sql    = "SELECT * FROM `caracteristicas` ORDER BY url ASC";
        $result = $pdo->prepare($sql);
        $result->execute();

        $dados = $result->fetchAll();

        return $dados;
    }

    function listaCaracteristicas()
    {
        $dados = $this->getCaracteristicas();

        $itens = '';
        foreach ($dados as $row) {
            switch ($row['permite_valor']) {
                case "0":
                    $value = '';
                    break;
                case "1":
                    $value = '<input type="text" class="form-control carac-value" name="' . $row['url'] . '_val" placeholder="Quantidade">';
                    break;
                case "2":
                    $value = '<input type="text" class="form-control carac-value" name="' . $row['url'] . '_val" placeholder="Valor">';
                    break;
                default:
                    $value = '';
                    break;
            }

            $value = ($row['url'] === "garagem") ? '<input type="text" class="form-control carac-value" name="' . $row['url'] . '_val" placeholder="N. de vagas">' : $value;

            $item  = '<label class="fancy-checkbox">
            <input type="checkbox" name="' . $row['url'] . '">
            <span>' . htmlspecialchars($row['caracteristica']) . '</span>
            ' . $value . '
        </label>';
            $itens .= $item;
        }

        return $itens;
    }

    function getMaiorCodigo()
    {
        $pdo    = parent::getDB();
        $sql    = "SELECT MAX(CAST(id AS UNSIGNED)) AS maior FROM `imoveis`";
        $result = $pdo->prepare($sql);
        $result->execute();

        $dados = $result->fetchAll();

        return $dados[0]['maior'];
    }

    function getNextCodigoAvailable($codigo)
    {
        $codigo  = strval($codigo);
        $imoveis = $this->returnData('imoveis', "", "");
        foreach ($imoveis as $key => $imovel) {
            if ($codigo === $imovel['cod']) {
                return $this->getNextCodigoAvailable(intval($codigo) + 1);
            }
        }
        return $codigo;
    }

    public function getImageById($imovelID, $miniatura = 0)
    {

        $dir = "../../assets/images/properties/$imovelID/";
        // Define diretório de imagens localmente
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
            default:
                $dir .= '';
        }

        $fotos = glob($dir . "*.{jpg,jpeg,JPG,JPEG}", GLOB_BRACE);

        if (empty($fotos) && $miniatura !== 0) {
            return $this->getImageById($imovelID, 0);
        }

        $ordemFotos = $this->ordemFotos($imovelID);
        if (!empty($ordemFotos)) {
            foreach ($ordemFotos as $key => $value) {
                $ordemFotos[$key] = $dir . $value;
            }

            $union = array_unique(array_merge($ordemFotos, $fotos));

            return $union;
        }

        return $fotos;
    }


    public function getMaxId($table)
    {
        $pdo = parent::getDB(); // Obtém a conexão com o banco
        $query = "SELECT MAX(id) AS max_id FROM {$table}";
        $result = $pdo->query($query);
        return $result ? (int)$result->fetch()['max_id'] : 0;
    }

    function nomeiaFotos($imovelID)
    {
        $diretorio = "../../../assets/images/properties/$imovelID/";

        $index     = 1;
        do {
            $nome_img = "foto-$index-imovel-$imovelID.jpg";
            $index++;
        } while (file_exists($diretorio . $nome_img));

        return $nome_img;
    }
    public function verificaImagemExiste($idImovel, $arquivo)
    {
        $pdo = parent::getDB();
        $sql = "SELECT COUNT(*) FROM `arquivos` WHERE id_imovel = :id AND arquivo = :arquivo";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $idImovel, PDO::PARAM_INT);
        $stmt->bindValue(':arquivo', $arquivo, PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetchColumn() > 0;
    }

    public function getUltimaOrdem($idImovel)
    {
        $pdo = parent::getDB();
        $sql = "SELECT MAX(ordem) FROM arquivos WHERE id_imovel = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $idImovel, PDO::PARAM_INT);
        $stmt->execute();

        $resultado = $stmt->fetchColumn();
        return ($resultado !== null) ? (int)$resultado : 0;
    }

    public function ordemFotos($imovelID)
    {
        $pdo   = parent::getDB();
        $sql   = "SELECT arquivo, ordem FROM `arquivos` WHERE id_imovel = ? ORDER BY ordem";
        $query = $pdo->prepare($sql);
        $query->bindValue(1, $imovelID, \PDO::PARAM_INT);
        $query->execute();

        $fotos = [];
        foreach ($query->fetchAll() as $row) {
            $fotos[$row['ordem']] = $row['arquivo'];
        }

        // Diretório das imagens
        $dir = "../../../assets/images/properties/$imovelID/";
        $imagensLocais = glob($dir . "*.{jpg,jpeg,JPG,JPEG}", GLOB_BRACE);

        if (!empty($imagensLocais)) {
            foreach ($imagensLocais as $imagem) {
                $arquivo = basename($imagem);
                if (!in_array($arquivo, $fotos)) {
                    // Adiciona imagens não cadastradas no banco
                    $dados = [
                        'id_imovel' => $imovelID,
                        'arquivo'   => $arquivo,
                        'ordem'     => count($fotos) // Atribui nova ordem sequencial
                    ];
                    $this->insert('arquivos', $dados, true);
                    $fotos[] = $arquivo;
                }
            }
        }

        return $fotos;
    }

    public function atualizaOrdem($ordem, $imovelID)
    {
        try {
            if (!empty($ordem)) {
                $pdo = parent::getDB();
                $ordemArray = explode(",", $ordem);

                // Obtém todas as imagens do banco de dados
                $sqlSelect = "SELECT arquivo FROM `arquivos` WHERE id_imovel = ?";
                $querySelect = $pdo->prepare($sqlSelect);
                $querySelect->bindValue(1, $imovelID, \PDO::PARAM_INT);
                $querySelect->execute();
                $imagensNoBanco = $querySelect->fetchAll(\PDO::FETCH_COLUMN);

                // Remove todas as imagens do banco para recadastramento
                $sqlDelete = "DELETE FROM `arquivos` WHERE id_imovel = ?";
                $queryDelete = $pdo->prepare($sqlDelete);
                $queryDelete->bindValue(1, $imovelID, \PDO::PARAM_INT);
                $queryDelete->execute();

                // Diretório das imagens
                $dir = "../../../assets/images/properties/$imovelID/";
                $imagensLocais = glob($dir . "*.{jpg,jpeg,JPG,JPEG}", GLOB_BRACE);

                // Filtra as imagens locais para garantir que todas estejam no banco
                $todasImagens = array_unique(array_merge($ordemArray, $imagensNoBanco, array_map('basename', $imagensLocais)));

                // Recadastra todas as imagens com a nova ordem
                foreach ($todasImagens as $key => $arquivo) {
                    $sqlInsert = "INSERT INTO `arquivos` (id_imovel, arquivo, ordem) VALUES (:id_imovel, :arquivo, :ordem)";
                    $queryInsert = $pdo->prepare($sqlInsert);
                    $queryInsert->bindValue(':id_imovel', $imovelID, \PDO::PARAM_INT);
                    $queryInsert->bindValue(':arquivo', $arquivo, \PDO::PARAM_STR);
                    $queryInsert->bindValue(':ordem', $key, \PDO::PARAM_INT);
                    if (!$queryInsert->execute()) {
                        throw new \Exception("Erro ao recadastrar imagem: " . json_encode($queryInsert->errorInfo()));
                    }
                }
            }
        } catch (\Exception $e) {
            error_log("Erro ao recadastrar a ordem das fotos: " . $e->getMessage());
            throw new \Exception("Falha ao recadastrar a ordem das fotos.");
        }
    }






    function getAllStats()
    {
        $array = [
            'total' => $this->getTotal(),
            'total-ativo' => $this->getTotal(true),
            'aluguel' => $this->getAluguel(),
            'aluguel-ativo' => $this->getAluguel(true),
            'vendas' => $this->getVendas(),
            'vendas-ativo' => $this->getVendas(true),
            'varginha' => $this->getVga(),
            'varginha-ativo' => $this->getVga(true),
            'eloi-mendes' => $this->getEloi(),
            'eloi-mendes-ativo' => $this->getEloi(true)
        ];

        return $array;
    }

    function getTotal($ativo = false)
    {
        $pdo   = parent::getDB();
        $sql   = "SELECT count(id) AS total FROM `imoveis`" . ($ativo ? " WHERE ativo = 1" : "");
        $query = $pdo->prepare($sql);
        $query->execute();

        return $query->fetchColumn();
    }

    function getAluguel($ativo = false)
    {
        $pdo   = parent::getDB();
        $sql   = "SELECT count(id) AS total FROM `imoveis` WHERE tipo = 'Aluguel'" . ($ativo ? " AND ativo = 1" : "");
        $query = $pdo->prepare($sql);
        $query->execute();

        return $query->fetchColumn();
    }

    function getVendas($ativo = false)
    {
        $pdo   = parent::getDB();
        $sql   = "SELECT count(id) AS total FROM `imoveis` WHERE tipo = 'Vendas'" . ($ativo ? " AND ativo = 1" : "");
        $query = $pdo->prepare($sql);
        $query->execute();

        return $query->fetchColumn();
    }

    function getVga($ativo = false)
    {
        $pdo   = parent::getDB();
        $sql   = "SELECT count(id) AS total FROM `imoveis` WHERE cidade = 1" . ($ativo ? " AND ativo = 1" : "");
        $query = $pdo->prepare($sql);
        $query->execute();

        return $query->fetchColumn();
    }

    function getEloi($ativo = false)
    {
        $pdo   = parent::getDB();
        $sql   = "SELECT count(id) AS total FROM `imoveis` WHERE cidade = 2" . ($ativo ? " AND ativo = 1" : "");
        $query = $pdo->prepare($sql);
        $query->execute();

        return $query->fetchColumn();
    }

    public static function logChange(
        mixed $imovel_id,
        string $operation,
        string $output_file,
        ?string $usuario,
        string $to,
        ?\DateTime $data = null
    ) {
        $verb = [
            'create' => "criado",
            'update' => "atualizado",
            'delete' => "removido",
        ];

        $data = $data ?? new \DateTime();

        $msg = PHP_EOL
            . "[{$data->format('Y-m-d H:i:s')}]: {$verb[$operation]} imóvel {$imovel_id} por {$usuario}." . PHP_EOL
            . "Valores: " . PHP_EOL
            . $to . PHP_EOL;

        try {
            if (!file_exists($output_file)) {
                touch($output_file);
                chmod($output_file, 0777);
            }
            file_put_contents($output_file, $msg, FILE_APPEND | LOCK_EX);
        } catch (\Exception $e) {
            error_log("Erro ao gravar log: " . $e->getMessage());
        }
    }

    public static function contarInteracoes($imovelId)
    {
        $pdo = \Source\Conexao::getDB();
        $stmt = $pdo->prepare("
        SELECT action, COUNT(*) as total 
        FROM user_interactions 
        WHERE item_id = :item_id 
        GROUP BY action
    ");
        $stmt->execute(['item_id' => $imovelId]);

        // Define estrutura padrão com 0
        $resultados = [
            'like' => 0,
            'dislike' => 0,
            'share' => 0
        ];

        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $action = strtolower($row['action']); // Garante lowercase
            if (array_key_exists($action, $resultados)) {
                $resultados[$action] = (int) $row['total'];
            }
        }

        return $resultados;
    }


    public function gerarNovoCodigoSequencial()
{
    $pdo = parent::getDB();
    $sql = "SELECT MAX(CAST(cod AS UNSIGNED)) AS ultimo FROM imoveis";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $maior = (int) $stmt->fetchColumn();
    return strval($maior + 1);
}

}
