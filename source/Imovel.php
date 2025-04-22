<?php

namespace Source;

// =================== ARQUIVO COM AS PRINCIPAIS CONSULTAS AO BD RELACIONADOS À PÁGINA imovel.php ============= //
use Source\Site;
use \PDO;
// Herda Conexao para poder ter acesso ao banco de dados
class Imovel extends Site
{

    // Função para chamar as imagens relacionadas ao imóvel
    static function carrossel($imovelID)
    {
        $parent_path = IMG_PATH . "/" . $imovelID;
        $helper = new Imovel;
        $images = $helper->getImageById($imovelID);

        // Cria o HTML para o carrossel de imagens
        $linhas = '<div class="container lightslider-autowidth">
        <ul id="autoWidth" class="auto-width">';

        $imageList = []; // Para armazenar as URLs em JSON
        foreach ($images as $key => $image) {
            $path = $parent_path . "/" . basename($image);
            $imageList[] = $path;
            $linhas .= '<li class="img-card">
            <a href="javascript:void(0)" onclick="triggerLightbox(' . $key . ')" title="" data-index="' . $key . '">
                <img src="' . $path . '" alt="" loading="lazy">
            </a>
        </li>';
        }
        $linhas .= '</ul></div>';

        $imagesJson = json_encode($imageList);

        // Adicionando o script no final da função
        $botao = <<<HTML
    <script>
        const images = $imagesJson;

        function triggerLightbox(index = 0) {
            SimpleLightbox.open({
                items: images,
                startAt: index
            });
        }
    </script>
    <div class="d-flex justify-content-center bg-color">
        <button class="btn btn--primary all-photos" onclick="triggerLightbox()"><i class="fa-solid fa-camera"></i>&nbsp;&nbsp;Ver fotos</button>
    </div>
HTML;

        return $linhas . $botao;
    }



    // Função para obter as imagens de um imóvel específico
    function getImageById($imovelID, $miniatura = 0)
    {
        $dir = "assets/images/properties/$imovelID/";

        // Define diretório de miniaturas de acordo com o parâmetro
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
            default:
                $dir .= '';
        }

        $fotos = glob($dir . "*.webp");

        // Verifica se há uma ordem definida no banco de dados
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

    public function EscolheImagem(int $ID)
    {
        $pdo = parent::getDB();
        $listar = $pdo->prepare("SELECT imo.foto_destaque FROM imoveis imo WHERE imo.id = :id");
        $listar->execute(['id' => $ID]);
        $dados = $listar->fetch();
        return $dados['foto_destaque'] ?? null;
    }

    static function detalhesImovel($imovelID)
    {
        $pdo = parent::getDB();
        $query = "SELECT i.*, b.bairro, c.cidade, c.estado 
                   FROM imoveis i 
                   INNER JOIN bairros b ON i.bairro = b.id 
                   INNER JOIN cidade c ON i.cidade = c.id 
                   WHERE i.cod = :cod AND i.ativo = :ativo AND i.indisponivel = :indisponivel";

        $listar = $pdo->prepare($query);
        $listar->execute(['cod' => $imovelID, 'ativo' => 1, 'indisponivel' => 0]);

        $dados = $listar->fetchAll();

        foreach ($dados as $row) {
            // Acessa e define variáveis para cada detalhe do imóvel
            $tipo = htmlspecialchars($row['tipo']);
            $categoria = $row['categoria'];
            $bairro = htmlspecialchars($row['bairro']);
            $cidade = htmlspecialchars($row['cidade']);
            $estado = htmlspecialchars($row['estado']);
            $codigo = $row['cod'];
            $cep = htmlspecialchars($row['CEP']);
            $foto_destaque = $row['foto_destaque'];

            $reservado = empty($row['reservado']) ? '' : '<span class="tarja-vermelha tarja-reta tarja-vermelha--solida">Em processo de locação</span>';
            $tempo = ($tipo == 'Vendas') ? '' : '<span class="time">/mês</span>';

            // Utilizando igualdade frouxa
            // Convertendo para string antes da comparação
            $preco = ((string)$row['valor_a_combinar'] === "1")
                ? '<div style="background-color: red; color: white; margin-bottom:10px; padding: 15px; text-align: center; font-size: 25px; left: -30px;">Valor a combinar</div>'
                : 'R$' . number_format(htmlspecialchars($row['valor']), 2, ',', '.');


            $quartos = $row['quartos'];
            $banheiros = $row['banheiros'];
            $areaConstruida = $row['area_construida'] ?? "";
            $areaTerreno = $row['area_terreno'] ?? "";
            $fracaoIdeal = $row['fracao_ideal'] ?? "";
            $garagem = match ($row['garagem']) {
                NULL, "" => "Ver descrição",
                0, "0" => "Não",
                1, "1" => "Sim"
            };
            $descricao = $row['descricao'];

            $numero = empty($row['numero']) ? '' : ", n. " . trim($row['numero']);
            $ap = empty($row['ap']) ? '' : " - ap. " . trim($row['ap']);
            $sala = empty($row['sala']) ? '' : " Sala: " . trim($row['sala']) . " - ";
            $endereco = trim($row['endereco']);
            $rua = str_replace(" ", "%20", $endereco);

            $imovel = new self;

            $atributos = $imovel->getAtributos($categoria, $quartos, $banheiros, $garagem, $areaConstruida, $areaTerreno, $fracaoIdeal);
            $caracteristicas = $imovel->getCaracteristicas($row['caracteristicas']);
            $srcMapa = !empty($row['mapa']) ? $row['mapa'] : 'https://www.google.com.br/maps?q=' . Ferramentas::remove_caractere_unico("$endereco, $numero, $cidade, $estado") . ',%20Brasil&output=embed"';
            $mapa = '<div class="col-xs-12 col-sm-12 col-md-12">
                         <div class="mapa">
                             <iframe src="' . $srcMapa . '" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                         </div>
                     </div>';

            $video = '';

            $infos = [
                'categoria' => $categoria,
                'estado' => $estado,
                'cidade' => $cidade,
                'bairro' => $bairro,
                'endereco' => $endereco,
                'numero' => $numero,
                'ap' => $ap,
                'sala' => $sala,
                'tipo' => $tipo,
                'preco' => $preco,
                'tempo' => $tempo,
                'codigo' => $codigo,
                'reservado' => $reservado,
                'atributos' => $atributos,
                'caracteristicas' => $caracteristicas,
                'descricao' => $descricao,
                'mapa' => $mapa,
                'cep' => (!empty($cep) ? $cep : "-"),
                'video' => $video,
                'foto_destaque' => $foto_destaque
            ];

            return $infos;
        }
    }

    // Recupera o ID do imóvel após receber seu código
    static function getIdByCod($codigo)
    {

        // Armazena a conexão com o BD em $pdo
        $pdo = parent::getDB();

        // Query simples para recuperar ID onde o código seja especificado
        $query = "SELECT id FROM imoveis 
        WHERE cod = :cod";

        // Executa e lista dados (espera-se que retorne um único valor)
        $listar = $pdo->prepare($query);
        $listar->execute(['cod' => $codigo]);
        $dados = $listar->fetchAll();

        // Retorna o ID. [0] diz respeito à primeira linha de $dados que é uma matriz de uma só linha
        return $dados[0]['id'];
    }

    // Função para gerar os ícones de funcionalidades do imóvel na página imovel.php
    function getAtributos($categoria, $quartos, $banheiros, $garagem, $areaConstruida = null, $areaTerreno = null, $fracaoIdeal = null)
    {
        // Atributos gerados
        $atributos = '';

        if (!empty($areaConstruida)) {
            $atributos .= '<div class="col-xs-6 col-sm-4 col-md-4">
                <div class="feature-panel">
                    <div class="feature--img">
                        <i class="fa fa-2x fa-fw fa-ruler-combined stroke-transparent"></i>
                    </div>
                    <div class="feature--content">
                        <h5>Área Construída:</h5>
                        <p>' . $areaConstruida . 'm²</p>
                    </div>
                </div>
            </div>';
        }
        if (!empty($areaTerreno)) {
            $atributos .= '<div class="col-xs-6 col-sm-4 col-md-4">
                <div class="feature-panel">
                    <div class="feature--img">
                        <i class="fa fa-2x fa-fw fa-arrows-alt stroke-transparent"></i>
                    </div>
                    <div class="feature--content">
                        <h5>Área do terreno:</h5>
                        <p>' . $areaTerreno . 'm²</p>
                    </div>
                </div>
            </div>';
        }
        if (!empty($fracaoIdeal)) {
            $atributos .= '<div class="col-xs-6 col-sm-4 col-md-4">
                <div class="feature-panel">
                    <div class="feature--img">
                        <i class="fa fa-2x fa-fw fa-chart-pie stroke-transparent"></i>
                    </div>
                    <div class="feature--content">
                        <h5>Fração Ideal:</h5>
                        <p>' . $fracaoIdeal . 'm²</p>
                    </div>
                </div>
            </div>';
        }
        if (!empty($quartos)) {
            $atributos .= '<div class="col-xs-6 col-sm-4 col-md-4">
                <div class="feature-panel">
                    <div class="feature--img">
                        <i class="fa fa-2x fa-fw fa-bed stroke-transparent"></i>
                    </div>
                    <div class="feature--content">
                        <h5>Quartos:</h5>
                        <p>' . $quartos . ' </p>
                    </div>
                </div>
            </div>';
        }
        if (!empty($banheiros)) {
            $atributos .= '<div class="col-xs-6 col-sm-4 col-md-4">
                <div class="feature-panel">
                    <div class="feature--img">
                        <i class="fa fa-2x fa-fw fa-bath stroke-transparent"></i>
                    </div>
                    <div class="feature--content">
                        <h5>Banheiros:</h5>
                        <p>' . $banheiros . ' </p>
                    </div>
                </div>
            </div>';
        }
        if (!empty($garagem)) {
            $atributos .= '<div class="col-xs-6 col-sm-4 col-md-4">
                <div class="feature-panel">
                    <div class="feature--img">
                        <i class="fa fa-2x fa-fw fa-car stroke-transparent"></i>
                    </div>
                    <div class="feature--content">
                        <h5>Garagem:</h5>
                        <p>' . $garagem . '</p>
                    </div>
                </div>
            </div>';
        }

        return $atributos;
    }


    // Função para gerar as caracteristicas com base no json
    function getCaracteristicas($json)
    {

        // Decodifica o json em um array. Este json possui as informações de quais
        // caracteristicas existem no imovel em questão.
        $caracteristicas = json_decode($json, true);

        // Instancia $itens de forma vazia. Caso o array de caracteristicas esteja
        // vazio, retorna intens de forma vazia, para que a seção não seja exibida
        $itens = '';
        if (empty($caracteristicas)) {
            return $itens;
        }

        // Armazena a conexão do BD em PDO. Esta conexão será usada para
        // consultar as caracteristicas existentes no BD
        $pdo = parent::getDB();

        // Armazena o query
        $query = "SELECT * FROM caracteristicas";

        // Prepara e executa o query com PDO
        $listar = $pdo->prepare($query);
        $listar->execute();

        // Armazena os resultados em $dados
        $dados = $listar->fetchAll();

        // Instancia array que possuirá todas as características disponíveis no BD
        $array = [];

        // Atribui caracteristicas e seus IDs para o array
        foreach ($dados as $row) {
            $array[$row['id']] = $row['caracteristica'];
        }

        // Gera html da seção
        $itens = '<div class="widget widget-links">
        <div class="widget--title">
            <h5>Características</h5>
        </div>
        <div class="widget--content">';

        // Gera um item para cada caracteristica do imovel
        foreach ($caracteristicas as $key => $caracteristica) {

            $valor = ($caracteristica != 1) ? $caracteristica : '';

            if ($key == 6 && !empty($valor)) {
                $valor = "(+/- R$$valor,00)";
            }

            $item  = '<div><span><i class="fa fa-check"></i> ' . $array[$key] . '</span> ' . $valor . '</div>';
            $itens .= $item;
        }

        // Fecha itens
        $itens .= '</div>
        </div>';

        // Retorna html dos itens gerados
        return $itens;
    }

    function updateViews($imovelID)
    {
        $pdo    = parent::getDB();
        $listar = $pdo->prepare("SELECT * FROM visualizacoes WHERE imovel_id = :id");
        $listar->bindParam(':id', $imovelID);
        $listar->execute();

        $dados = $listar->fetchAll();

        if (!empty($dados)) {
            foreach ($dados as $row) {
                $visualizacoes = $row['visualizacoes'];
            }

            $visualizacoes++;
            $update = $pdo->prepare("UPDATE visualizacoes SET visualizacoes = :visualizacoes WHERE imovel_id = :id");
            $update->bindParam(':visualizacoes', $visualizacoes);
            $update->bindParam(':id', $imovelID);
            $update->execute();
        } else {
            $visualizacoes = 1;
            $add           = $pdo->prepare("INSERT INTO visualizacoes (imovel_id, visualizacoes) VALUES (:id, :visualizacoes)");
            $add->bindParam(':id', $imovelID);
            $add->bindParam(':visualizacoes', $visualizacoes);
            $add->execute();
        }
    }
}
