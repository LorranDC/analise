<?php
require '../../vendor/autoload.php';

use Source\Painel\Autenticacao;

$auth = new Autenticacao();
?>

<!doctype html>
<html lang="pt-BR">

<!-- <head> -->
<?php include 'includes/head.php' ?>
<link rel="stylesheet" href="../assets/vendor/summernote/summernote.css" />
<!-- </head> -->

<body data-theme="light" class="font-nunito right_icon_toggle">

    <div id="wrapper" class="theme-red">

        <!-- Page Loader -->
        <div class="page-loader-wrapper">
            <div class="loader">
                <div class="m-t-30"><img src="../assets/images/logo-icon.svg" width="48" height="48" alt="Iconic"></div>
                <p>Mobiliando o site...</p>
            </div>
        </div>

        <!-- Top navbar div start -->
        <?php include 'includes/top-navbar.php'; ?>

        <!-- main left menu -->
        <?php include 'includes/left-menu.php'; ?>

        <!-- rightbar icon div -->
        <?php include 'includes/right-menu.php'; ?>

        <!-- mani page content body part -->
        <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <h2>Novo Post</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#" aria-label="Post"><i class="fas fa-newspaper"></i></a></li>
                                <li class="breadcrumb-item">Blog</li>
                                <li class="breadcrumb-item active">Adicionar</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <form id="createPostForm" enctype="multipart/form-data">
                    <div class="row clearfix">
                        <!-- Todos os campos do formulário permanecem os mesmos -->
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="header">
                                    <h2>Escrever Novo Post</h2>
                                </div>
                                <div class="body">
                                    <!-- Campo do título -->
                                    <div class="form-group col-12">
                                        <label for="titulo">Título do Post</label>
                                        <input type="text" class="form-control" id="titulo" name="titulo" placeholder="ex.: 10 ideias para melhorar as condições de aluguel do seu imóvel" required />
                                    </div>
                                    <!-- Campo da URL -->
                                    <div class="form-group col-12">
                                        <label for="url">URL (Opcional)</label>&nbsp;<small class="text-muted">Deixe em branco para geração automática de URL</small>
                                        <input type="text" class="form-control" id="url" name="url" placeholder="ex.: 10-ideias-para-melhorar-as-condicoes-de-aluguel-do-seu-imovel" />
                                    </div>
                                    <!-- Campo da descrição -->
                                    <div class="form-group col-lg-9 col-md-12 col-sm-12">
                                        <label for="descricao">Descrição</label>
                                        <textarea name="descricao" id="descricao" cols="15" rows="7" class="form-control" required></textarea>
                                    </div>
                                    <!-- Campo do texto (com editor Summernote) -->
                                    <div class="m-l-15">
                                        <label for="summernote">Texto</label>
                                        <textarea class="summernote" id="summernote" name="texto"></textarea>
                                    </div>
                                    <!-- Campo das keywords -->
                                    <div class="form-group col-lg-9 col-md-12 col-sm-12 m-t-30">
                                        <label for="keywords">Keywords Google (Opcional)</label>&nbsp;<small class="text-muted">Deixar esta opção em branco pode diminuir a visibilidade do site no google!</small>
                                        <input type="text" class="form-control" id="keywords" name="keywords" placeholder="ex.: Aluguel, Economia" />
                                    </div>
                                    <!-- Campo para upload da imagem -->
                                    <div class="form-group file-upload col-lg-9 col-md-12 col-sm-12 m-t-30 m-l-15">
                                        <label for="foto">Foto</label>
                                        <input type="file" name="foto" id="foto">
                                    </div>
                                    <!-- Botão para enviar o post -->
                                    <div class="m-t-30 m-l-15">
                                        <button type="button" class="btn btn-primary" id="submitBtn">Postar</button>



                                        <a href="listar-posts.php" class="btn btn-outline-secondary">Cancelar</a>

                                        <!-- Span para a mensagem de carregamento -->
                                        <span id="loadingMessage" style="display:none; margin-left: 15px;">Por favor, aguarde. Você será avisado quando o blog for publicado com sucesso.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>

    </div>

    <!-- Javascript -->
    <script src="../assets/bundles/libscripts.bundle.js"></script>
    <script src="../assets/bundles/vendorscripts.bundle.js"></script>

    <!-- page js file -->
    <script src="../assets/bundles/mainscripts.bundle.js"></script>
    <script src="../assets/vendor/summernote/summernote.js"></script>

    <script>
        jQuery(document).ready(function() {

            $('.summernote').summernote({
                height: 300, // set editor height
                minHeight: null, // set minimum height of editor
                maxHeight: null, // set maximum height of editor
                focus: false, // set focus to editable area after initializing summernote
                popover: {
                    image: [],
                    link: [],
                    air: []
                }
            });

            $('.inline-editor').summernote({
                airMode: true
            });

        });

        window.edit = function() {
                $(".click2edit").summernote()
            },

            window.save = function() {
                $(".click2edit").summernote('destroy');
            }
    </script>
    <script>
        // Função global para submissão do formulário
        function submitForm() {
            let form = document.getElementById('createPostForm');
            if (!form) {
                console.error('Formulário não encontrado!');
                return;
            }

            let formData = new FormData(form); // FormData para enviar os dados
            let submitButton = document.getElementById('submitBtn');
            let loadingModal = document.getElementById('loadingModal');

            if (submitButton && loadingModal) {
                submitButton.disabled = true; // Desativa o botão durante o envio
                submitButton.innerText = "Enviando...";
                loadingModal.style.display = "flex"; // Exibe o modal de carregamento

                // Caminho correto para o PHP
                fetch('php/createPost.php', { // Ajuste o caminho se necessário
                        method: 'POST',
                        body: formData
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro na resposta do servidor.');
                        }
                        return response.json(); // createPost.php agora retorna JSON
                    })
                    .then(data => {
                        if (data.success) {
                            alert('Post criado com sucesso!');
                            window.location.href = data.redirect; // Redireciona
                        } else {
                            alert('Erro ao criar o post: ' + (data.message || 'Erro desconhecido.'));
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao enviar o formulário:', error);
                        alert('Erro ao enviar o formulário: ' + error.message);
                    })
                    .finally(() => {
                        submitButton.disabled = false; // Reativa o botão
                        submitButton.innerText = "Postar";
                        loadingModal.style.display = "none"; // Oculta o modal
                    });
            } else {
                console.error('Botão ou modal de carregamento não encontrado!');
            }
        }

        // Adiciona o evento ao botão após o carregamento do DOM
        document.addEventListener('DOMContentLoaded', function() {
            let submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.addEventListener('click', submitForm);
            } else {
                console.error('Botão de envio (submitBtn) não encontrado!');
            }
        });
    </script>



    <!-- Modal -->
    <div id="loadingModal" class="modal" style="display:none;">
        <div class="modal-content" style="text-align: center; padding: 20px;">
            <h4>Aguarde...</h4>
            <p>Por favor, aguarde. Você será avisado quando o blog for publicado com sucesso.</p>
        </div>
    </div>

</body>

</html>