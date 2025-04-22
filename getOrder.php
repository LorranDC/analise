<?php
namespace Source;
require 'vendor/autoload.php';

// Make sure Ferramentas is in scope if needed:
// use Source\Ferramentas; // if Ferramentas is a class in Source

$order = $_POST['order'] ?? '';
$url   = $_POST['url']   ?? '';

// 1) Always define $vars before using it
$vars = [];

// 2) Parse the current query string if it exists
$partes = parse_url($url);
if (!empty($partes['query'])) {
    parse_str($partes['query'], $vars);
}

// 3) Overwrite or add the 'order' parameter
$vars['order'] = $order;

// 4) Build the query string
//    (Ensure Ferramentas::formataUrl($vars) returns something like "pg=2&faixa-preco=1000"...)
$parametros = Ferramentas::formataUrl($vars);

// 5) Make sure you’re linking to the correct page
//    If you have no rewrite rule for "/imoveis", use "imoveis.php" instead:
echo URL_SITE . 'imoveis.php?' . $parametros;
