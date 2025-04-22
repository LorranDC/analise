<?php
require '../../../vendor/autoload.php';

use Source\{Ferramentas, Blog, ImageFile};
use Source\Painel\Autenticacao;

$auth = new Autenticacao;
$blog = new Blog;

// Verifica se ID foi informado no formulário
if (!isset($_POST['id'])) {
    header("Location: ../listar-posts.php?status=error&message=Falha ao obter post");
    exit();
}

$id = $_POST['id'];
$titulo = $_POST['titulo'] ?? '';
$url = (!empty($_POST['url'])) ? $_POST['url'] : Ferramentas::remove_caractere_unico($titulo);
$descricao = $_POST['descricao'] ?? '';
$texto = $_POST['texto'] ?? '';
$form_keywords = $_POST['keywords'] ?? '';
$db_keywords = $blog->criaTags($form_keywords);

$nome_img = $url . ".jpg";

// Salva a imagem, se houver
if (!empty($_FILES['foto']['name'])) {
    define("BLOG_DIR", "../../../assets/images/blog/");
    if (!is_dir(BLOG_DIR)) mkdir(BLOG_DIR, 0777, true);

    $filePath = BLOG_DIR . $nome_img;
    if (!move_uploaded_file($_FILES['foto']['tmp_name'], $filePath)) {
        header("Location: ../listar-posts.php?status=error&message=Erro ao salvar imagem");
        exit();
    }
}

$dados = [
    'img' => $nome_img,
    'titulo' => $titulo,
    'url' => $url,
    'descricao' => $descricao,
    'noticia' => $texto,
    'keywords_google' => $db_keywords,
];

if ($blog->saveById('blog', $dados, $id)) {
    header("Location: ../listar-posts.php?status=success&message=Post atualizado com sucesso");
} else {
    header("Location: ../listar-posts.php?status=error&message=Erro ao atualizar o post");
}
exit();
?>
