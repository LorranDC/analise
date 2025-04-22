<?php
namespace Source;

use Source\Imoveis;

require 'vendor/autoload.php';

// Set proper content type header for UTF-8 encoded HTML.
header('Content-Type: text/html; charset=UTF-8');

// Retrieve and validate the 'cidade' POST parameter.
$cidade = filter_input(INPUT_POST, 'cidade', FILTER_VALIDATE_INT) ?: 0;

// Get the bairros options.
$options = Imoveis::listaBairros($cidade);

// Debug output (uncomment when needed)
// echo "<pre>" . htmlspecialchars(print_r($options, true)) . "</pre>";

// Output the options; if empty, provide a default message.
echo !empty($options)
    ? html_entity_decode($options, ENT_QUOTES, 'UTF-8')
    : "<option value='0'>Nenhum bairro encontrado</option>";
