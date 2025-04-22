<?php

namespace Source;

require 'vendor/autoload.php';

session_start();

?>
<!DOCTYPE html>
<html dir="ltr" lang="pt-BR">

<head>
    <?php
    $page_title = "Contato - Imobiliária Samar";
    include 'head.php';
    ?>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>

</head>

<body>
    <!-- Document Wrapper
	============================================= -->
    <div id="wrapper" class="wrapper clearfix">
        <?php
        include 'header.php';
        ?>

        <section id="fale-conosco" class="contact contact-2 bg-white pt-150">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <div class="heading heading-2 mb-50">
                            <h2 class="heading--title">Fale Conosco</h2>
                        </div>
                    </div>
                    <!-- .col-md-12 end -->
                </div>
                <!-- .row end -->
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                        <?php $url = Ferramentas::UrlAtual() ?>
                        <form class="mb-0 protected" method="post" action="enviarEmail.php" id="formulario-contato">
                            <input type="hidden" name="url" value="<?= $url ?>">
                            <input type="hidden" name="tipo-de-formulario" value="Contato via página">
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-4">
                                    <div class="form-group">
                                        <label for="contact-name">Nome*</label>
                                        <input type="text" class="form-control" name="contact-name" id="contact-name" autofocus required>
                                    </div>
                                </div>
                                <!-- .col-md-4 end -->
                                <div class="col-xs-12 col-sm-12 col-md-4">
                                    <div class="form-group">
                                        <label for="contact-email">Email*</label>
                                        <span class="hint">exemplo@email.com</span>
                                        <input type="email" class="form-control" name="contact-email" id="contact-email" required>
                                    </div>
                                </div>
                                <!-- .col-md-4 end -->
                                <div class="col-xs-12 col-sm-12 col-md-4">
                                    <div class="form-group">
                                        <label for="contact-phone">Telefone</label>
                                        <span class="hint">(99) 99999-9999 ou (99) 9999-9999</span>
                                        <input type="text" class="form-control" name="contact-phone" id="contact-phone" onkeyup="mascara(this, mtelcel)" onchange="mascara(this, mtelcel)">
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-12">
                                    <label class="form-group" for="contact-type">Sobre o quê você quer falar?</label>
                                    <div class="d-flex flex-row">
                                        <div class="form-group">
                                            <input class="input-radio" type="radio" name="contact-type" value="aluguel" checked id="contact-type-aluguel">
                                            <label class="label-radio" for="contact-type-aluguel">Aluguel</label>
                                        </div>
                                        <div class="form-group">
                                            <input class="input-radio" type="radio" name="contact-type" value="vendas" id="contact-type-vendas">
                                            <label class="label-radio" for="contact-type-vendas">Vendas</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- .col-md-4 end -->
                                <div class="col-xs-12 col-sm-12 col-md-12">
                                    <div class="form-group">
                                        <label for="contato-message">Messagem*</label>
                                        <textarea class="form-control" name="contact-message" id="contato-message" rows="2" required></textarea>
                                    </div>
                                </div>
                                <!-- .col-md-12 end -->
                                <div class="col-xs-12 col-sm-12 col-md-12">
                                    <input type="checkbox" name="privacidade" id="privacidade" required><span> Ao clicar em enviar os dados, você concorda com a <b>POLÍTICA DE PRIVACIDADE</b></span>
                                    <button type="submit" class="btn btn--primary mt-10">Enviar</button>
                                </div>
                                <!-- .col-md-12 -->
                            </div>
                        </form>
                    </div>
                    <!-- .col-md-12 end -->
                </div>
                <!-- .row end -->
                <div class="termRecaptcha mt-10">
                    Este site é protegido por reCAPTCHA e a
                    <a href="https://policies.google.com/privacy" target="_BLANK">Política de privacidade</a> e os
                    <a href="https://policies.google.com/terms" target="_BLANK">Termos de uso</a> do Google são aplicados.
                </div>
            </div>
        </section>

        <section id="contact-varginha" class="contact contact-1">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-3">
                        <div class="heading heading-2 mb-55">
                            <h2 class="heading--title">Varginha</h2>
                        </div>
                        <div class="contact-panel">
                            <h3>Endereço</h3>
                            <p>Avenida Rio Branco, 371 – Centro. Varginha/MG</p>
                        </div>
                        <!-- .contact-panel -->
                        <div class="contact-panel">
                            <h3>Telefones:</h3>
                            <p><a href="tel:(35) 3219-2600"> (35) 3219-2600</p></a>
                            <p><a href="tel:(35) 99704-5026"> (35) 99704-5026</p></a>
                        </div>
                        <!-- .contact-panel -->
                        <div class="contact-panel">
                            <h3>Email:</h3>
                            <a href="mailto:contact@land.com">contato@imobiliariasamar.com.br</a>
                            <a href="mailto:contact@land.com"> vendas@imobiliariasamar.com.br</a>
                        </div>
                        <!-- .contact-panel -->
                    </div>
                    <!-- .col-md-3 end -->

                    <div class="col-xs-12 col-sm-12 col-md-8 col-md-offset-1 bg-white p-30 local--rounded shadow">
                        <div class="mapa">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.730664316341!2d-45.44026098491288!3d-21.557384296531886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ca928e6844d749%3A0xa09ed9ad1bf0f7df!2sCondom%C3%ADnio%20Julia%20Noemi%20-%20Av.%20Rio%20Branco%2C%20371%20-%20Centro%2C%20Varginha%20-%20MG%2C%2037002-013!5e0!3m2!1spt-BR!2sbr!4v1666277767763!5m2!1spt-BR!2sbr" height="370" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
                <!-- .col-md-8 end -->
            </div>
            <!-- .row end -->
    </div>
    </section>

    <section id="contact-eloi" class="contact contact-1">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-3">
                    <div class="heading heading-2 mb-55">
                        <h2 class="heading--title">Elói Mendes</h2>
                    </div>
                    <div class="contact-panel">
                        <h3>Endereço</h3>
                        <p>Rua Antônio Flauzino Pereira, 441 - Centro. Elói Mendes/MG</p>
                    </div>
                    <!-- .contact-panel -->
                    <div class="contact-panel">
                        <h3>Telefones:</h3>
                        <p><a href="tel:(35) 3264-1081"></i> (35) 3264-1081</a></p>
                        <p><a href="tel:(35) 99985-0105"></i> (35) 99985-0105</a></p>
                    </div>
                    <!-- .contact-panel -->
                    <div class="contact-panel">
                        <h3>Email:</h3>
                        <a href="mailto:contact@land.com"></i>contato@imobiliariasamar.com.br</a>
                        <a href="mailto:contact@land.com"></i> vendas@imobiliariasamar.com.br</a>
                    </div>
                    <!-- .contact-panel -->
                </div>
                <div class="col-xs-12 col-sm-12 col-md-8 col-md-offset-1 bg-white p-30 local--rounded shadow">
                    <div class="mapa">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3709.41441441338!2d-45.571645584911785!3d-21.608769398274205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ca8ae42876cad1%3A0x5a230ab56abd716a!2sR.%20Ant%C3%B4nio%20Flauzino%20Pereira%2C%20441%20-%20A%20Definir%2C%20El%C3%B3i%20Mendes%20-%20MG%2C%2037110-000!5e0!3m2!1spt-BR!2sbr!4v1666277875844!5m2!1spt-BR!2sbr" height="370" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
    </section>


    <?php include 'footer.php'; ?>
    <?php include 'fixed.php'; ?>


    </div>
    <!-- #wrapper end -->

    <script src="assets/js/plugins.js"></script>
    <script src="assets/js/functions.js"></script>

</body>

</html>