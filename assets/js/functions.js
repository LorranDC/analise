/*global jQuery */
/* Contents
// ------------------------------------------------>
    1.  BACKGROUND INSERT
    2.  NAV MODULE
    3.	MOBILE MENU
    4.  HEADER AFFIX
    5.  OWL CAROUSEL
    6.  MAGNIFIC POPUP
    7.  MAGNIFIC POPUP VIDEO
    8.  SWITCH GRID
    9.  SCROLL TO
    10. SLIDER RANGE
    11. Dropzone UPLOAD
    12. REMOVE PROFILE PHOTO
    13. SHOW OPTIONS
    14. USER CHANGES

*/
(function ($) {
    "use strict";

    /* ------------------  Background INSERT ------------------ */

    var $bgSection = $(".bg-section");
    var $bgPattern = $(".bg-pattern");
    var $colBg = $(".col-bg");

    $bgSection.each(function () {
        var bgSrc = $(this).children("img").attr("src");
        var bgUrl = 'url(' + bgSrc + ')';
        $(this).parent().css("backgroundImage", bgUrl);
        $(this).parent().addClass("bg-section");
        $(this).remove();
    });

    $bgPattern.each(function () {
        var bgSrc = $(this).children("img").attr("src");
        var bgUrl = 'url(' + bgSrc + ')';
        $(this).parent().css("backgroundImage", bgUrl);
        $(this).parent().addClass("bg-pattern");
        $(this).remove();
    });

    $colBg.each(function () {
        var bgSrc = $(this).children("img").attr("src");
        var bgUrl = 'url(' + bgSrc + ')';
        $(this).parent().css("backgroundImage", bgUrl);
        $(this).parent().addClass("col-bg");
        $(this).remove();
    });

    /* ------------------  NAV MODULE  ------------------ */

    var $moduleIcon = $(".module-icon"),
        $moduleCancel = $(".module-cancel");
    $moduleIcon.on("click", function (e) {
        $(this).parent().siblings().removeClass('module-active'); // Remove the class .active form any sibiling.
        $(this).parent(".module").toggleClass("module-active"); //Add the class .active to parent .module for this element.
        e.stopPropagation();
    });
    // If Click on [ Search-cancel ] Link
    $moduleCancel.on("click", function (e) {
        $(".module").removeClass("module-active");
        e.stopPropagation();
    });

    $(".side-nav-icon").on("click", function () {
        if ($(this).parent().hasClass('module-active')) {
            $(".wrapper").addClass("hamburger-active");
            $(this).addClass("module-hamburger-close");
        } else {
            $(".wrapper").removeClass("hamburger-active");
            $(this).removeClass("module-hamburger-close");
        }
    });

    // If Click on [ Document ] and this click outside [ hamburger panel ]
    $(document).on("click", function (e) {
        if ($(e.target).is(".hamburger-panel,.hamburger-panel .list-links,.hamburger-panel .list-links a,.hamburger-panel .social-share,.hamburger-panel .social-share a i,.hamburger-panel .social-share a,.hamburger-panel .copywright") === false) {
            $(".wrapper").removeClass("page-transform"); // Remove the class .active form .module when click on outside the div.
            $(".module-side-nav").removeClass("module-active");
            e.stopPropagation();
        }
    });

    // If Click on [ Document ] and this click outside [ module ]
    $(document).on("click", function (e) {
        if ($(e.target).is(".module, .module-content, .search-form input,.cart-control .btn,.cart-overview a.cancel,.cart-box") === false) {
            $module.removeClass("module-active"); // Remove the class .active form .module when click on outside the div.
            e.stopPropagation();
        }
    });

    /* ------------------  MOBILE MENU ------------------ */

    var $dropToggle = $("ul.dropdown-menu [data-toggle=dropdown]"),
        $module = $(".module");
    $dropToggle.on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).parent().siblings().removeClass("open");
        $(this).parent().toggleClass("open");
    });

    $module.on("click", function () {
        $(this).toggleClass("toggle-module");
    });

    $module.find("input.form-control", ".btn", ".module-cancel").on("click", function (e) {
        e.stopPropagation();
    });

    /* ------------------ HEADER AFFIX ------------------ */

    var $navAffix = $(".header-fixed .navbar-fixed-top");
    $navAffix.affix({
        offset: {
            top: 50
        }
    });

    /* ------------------ OWL CAROUSEL ------------------ */

    $(".carousel").each(function () {
        var $Carousel = $(this);
        $Carousel.owlCarousel({
            loop: $Carousel.data('loop'),
            autoplay: $Carousel.data("autoplay"),
            margin: $Carousel.data('space'),
            nav: $Carousel.data('nav'),
            dots: $Carousel.data('dots'),
            center: $Carousel.data('center'),
            dotsSpeed: $Carousel.data('speed'),
            thumbs: $Carousel.data('thumbs'),
            thumbsPrerendered: $Carousel.data('thumbs'),
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 4
                }
            }
        });
    });


    /* ------------------ MAGNIFIC POPUP ------------------ */

    var $imgPopup = $(".img-popup");
    $imgPopup.magnificPopup({
        type: "image"
    });
    $('.img-gallery-item').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /* ------------------  MAGNIFIC POPUP VIDEO ------------------ */

    $('.popup-video,.popup-gmaps').magnificPopup({
        disableOn: 700,
        mainClass: 'mfp-fade',
        removalDelay: 0,
        preloader: false,
        fixedContentPos: false,
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: 'https://www.youtube.com/embed/%id%'
                }
            },
            srcAction: 'iframe_src',
        }
    });

    $(document).ready(function () {
        $('.popup-youtube').magnificPopup({
            type: 'iframe'
        });
    });

    /* ------------------  SWITCH GRID ------------------ */

    $('#switch-list').on("click", function (event) {
        event.preventDefault();
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $(".properties").each(function () {
            $(this).addClass('properties-list');
            $(this).removeClass('properties-grid');
        });

    });

    $('#switch-grid').on("click", function (event) {

        event.preventDefault();
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $(".properties").each(function () {
            $(this).addClass('properties-grid');
            $(this).removeClass('properties-list');
        });

    });

    /* ------------------  SCROLL TO ------------------ */

    var aScroll = $('a[data-scroll="scrollTo"]');
    aScroll.on('click', function (event) {
        var target = $($(this).attr('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 1000);
            if ($(this).hasClass("menu-item")) {
                $(this).parent().addClass("active");
                $(this).parent().siblings().removeClass("active");
            }
        }
    });

    /* ------------------ SLIDER RANGE ------------------ */
    var $min = '100',
        $max = '1000';
    if (document.getElementById("min-aluguel-js") != null && document.getElementById("max-aluguel-js") != null) {
        $min = parseInt(document.getElementById("min-aluguel-js").value);
        $max = parseInt(document.getElementById("max-aluguel-js").value);
    };

    var $sliderRange = $(".slider-range"),
        $sliderAmount = $(".amount");
    $sliderRange.each(function () {
        $(this).slider({
            range: true,
            step: 50,
            min: $min,
            max: $max,
            values: [$min, $max],
            slide: function (event, ui) {
                $(this).closest('.filter').find($sliderAmount).val("R$" + ui.values[0].toLocaleString("pt-BR") + " - R$" + ui.values[1].toLocaleString("pt-BR"));
            }
        });
        $(this).closest('.filter').find($sliderAmount).val("R$" + $sliderRange.slider("values", 0).toLocaleString("pt-BR") + " - R$" + $sliderRange.slider("values", 1).toLocaleString("pt-BR"));
        console.debug(this);
    });


    /*-------------------  Dropzone UPLOAD ---------------------*/

    if ($("#dZUpload").length > 0) {
        Dropzone.autoDiscover = false;
        $("#dZUpload").dropzone({
            url: "hn_SimpeFileUploader.ashx",
            addRemoveLinks: true,
            success: function (file, response) {
                var imgName = response;
                file.previewElement.classList.add("dz-success");
                console.log("Successfully uploaded :" + imgName);
            },
            error: function (file, response) {
                file.previewElement.classList.add("dz-error");
            }
        });
    }

    /*------------ REMOVE PROFILE PHOTO --------*/

    $('.delete--img').on("click", function () {
        $('.output--img').remove();
        event.preventDefault();
    });

    /*------------ SHOW OPTIONS --------*/

    $('.less--options').on("click", function () {
        if ($('.option-hide').hasClass("active")) {
            $('.option-hide').removeClass("active");
            $('.option-hide--conditional').removeClass("active");
            $('.less--options').html("<i class='fa fa-plus'></i> Mostrar mais opções");
        } else {
            $('.option-hide').addClass("active");
            if (!$('.slider.round').hasClass("active")) {
                $('.option-hide--conditional').addClass("active");
            }
            $('.less--options').html("<i class='fa fa-minus'></i> Mostrar menos opções");
        }

        event.preventDefault();
    });

    $('.slider.round').on("click", function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active")
            $('.option-hide--conditional').addClass("active");
        } else {
            $(this).addClass("active")
            $('.option-hide--conditional').removeClass("active");
        }

    });

    $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
    })


    /* ---------------- USER FUNCTIONS --------------- */

    // Função para gerar o slider do preço da caixa de busca
    $(document).on("click", '.alugar-js', function () {
        // Define o tipo e atualiza o hidden
        var tipo = 'aluguel';
        $("#aluga-compra").val(tipo);
        carregarCidades(tipo);
        // Atualiza as opções do select para aluguel
        var aluguelOptions = `<option value="R$0 - R$999.999.999" selected>Qualquer valor</option>
                              <option value="R$0 - R$1.000">Até R$1.000,00 /mês</option>
                              <option value="R$1.001 - R$2.000">Até R$2.000,00 /mês</option>
                              <option value="R$2.001 - R$2.999">Até R$3.000,00 /mês</option>
                              <option value="R$3.000 - R$999.999.999">Acima de R$3.000,00 /mês</option>`;
        $("#preco").html(aluguelOptions);
    });
    
    $(document).on("click", '.comprar-js', function () {
        // Define o tipo e atualiza o hidden
        var tipo = 'vendas';
        $("#aluga-compra").val(tipo);
        carregarCidades(tipo);
        // Atualiza as opções do select para vendas
        var vendasOptions = `<option value="R$0 - R$999.999.999" selected>Todos os preços</option>
                             <option value="R$0 - R$80.000">De R$0 até R$80.000</option>
                             <option value="R$80.001 - R$150.000">De R$80.001 até R$150.000</option>
                             <option value="R$150.001 - R$300.000">De R$150.001 até R$300.000</option>
                             <option value="R$300.001 - R$500.000">De R$300.001 até R$500.000</option>
                             <option value="R$500.001 - R$999.999.999">Acima de  R$500.000</option>`;
        $("#preco").html(vendasOptions);
    });
    

    

    // Função para esconder/mostrar caixa do whatsapp
    $(document).on("click", '.whatsapp-tab', function () {
        toggleZap();
    });

    $(document).on("click", '.radio-js', function () {
        $('.whatsapp-form--body').removeClass('hidden');
        $('.whatsapp-form--header').addClass('hidden');
        $('.whatsapp-form--body').addClass('active');
        $('.whatsapp-form--header').removeClass('active');
    });

    // Esconde caixa do whatsapp quando clica fora dela
    var alvo = document.getElementsByClassName("whatsapp")[0];
    $(document).on("click", function (e) {
        var fora = !alvo.contains(e.target);
        if (fora) {
            if ($('.whatsapp.active').length > 0) {
                toggleZap();
            }
        }
    });

    // Informações do reCaptcha 
    let $site_key = '6LfIh7EiAAAAAMcqISfG-bN1Wwf_Ra45YILElRsv'
    let $action = 'submit'

    // Insere informações do reCaptcha nos botões cujos formulários têm a classe protected
    $('form.protected').each(function (index) {
        let $form = $(this);
        let $my_attr = 'form' + index;
        let $callback = 'onSubmit' + index;
        $(this).find("button").each(function () {
            if ($(this).attr('type') != 'button') {
                $(this).addClass('g-recaptcha');
                $(this).attr('data-sitekey', $site_key)
                $(this).attr('data-callback', $callback)
                $(this).attr('data-action', $action)
                $form.addClass($my_attr);
            }
        });
    });


}(jQuery));


// Até 3 funções para até 3 formulários diferentes por página
function onSubmit0(token) {
    document.getElementsByClassName('form0')[0].submit();
}
function onSubmit1(token) {
    document.getElementsByClassName('form1')[0].submit();
}
function onSubmit2(token) {
    document.getElementsByClassName('form2')[0].submit();
}

function toggleZap() {
    $('.whatsapp-form--header').removeClass('hidden');
    $('.whatsapp-form--header').addClass('active');
    $('.whatsapp-form--body').addClass('hidden');
    $('.whatsapp-form--body').removeClass('active');
    if ($('.whatsapp-box').hasClass('hidden')) {
        $('.whatsapp-box').removeClass('hidden');
        $('.whatsapp-box').addClass('active');
        $('.whatsapp-tab').addClass('active');
        $('.whatsapp').addClass('active');
    } else {
        $('.whatsapp').removeClass('active');
        $('.whatsapp-tab').removeClass('active');
        $('.whatsapp-box').removeClass('active');
        $('.whatsapp-box').addClass('hidden');
    }
}