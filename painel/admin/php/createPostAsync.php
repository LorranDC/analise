<?php
require '../../../vendor/autoload.php';

use Source\{Ferramentas, Blog};

// Inicializa os objetos necessários
$blog = new Blog();
$titulo = $_POST['titulo'] ?? '';
$url = (!empty($_POST['url'])) ? $_POST['url'] : Ferramentas::remove_caractere_unico($titulo);
$descricao = $_POST['descricao'] ?? '';
$texto = $_POST['texto'] ?? '';
$fonte = 'Samar';
$mostra_capa = 'N';
$data = date("Y-m-d H:i:s");
$ip = $_SERVER["REMOTE_ADDR"];
$exibir_noticia = 'S';
$ativo = 1;
$autor = 'Samar';

// Keywords
$form_keywords = $_POST['keywords'] ?? '';
$db_keywords = $blog->criaTags($form_keywords);

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

try {
  // Insere o post no banco de dados
  if ($blog->insert('blog', $dados, 1)) {
    // Processa a imagem, se fornecida
    if (!empty($_FILES['foto']['tmp_name'])) {
      define("BLOG_DIR", "../../../assets/images/blog/");
      move_uploaded_file($_FILES['foto']['tmp_name'], BLOG_DIR . $nome_img);
    }
    echo json_encode(['success' => true]);
  } else {
    throw new Exception('Erro ao inserir no banco de dados');
  }
} catch (Exception $e) {
  echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

exit();
