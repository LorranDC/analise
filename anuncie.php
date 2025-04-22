<?php
    namespace Source;
    require 'vendor/autoload.php';

    session_start();
?>
<!DOCTYPE html>
<html dir="ltr" lang="en-US">

<head>
    <?php include 'head.php'; ?>
</head>

<body>

    <div id="wrapper" class="wrapper clearfix">
    <?php
    $page_title = "Samar - Anuncie";
    include 'header.php';
    ?>

        <section id="add-property" class="add-property">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 p-30 bg-white local--rounded">
                        <div class="p-30" style="text-align: justify;">
                            <div class="col-xs-12 col-sm-12 col-md-12">
                                <h5>Anuncie seu <span>imóvel</span></h5>
                                <p>Nosso trabalho de consultoria imobiliária, pode lhe ajudar a determinar o preço de mercado da sua propriedade de maneira que você obtenha o preço justo que tanto deseja.</p>
                                <p>Nosso objetivo, é vender ou alugar o seu imóvel, o mais rápido possível, pelo melhor preço que puder ser alcançado, e sem o menor esforço, stress e envolvimento de sua parte.</p>
                                <p>Se você tem um imóvel que deseja vender ou alugar, entre em contato conosco, que faremos uma avaliação. Nossos corretores são totalmente capacitados, aptos e dispostos a divulgar seus imóveis de maneira fácil, ágil e segura.</p>
                            </div>
                            
                            <div class="col-xs-12 col-sm-6 col-md-6">
                                <h6>Documentação necessária</h6>
                                <ul>
                                    <li>Xerox do CPF e RG (do casal);</li>
                                    <li>Xerox da escritura;</li>
                                    <li>01 conta de água e 01 de luz (do imóvel a ser alugado);</li>
                                    <li>Cópia da 1ª e 2ª página do IPTU;</li>
                                    <li>Convenção de condomínio.</li>
                                </ul>
                            </div>
                            <div class="col-sx-12 col-sm-6 col-md-5 col-md-offset-1">
                                <h6>Entre em contato conosco</h6>
                                <a href="mailto:contato@imobiliariasamar.com.br" style="color: #aaa"><i class="fa fa-fw fa-envelope"></i><span>contato@imobiliariasamar.com.br</span></a><br>
                                <a href="mailto:vendas@imobiliariasamar.com.br" style="color: #aaa"><i class="fa fa-fw fa-envelope"></i><span>vendas@imobiliariasamar.com.br</span></a>

                                <a href="https://wa.me/5535998632705?text=Olá! Tenho interesse em anunciar um imóvel." target="_blank" class="btn btn--primary mt-30 pr-2">Entre em contato</a>
                            </div>
                        </div>
                    </div>
                    <!-- .col-md-12 end -->
                </div>
                <!-- .row end -->
            </div>
        </section>

        <?php include 'footer.php'; ?>
        <?php include 'fixed.php'; ?>

    </div>
    
    <script src="assets/js/plugins.js"></script>
    <script src="assets/js/functions.js"></script>

</body>

</html>
