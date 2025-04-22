<?php session_start(); ?>
<!-- Header e menu de navegação -->
<header id="navbar-spy" class="header header-1 header-fixed">
  <nav id="primary-menu" class="navbar navbar-fixed-top">
    <div class="container-fluid header-container">
      <!-- Brand and toggle for mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Habilitar navegação</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <!-- Logo -->
        <a class="logo" href="index.php">
          <img class="logo logo-light" src="assets/images/logo/logo-dark.svg" alt="Land Logo">
          <img class="logo logo-dark" src="assets/images/logo/logo-dark.svg" alt="Land Logo">
        </a>
      </div>
      <!-- Navbar links and modules -->
      <div class="collapse navbar-collapse pull-right" id="navbar-collapse-1">
        <ul class="nav navbar-nav nav-pos-center navbar-left">
          <li><a href="index.php">home</a></li>
          <li class="has-dropdown active">
            <a href="imoveis" data-toggle="dropdown" class="dropdown-toggle menu-item">imóveis</a>
            <ul class="dropdown-menu">
              <li><a href="imoveis.php?tipo=aluguel">Para alugar</a></li>
              <li><a href="imoveis.php?tipo=vendas">Para comprar</a></li>
              <li><a data-toggle="modal" data-target="#exampleModal" style="cursor: pointer;">Buscar com código</a></li>
            </ul>
          </li>
          <li><a href="anuncie">anunciar</a></li>
          <li><a href="blog">blog</a></li>
          <li><a href="sobre">empresa</a></li>
          <li><a href="contato">contato</a></li>
        </ul>
        <!-- Nest the user/login module and the telephone numbers together -->
        <div class="header-contact-modules" style="display: flex; align-items: center;">
          <?php if (isset($_SESSION['user'])): ?>
            <div class="module module-user">
              <div class="dropdown">
                <a href="#" class="dropdown-toggle menu-item" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fa fa-user"></i><?php echo htmlspecialchars($_SESSION['user']['name']); ?><span class="caret"></span>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="user/logout.php">Sair</a></li>
                </ul>
              </div>
            </div>
          <?php else: ?>
            <div class="module module-login">
              <a href="user/login.php">Entrar</a> | <a href="user/register.php">Registrar</a>
            </div>
          <?php endif; ?>
          <!-- Telefones -->
          <div class="module module-telefones" style="margin-left: 20px; margin-top: 0;">
            <div class="phone-vga">
              <p>
                <a class="btn-popup" href="<?= $whatsAppLink; ?>">
                  <i class="fa fa-whatsapp"></i> <b>(35) 99704-5026</b>
                </a> ou
                <a class="btn-popup" href="<?= $whatsAppLink; ?>">
                  <i class="fa fa-whatsapp"></i> <b>99700-8827</b>
                </a> - Varginha
              </p>
            </div>
            <div class="phone-eloi">
              <p>
                <a class="btn-popup" href="https://wa.me/5535999850105">
                  <i class="fa fa-whatsapp"></i> <b>(35) 99985-0105</b> - Elói Mendes
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <!-- Modal for Buscar com código -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <form action="buscarPorCod.php" method="get">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Pesquise com o Código do Imóvel</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="codigo-imovel" class="col-form-label">Código:</label>
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
