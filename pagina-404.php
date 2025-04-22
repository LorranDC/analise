<html dir="ltr" lang="en-US" class="fa-events-icons-ready"><head>
    <!-- <head> -->
<!-- Document Meta
    ============================================= -->
    <base href="https://arquivo.imobiliariasamar.com.br/">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--IE Compatibility Meta-->
    <meta name="author" content="GTA Multimidia">
    <meta name="viewport" user-scalable="no" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="Encontre seu imóvel">
    <link href="assets/images/logo/pin.svg" rel="icon">

    <link type="text/css" rel="stylesheet" href="assets/css/lightslider.css">
    <!-- <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script> -->
    <script type="text/javascript" async="" src="https://www.gstatic.com/recaptcha/releases/wqcyhEwminqmAoT8QO_BkXCr/recaptcha__pt_br.js" crossorigin="anonymous" integrity="sha384-bJMVBB2Wuay2j5NHwWe4Uvh2KPOpreiN3RdUfk1ZrnnP5IB7TCcCZCYl2ay+Zxbz"></script><script src="//code.jquery.com/jquery-latest.js"></script>
    <script src="assets/js/lightslider.js"></script>

    <script src="https://www.google.com/recaptcha/api.js" async="" defer=""></script>
    <!-- Fonts
    ============================================= -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i%7CPoppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
    <!-- Stylesheets
    ============================================= -->
    <link href="assets/css/external.css" rel="stylesheet">
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Select2, for multiple selects: https://select2.org/getting-started/installation -->
      <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet">
      <script async="" src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

      <!-- Featherlight, para carregar popup de imagens https://noelboss.github.io/featherlight/ -->
      <link href="//cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.min.css" type="text/css" rel="stylesheet">
      
      <!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
      <!--[if lt IE 9]>
      <script src="assets/js/html5shiv.js"></script>
      <script src="assets/js/respond.min.js"></script>
      <![endif]-->
      <!-- FontAwesome para fa fa icons -->
      <script src="https://use.fontawesome.com/fdc7f85bff.js"></script><link href="https://use.fontawesome.com/fdc7f85bff.css" media="all" rel="stylesheet">

      <script async="" src="assets/js/mascara-validar.js"></script>

      <!-- FAS icons  -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">            


      <link href="assets/css/style.css" rel="stylesheet">
      <!-- Document Title
    ============================================= -->
    <title>Samar</title>
<!-- </head> --></head>

<body>
    <style>
        header a {
            pointer-events: none;
        }

        .list-404 {
            max-width: fit-content;
            padding: 2em;
            border-radius: 1.5em;
            list-style: none;
            text-align: left;
            margin: 2em auto;
        }

        .list-404 a:hover {
            color: red;
            font-weight: 700;
        }
    </style>
    <!-- Document Wrapper
	============================================= -->
    <div id="wrapper" class="wrapper clearfix">
        <!-- Header e menu de navegação -->
<header id="navbar-spy" class="header header-1 header-fixed">
    <nav id="primary-menu" class="navbar navbar-fixed-top affix-top">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Habilitar navegação</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <!-- logo (com versão para darkmode, caso necessário) -->
                <a class="logo" href="http://localhost/samar-site-2022/">
                    <img class="logo logo-light" src="assets/images/logo/logo-dark.svg" alt="Land Logo">
                    <img class="logo logo-dark" src="assets/images/logo/logo-dark.svg" alt="Land Logo">
                </a>
            </div>
            <!-- Links e toggles do navbar -->
            <div class="navbar-collapse pull-right collapse" id="navbar-collapse-1" aria-expanded="false" style="height: 1px;">
                <ul class="nav navbar-nav nav-pos-center navbar-left">
                    <li><a href="http://localhost/samar-site-2022/">home</a></li>
                    <li class="has-dropdown active">
                        <a href="imoveis" data-toggle="dropdown" class="dropdown-toggle menu-item">imóveis</a>
                        <ul class="dropdown-menu">
                            <li><a href="imoveis?tipo=aluguel">Para alugar</a></li>
                            <li><a href="imoveis?tipo=vendas">Para comprar</a></li>
                            <!-- chamando o modal do buscar com código -->
                            <li><a data-toggle="modal" data-target="#exampleModal" style="cursor: pointer;">Buscar com código</a></li>
                        </ul>
                    </li>
                    <li><a href="anuncie">anunciar</a></li>
                    <li><a href="blog">blog</a></li>
                    <li><a href="sobre">empresa</a></li>
                    <li><a href="contato">contato</a></li>
                </ul>
                <div class="module module-telefones toggle-module">
                    <a class="btn-popup" href="tel:(35) 99704-5026"><i class="fa fa-phone"></i>
                        <span class="ta-l"> (35) 99704-5026 </span>
                        <span class="ta-c">-</span>
                        <span class="float-end">Varginha</span>
                    </a>
                    <a class="btn-popup" href="tel:(35) 99985-0105"><i class="fa fa-phone"></i> (35) 99985-0105 - Elói Mendes</a>
                </div>
                <!-- login anunciar -->
            </div>
            <!-- /.navbar-collapse -->
        </div>
    <!-- /.container-fluid -->
    </nav>

    <!-- Modal para Buscar com código -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form action="buscarPorCod.php" method="get">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Pesquise com o Código do Imóvel</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Código:</label>
                            <input type="text" class="form-control" id="codigo-imovel" name="codigo-imovel" placeholder="0000">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="submit" name="submit" class="btn btn-primary btn--primary">Buscar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</header>

        <!--404
=============================================-->
        <section class="page-404 text-center bg-overlay bg-overlay-dark3 bg-section" style="background-image: url(&quot;assets/images/page-titles/5.jpg&quot;);">
            
            <div class="pos-vertical-center">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <img src="assets/images/404-icon.png" alt="icon">
                            <h3>Ops! Estamos passando por mudanças...</h3>
                            <p>Você ainda pode <a href="https://arquivo.imobiliariasamar.com.br" target="_blank">acessar nossos imóveis por aqui</a></p>
                            <p>Ou pode falar com a gente em nossas redes socias!</p>
                            <ul class="bg-white list-404">
                                <li>Instagram <a href="https://instagram.com/samar_varginha/" target="_blank">@samar_varginha</a></li>
                                <li>Instagram <a href="https://instagram.com/samar_eloi_mendes/" target="_blank">@samar_eloi_mendes</a></li>
                                <li>Whatsapp <a href="https://wa.me/5535997040526" target="_blank">Samar Varginha</a></li>
                                <li>Whatsapp <a href="https://wa.me/5535999850105" target="_blank">Samar Elói Mendes</a></li>
                            </ul>
                        </div>
                    </div>
                    <!-- .row end -->
                </div>
                <!-- .cotainer end -->
            </div>
            <!-- .cotainer end -->
        </section>
        <!-- .page-404 end -->

    </div>
    <!-- #wrapper end -->

    <!-- Footer Scripts
============================================= -->
    <script src="assets/js/jquery-2.2.4.min.js"></script>
    <script src="assets/js/plugins.js"></script>
    <script src="assets/js/functions.js"></script>



</body></html>