<?php
define("SMTP_MAIL", [
    "acesso" => 2, // 1 = Servidor; 2 = Local
    "host" => "mail.hospitaldiaendomed.com.br",
    "port" => "465",
    "SMTPSecure" => "ssl", 
    "user" => "contato@hospitaldiaendomed.com.br",
    "password" => "pedometer-showcase-gorgeous-venue-magnify",
    "from_name" => "Samar",
    "from_email" => "contato@imobiliariasamar.com.br"
]);

if (SMTP_MAIL['acesso'] == 1) {
    define('URL_SITE', 'https://www.novo.imobiliariasamar.com.br/');
    define('ROOT_DIR', "/home1/samar/");
} elseif (SMTP_MAIL['acesso'] == 2) {
    define('URL_SITE', 'http://localhost/samar-2/');
    define('ROOT_DIR', 'C:/xampp/htdocs/samar-2/');
}

define('IMG_DIR', ROOT_DIR . 'assets/images/properties');
define('IMG_PATH', URL_SITE . 'assets/images/properties');

include_once ROOT_DIR . 'config/config.php';
?>

<?php
// // Corrigido: Usando variável ao invés de `define()`
// $smtpMail = [
//     "acesso" => 1, // 1 = Servidor; 2 = Local
//     "host" => "mail.hospitaldiaendomed.com.br",
//     "port" => "465",
//     "SMTPSecure" => "ssl", 
//     "user" => "contato@hospitaldiaendomed.com.br",
//     "password" => "pedometer-showcase-gorgeous-venue-magnify",
//     "from_name" => "Samar",
//     "from_email" => "contato@imobiliariasamar.com.br"
// ];

// // Definição das constantes corretamente
// if ($smtpMail['acesso'] == 1) {
//     define('URL_SITE', 'https://www.imobiliariasamar.com.br/');
//     define('ROOT_DIR', "/home2/imob7442/");
// } elseif ($smtpMail['acesso'] == 2) {
//     define('URL_SITE', 'http://localhost/samar-2/');
//     define('ROOT_DIR', 'C:/xampp/htdocs/samar-2/');
// }

// // Definição correta dos caminhos de imagem
// define('IMG_DIR', ROOT_DIR . 'assets/images/properties');
// define('IMG_PATH', URL_SITE . 'assets/images/properties');

// // Verificação antes de incluir arquivo de configuração
// $configPath = 'config/config.php';
// if (file_exists($configPath)) {
//     include_once $configPath;
// } else {
//     error_log("Erro: Arquivo de configuração não encontrado em $configPath");
// }
?>
