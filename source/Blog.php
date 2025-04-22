<?php

namespace Source;
// =================== ARQUIVO COM AS PRINCIPAIS CONSULTAS AO BD RELACIONADOS AO BLOG ================ //
use Source\RealEstate;

// Classe Blog herda Models e Conexao para usar a conexão ao banco de dados e suas operações
class Blog extends RealEstate
{

    // Função para fazer o query e salvar os dados retornados
    function getPosts()
    {

        // Armazena Conexão do banco de dados em $pdo
        $pdo = parent::getDB();

        // Gera e armazena o query desejado. Valores do WHERE são passados por parâmetro
        // posteriormente para evitar SQL injections
        $query = "SELECT * FROM blog WHERE ativo = :ativo ORDER BY `data` DESC";

        // Prepara query usando PDO
        $listar = $pdo->prepare($query);

        // Executa o query com os parâmetros do WHERE
        $listar->execute(['ativo' => 1]);

        // Armazena e retorna os resultados do query como um array de arrays
        $dados = $listar->fetchAll();
        return $dados;
    }

    function getThreePosts()
{
    $cacheFolder = __DIR__ . "/cache/blogs/";
    $cacheKey = "latest_posts.json";
    $timestampCacheKey = "latest_posts_timestamp.json";

    // Ensure cache folder exists
    if (!is_dir($cacheFolder)) {
        mkdir($cacheFolder, 0777, true);
    }

    // Check for cache
    $cacheFile = $cacheFolder . $cacheKey;
    $timestampFile = $cacheFolder . $timestampCacheKey;

    // Check last database update timestamp
    $latestUpdate = $this->getLatestBlogUpdate();

    // Check cache file
    if (file_exists($cacheFile) && file_exists($timestampFile)) {
        $lastCacheUpdate = json_decode(file_get_contents($timestampFile), true);

        // If cache is up-to-date, return cached content
        if ($lastCacheUpdate == $latestUpdate) {
            return json_decode(file_get_contents($cacheFile), true);
        }
    }

    // Fetch fresh data from DB
    $pdo = parent::getDB();
    $query = "SELECT * FROM blog WHERE ativo = :ativo ORDER BY `data` DESC LIMIT 3";
    $listar = $pdo->prepare($query);
    $listar->execute(['ativo' => 1]);
    $dados = $listar->fetchAll();

    // Save new cache
    file_put_contents($cacheFile, json_encode($dados));
    file_put_contents($timestampFile, json_encode($latestUpdate));

    return $dados;
}


function getLatestBlogUpdate()
{
    $pdo = parent::getDB();
    $query = "SELECT MAX(data) AS last_update FROM blog WHERE ativo = 1";
    $stmt = $pdo->query($query);
    $result = $stmt->fetch();
    return $result['last_update'] ?? time();
}


    // Função para fazer o query e salvar os dados retornados
    function getPaginacao()
    {
        // Define limite e início, para fazer a paginação
        $limite = 6;
        $pg = (isset($_GET['pg'])) ? (int) $_GET['pg'] : 1;
        $inicio = ($pg * $limite) - $limite;
        // Define o LIMIT do query
        $sql_limit = "LIMIT $inicio, $limite";

        // Armazena Conexão do banco de dados em $pdo
        $pdo = parent::getDB();

        // Gera e armazena o query desejado. Valores do WHERE são passados por parâmetro
        // posteriormente para evitar SQL injections
        $query = "SELECT * FROM blog WHERE ativo = :ativo";

        // Prepara e executa o query, conforme padrões do PDO
        // Query feito SEM O LIMITE de itens por página...
        $listar = $pdo->prepare($query);

        // Executa o query com os parâmetros do WHERE
        $listar->execute(['ativo' => 1]);

        // ... para poder armazenar a quantidade total de linhas retornadas do query
        $totalPaginacao = $listar->rowCount();
        // Gera total de págians e manipuila em qual página está
        $qtdPag = ceil($totalPaginacao / $limite);
        $prox = ($pg + 1);
        $ant = ($pg - 1);

        $paginacao =
            [
                'qtdpag'   => $qtdPag,
                'pagina'   => $pg,
                'proxima'  => $prox,
                'anterior' => $ant
            ];

        return $paginacao;
    }

    // Função para listar os resultados de getPosts() em html com cards grandes (ver listaPostsMini())
    function listaPostsBig($dados)
    {

        // Define o caminho para as imagens, de acordo com o ambiente
        // Local == 2, Servidor == 1
        $diretorio = "assets/images/blog/";

        // Instancia $itens, que receberá todo o html posteriormente
        $itens = '';

        // Percorre todas as linhas obtidas em getPosts()
        foreach ($dados as $row) {

            // Define variáveis que serão concatenadas ao html
            $post      = $row['id'];             // ID do post
            $titulo    = $row['titulo'];         // Título da postagem
            $srcImg    = $diretorio . $row['img']; // caminho da imagem
            $url       = $row['url'];            // URL a ser atribuída à página
            $descricao = $row['descricao'];      // Spoiler do texto do post

            // Instancia objto do tipo DateTime para formatar data conforme desejado
            $date      = new \DateTime($row['data']);

            // Formata data para dia/mês/ano (Ex.: 09/11/2017, 30/03/2020)
            $data      = $date->format('d/m/Y');

            // Armazena informações da linha atual em $item
            $item = '
            <div class="col-xs-12 col-sm-6 col-md-4 mb-25">
            <div class="blog-entry">
                <div class="entry--img">
                    <a href="post?url=' . $url . '">
                        <img class="img-fluid" src="' . $srcImg . '" alt="Imagem indisponível"/>
                    </a>
                </div>
                <div class="entry--content">
                    <div class="entry--meta">
                        <a href="post?url=' . $url . '">' . $data . '</a>
                    </div>
                    <div class="entry--title">
                        <h4><a href="post?url=' . $url . '">' . $titulo . '</a></h4>
                    </div>
                    <div class="entry--bio">
                        ' . $descricao . '
                    </div>
                    <div class="entry--more">
                        <a href="post?url=' . $url . '">Leia Mais<i class="fa fa-angle-double-right"></i></a>
                    </div>
                </div>
            </div>
        </div>';

            // Armazena item atual em itens a cada iteração
            $itens .= $item;
        }
        // $blog = new Self;
        // $paginacao = $blog->getPaginacao();

        // $paginas='<div class="col-xs-12 col-sm-12 col-md-12 text-center mt-2">
        //                         <ul class="pagination">
        //                         '.$blog->estruturaPaginacao(
        //                             $paginacao['qtdpag'], 
        //                             $paginacao['pagina'], 
        //                             $paginacao['proxima'], 
        //                             $paginacao['anterior'], 
        //                             $arquivo = 'blog.php').'
        //                         </ul>
        //                     </div>';

        // Retorna todos os itens em um único string html
        return $itens;
    }

    // Função para listar os resultados de getPosts() em html com cards pequenos (ver listaPostsBig())
    function listaPostsMini($dados)
    {

        // Define o caminho para as imagens, de acordo com o ambiente
        // Local == 2, Servidor == 1
        $diretorio = "assets/images/blog/";

        // Instancia $itens, que receberá todo o html posteriormente
        $itens = '';

        // Percorre todas as linhas obtidas em getPosts()
        foreach ($dados as $row) {

            // Define variáveis que serão concatenadas ao html
            $post      = $row['id'];                    // ID do post
            $titulo    = $row['titulo'];                // Título do post
            $srcImg   = $diretorio . $row['img'];        // Caminho para a imagem
            $url       = $row['url'];                   // URL a ser atribuído à página

            // Instancia objeto DateTime para formatar data conforme desejado
            $date      = new \DateTime($row['data']);

            // Instancia ano com formato Y (https://www.php.net/manual/pt_BR/datetime.format.php)
            $ano       = $date->format('Y');

            // Cria tradução para meses
            $meses = [
                'January'   => 'Janeiro',
                'February'  => 'Fevereiro',
                'March'     => 'Março',
                'April'     => 'Abril',
                'May'       => 'Maio',
                'June'      => 'Junho',
                'July'      => 'Julho',
                'August'    => 'Agosto',
                'September' => 'Setembro',
                'October'   => 'Outubro,',
                'November'  => 'Novembro',
                'December'  => 'Dezembro'
            ];

            // Define $mes no formato F (por extenso) e traduz usando o array meses
            $mes = $meses[$date->format('F')];

            // Armazena informações da linha atual em $item
            $item = '<div class="entry">
                <a href="' . $url . '">
                    <img src="' . $srcImg . '" alt="Imagem indisponível" />
                </a>
                <div class="entry-desc">
                    <div class="entry-title">
                        <a href="post?url=' . $url . '">' . $titulo . '</a>
                    </div>
                    <div class="entry-meta">
                        <a href="#">' . $mes . ' de ' . $ano . '</a>
                    </div>
                </div>
            </div>';

            // Armazena item atual em itens a cada iteração
            $itens .= $item;
        }

        // Retorna todos os itens em um único string html
        return $itens;
    }

    function estruturaPaginacao($qtdPag, $pg, $prox, $ant, $arquivo)
    {
        $paginacao = '';
        // $tipo = strtolower($tipo);


        $url = Ferramentas::UrlAtual();
        $partes = parse_url($url);
        if (!empty($partes['query'])) {
            $vars = [];
            parse_str($partes['query'], $vars);
        }




        $url = "$arquivo?";

        if ($qtdPag != 0) {
            $paginacao .= '<div class="col-xs-12 col-sm-12 col-md-12 text-center mt-2">';
            $paginacao .= '<ul class="pagination">';
            if ($pg > 1) {
                $vars['pg'] = $ant;
                $parametros = Ferramentas::formataUrl($vars);
                $paginacao .= '<li><a href="' . URL_SITE . '' . $url . $parametros . '"><i class="fa fa-angle-left" aria-hidden="true"></i></a></li>';
            } else {
                $paginacao .= '<li><a href="#"><i class="fa fa-angle-left" aria-hidden="true"></i></a></li>';
            }

            if ($qtdPag >= 1 && $pg <= $qtdPag) {
                for ($i = 1; $i <= $qtdPag; $i++) {
                    if ($i == $pg) {
                        $paginacao .= '<li ' . (($pg == $i) ? 'class="active"' : '') . '><a href="#">' . $i . '</a></li>';
                    } else {
                        if ((($i == 3) && ($pg >= 6)) || ($i == $qtdPag - 2) && ($qtdPag - $pg > 4)) {
                            $paginacao .= "<li><a href='#'>...</a></li>";
                        }
                        if (($i == 1) || ($i == 2) || ($i == $pg - 2) || ($i == $pg - 1) || ($i == $pg + 1) || ($i == $pg + 2) || ($i == $qtdPag - 1) || ($i == $qtdPag)) {
                            $vars['pg'] = $i;
                            $parametros = Ferramentas::formataUrl($vars);
                            $paginacao .= "<li><a " . (($pg == $i) ? 'class="active"' : '') . " href='" . URL_SITE . $url . $parametros . "'>" . $i . "</a></li>";
                        }
                    }
                }
            }

            if ($pg < $qtdPag) {
                $vars['pg'] = $prox;
                $parametros = Ferramentas::formataUrl($vars);
                $paginacao .= '<li><a href="' . URL_SITE . $url . $parametros . '"><i class="fa fa-angle-right" aria-hidden="true"></i></a></li>';
            } else {
                $paginacao .= '<li><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i></a></li>';
            }
            $paginacao .= '<div class="clearfix"></div></ul></div>';
        }
        return $paginacao;
    }

    // Função para obter as informações de um post específico. Recebe como parâmetro
    // o id do post em questão
    function exibePost($post_url)
    {

        // Define o caminho para as imagens, de acordo com o ambiente
        // Local == 2, Servidor == 1
        $diretorio = "assets/images/blog/";

        // Armazena Conexão do banco de dados em $pdo
        $pdo = parent::getDB();

        // Gera e armazena o query desejado. Valores do WHERE são passados por parâmetro
        // posteriormente para evitar SQL injections
        $query = "SELECT * FROM blog WHERE url = :url AND ativo = :ativo";
        $listar = $pdo->prepare($query);
        $listar->execute(['url' => $post_url, 'ativo' => 1]);

        // Armazena valores retornados em $dados
        $dados = $listar->fetchAll();

        // Percorre cada linha retornada do query
        foreach ($dados as $row) {

            // Define variáveis que serão concatenadas ao html
            $id          = $row['id'];              // ID do post
            $titulo      = $row['titulo'];          // Título da postagem
            $srcImg      = $diretorio . $row['img'];  // Caminho da imagem
            $url         = $row['url'];             // Url a ser atribuído à página
            $descricao   = $row['descricao'];       // Spoiler do texto da postagem
            $corpoDoPost = $row['noticia'];         // Texto do post
            $keywords    = (array) json_decode($row['keywords_google']);

            // Instancia obejto Datetime para formatar a data conforme desejado
            $date = new \DateTime($row['data']);

            // Formata data no formato dia/mês/ano (Ex.: 20/02/2020, 08/03/1917)
            $data        = $date->format('d/m/Y');

            // Define array que conterá informações do post
            $info = [
                'id'        => $id,
                'imagem'    => $srcImg,
                'titulo'    => $titulo,
                'url'       => $url,
                'descricao' => $descricao,
                'corpo'     => $corpoDoPost,
                'data'      => $data,
                'keywords'  => $keywords
            ];
        }

        // Retorna informações do post
        return $info;
    }

    function getKeywordsAsString(array $keywords): string
    {
        $string = implode(", ", $keywords);

        return $string;
    }

    function getPostByUrl($url)
    {
        $id = $this->findDataBySeveral("blog", $url, "url", 1)[0]['id'];
        return $this->exibePost($id);
    }

    // Utiltário para criar tags separadas por vírgula
    public function criaTags($tags)
    {
        $explode = explode(",", $tags);
        $arrayTags = array();
        foreach ($explode as $tag) {
            if ($tag != '') {
                $tagEspaco = trim($tag);
                $arrayTags[Ferramentas::remover_caracter($tagEspaco)] = $tagEspaco;
            }
        }

        return json_encode($arrayTags);
    }
}
