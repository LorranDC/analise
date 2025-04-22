<?php
// ============================ CREATE POST ============================ //
// Arquivo para criar um novo post no banco de dados

// Importa Classes nescessárias
// use Source\Funcoes;
use Source\{Ferramentas, Blog, ImageFile};
use Source\Painel\Autenticacao;

require '../../../vendor/autoload.php';

// Inicializa Autenticacao para exigir que o usuário esteja logado a fim de usar
// os procedimentos de criação de post
$auth = new Autenticacao;

// Inicializa outros objetos nescessários
// $funcoes = new Funcoes;
$blog   = new Blog;
$titulo = isset($_POST['titulo']) ? $_POST['titulo'] : '';
$url    =
    ($_POST['url'] && !empty($_POST['url']))
    ? $_POST['url']
    : Ferramentas::remove_caractere_unico($titulo);
$descricao      = isset($_POST['descricao']) ? $_POST['descricao'] : '';
$texto          = isset($_POST['texto']) ? $_POST['texto'] : '';
$fonte          = 'Samar';
$mostra_capa    = 'N';
$data           = date("Y-m-d H:i:s");
$ip             = $_SERVER["REMOTE_ADDR"];
$exibir_noticia = 'S';
$ativo          = 1;
$autor          = 'Samar';
// Keywords
$form_keywords = isset($_POST['keywords']) ? $_POST['keywords'] : '';
$db_keywords   = $blog->criaTags($form_keywords);

$nome_img = $url . ".jpg";

$dados = [
    'img' => $nome_img ?? '',
    'titulo' => $titulo,
    'url' => $url,
    'descricao' => $descricao,
    'noticia' => $texto,
    'keywords_google' => $db_keywords,
    'fonte' => $fonte,
    'mostra_capa' => $mostra_capa,
    'data' => $data,
    'ip' => $ip,
    'exibir_not' => $exibir_noticia,
    'ativo' => $ativo,
    'autor' => $autor,
];

// ----- Foto -----
if ($blog->insert('blog', $dados, 1) && !empty($_FILES['foto'])) {

    define("BLOG_DIR", "../../../assets/images/blog/");

    $dirs = [
        'full_path' => BLOG_DIR,
        'minis_path' => BLOG_DIR . "miniatura/",
        'watermark_path' => "",
    ];

    $imgFile = new ImageFile($dirs);

    $miniatures = $imgFile->getMiniatures();
    array_shift($miniatures);
    $imgFile->setMiniatures($miniatures);

    $imgFile->processSingleFile($nome_img, $_FILES['foto']['tmp_name']);
}

// Redireciona para listar-posts.php
// Resposta para o fetch
header('Content-Type: application/json');
echo json_encode(['success' => true, 'redirect' => 'listar-posts.php']);
exit();

