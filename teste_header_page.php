<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/teste_header.css?v=<?php echo time(); ?>">

    <title>Teste de Header</title>
</head>
<body>

<?php
session_start(); // Ensure session is started for WhatsApp link rotation

define('WHATSAPP_LINKS', [
    "https://wa.me/5535997045026",
    "https://wa.me/5535997008827"
]);

if (!isset($_SESSION['link_index'])) {
    $_SESSION['link_index'] = 0;
}
$whatsAppLink = WHATSAPP_LINKS[$_SESSION['link_index']];
$_SESSION['link_index'] = ($_SESSION['link_index'] + 1) % count(WHATSAPP_LINKS);
?>

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WSNH8XW" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

    <?php include 'teste_header.php'; ?>

<!-- Bootstrap Scripts -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>