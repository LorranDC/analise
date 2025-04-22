<?php
require '../../../vendor/autoload.php';

use Source\ImageFile;

if (!empty($_FILES['images']) && isset($_POST['imovelId'])) {
    $images = $_FILES['images'];
    $imovelId = $_POST['imovelId'];

    $diretorio = "../../../assets/images/properties/$imovelId/";
    $imgFile = new ImageFile([
        $diretorio,
        $diretorio . "miniaturas/273x182/",
        $diretorio . "miniaturas/150x150/",
        $diretorio . "miniaturas/50x50/",
        "../../../assets/images/properties/marca-agua-samar.png"
    ]);

    $imgFile->processAllFiles($images, $imovelId);

    echo "Processamento concluído!";
} else {
    echo "Nenhuma imagem foi enviada para processamento.";
}
