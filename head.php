<!-- Document Meta -->
<?php
include_once 'trackers.php';
$page_title = $page_title ?? "Samar";
$page_description ??= "Alugue, compre ou anuncie os melhores imóveis de Varginha, Elói Mendes e região com a Imobiliária Samar";
$page_keywords ??= "aluguel de imóveis, venda de imóveis, alugar casa em varginha, apartamento em varginha";
$page_image ??= "assets/images/logo/logo-dark.svg";
?>
<base href="<?= URL_SITE ?>" />
<meta charset="utf-8">
<!-- IE Compatibility Meta -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">

<!-- Primary Meta Tags -->
<meta name="title" content="<?= $page_title ?>">
<meta name="description" content="<?= $page_description ?>">
<meta name="keywords" content="<?= $page_keywords ?>">
<meta name="author" content="GTA Multimidia">

<!-- Open Graph / Facebook -->
<meta property="og:site_name" content="Imobiliária Samar">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.novo.imobiliariasamar.com.br/">
<meta property="og:title" content="<?= $page_title ?>">
<meta property="og:description" content="<?= $page_description ?>">
<meta property="og:image" itemprop="image" content="https://www.novo.imobiliariasamar.com.br/<?= $page_image ?>">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://www.novo.imobiliariasamar.com.br/">
<meta property="twitter:title" content="<?= $page_title ?>">
<meta property="twitter:description" content="<?= $page_description ?>">
<meta property="twitter:image" content="https://www.novo.imobiliariasamar.com.br/<?= $page_image ?>">

<!-- Favicon -->
<link href="assets/images/logo/pin.svg" rel="icon">

<!-- Preconnect to Critical Resources -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdn.jsdelivr.net">

<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@400;600&display=swap" rel="stylesheet">

<!-- FontAwesome (Latest Version Only) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

<!-- Stylesheets -->
<link href="assets/css/bootstrap.min.css" rel="stylesheet">
<link href="assets/css/external.css" rel="stylesheet">
<link href="assets/css/lightslider.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet">
<link href="//cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.min.css" rel="stylesheet">
<link href="assets/css/style.css" rel="stylesheet">

<!-- JavaScript -->
<script src="https://code.jquery.com/jquery-latest.js"></script>
<script src="assets/js/lightslider.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js" async></script>
<script src="assets/js/mascara-validar.js" defer></script>
<script>
    const IS_LOGGED_IN = <?= isset($_SESSION['user']) ? 'true' : 'false' ?>;
    const BASE_URL = "<?= BASE_URL ?>"; // se ainda não estiver no JS
</script>

<!-- HTML5 Shim for IE6-8 -->
<!--[if lt IE 9]>
    <script src="assets/js/html5shiv.js"></script>
    <script src="assets/js/respond.min.js"></script>
<![endif]-->

<!-- Document Title -->
<title><?= $page_title ?></title>