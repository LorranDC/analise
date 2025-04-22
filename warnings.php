<?php

// $mywarning = <<<HTML
//         <script>$(document).ready(function(){
//             $("#modal-aviso-sabado").modal("toggle");
//         });</script>
//         <div class="modal fade" id="modal-aviso-sabado" tabindex="-1" role="dialog" aria-labelledby="avisoSabado" aria-hidden="true">
//             <div class="modal-dialog" role="document">
//                 <div class="modal-content p-30">
//                 <img class="img-100" loading="lazy" src="assets/images/slider/slide-bg/9.jpeg" alt="">
//                 </div>
//             </div>
//         </div>
//         <style> .img-100 {max-width: 100%;} </style>
//         HTML;

$mywarning = '';

// Inicia a sessão


// Verifica se a variável de sessão aviso já existe
if (!isset($_SESSION['aviso'])) {
  // Se não existe, mostra o aviso e define a variável como true
  echo $mywarning;
  $_SESSION['aviso'] = true;
}
?>

