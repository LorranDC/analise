
<header class="header bg-white shadow-sm p-3">
        <div class="container-flex">
        <div class="row align-items-center">
            
            <!-- Logo (Left) -->
            <div class="col-3 d-flex justify-content-start">
                <a href="index.php">
                    <img src="assets/images/logo/logo-dark.svg" alt="Samar Imobiliária" class="logo">
                </a>
            </div>

            <!-- Centered Navigation -->
            <div class="col-6 d-flex justify-content-center">
                <nav class="navbar navbar-expand-lg">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav mx-auto">
                            <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="imoveisDropdown" role="button" data-bs-toggle="dropdown">
                                    Imóveis
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="imoveis.php?tipo=aluguel">Para Alugar</a></li>
                                    <li><a class="dropdown-item" href="imoveis.php?tipo=vendas">Para Comprar</a></li>
                                    <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">Buscar com Código</a></li>
                                </ul>
                            </li>
                            <li class="nav-item"><a class="nav-link" href="anuncie">Anunciar</a></li>
                            <li class="nav-item"><a class="nav-link" href="blog">Blog</a></li>
                            <li class="nav-item"><a class="nav-link" href="sobre">Empresa</a></li>
                            <li class="nav-item"><a class="nav-link" href="contato">Contato</a></li>
                        </ul>
                    </div>
                </nav>
            </div>

            <!-- WhatsApp Contacts (Right) -->
            <div class="col-3 d-flex justify-content-end">
                <div class="contact-info d-none d-lg-block">
                    <p class="mb-0">
                        <i class="fa fa-whatsapp text-success"></i> <b>(35) 99704-5026</b> ou <b>99700-8827</b> - Varginha <br>
                        <i class="fa fa-whatsapp text-success"></i> <b>(35) 99985-0105</b> - Elói Mendes
                    </p>
                </div>
            </div>

        </div>
        </div>
</header>





<!-- Modal for Search by Code -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="buscarPorCod.php" method="get">
                <div class="modal-header">
                    <h5 class="modal-title">Pesquise com o Código do Imóvel</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="codigo-imovel" class="form-label">Código:</label>
                    <input type="text" class="form-control" id="codigo-imovel" name="codigo-imovel" placeholder="0000">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="submit" name="submit" class="btn btn-primary">Buscar</button>
                </div>
            </form>
        </div>
    </div>
</div>