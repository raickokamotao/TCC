<?php
session_start();
// Verificar se o usuário está logado
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>IA Análise - Dashboard</title>
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="https://pyscript.net/releases/2025.3.1/core.css">
  <script type="module" src="https://pyscript.net/releases/2025.3.1/core.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="js/js.js" defer></script>
  <!-- Add particles script -->
  <script src="js/particles.js" defer></script>
</head>
<body>
  <div class="container">
    <aside class="sidebar">
      <h3>Histórico de análises</h3>
      <div class="history-list">
        <?php
        // Aqui você pode adicionar código para buscar histórico do banco de dados
        // Por enquanto, vamos mostrar alguns exemplos estáticos
        $historicos = [
          ['id' => 1, 'nome' => 'Análise de CV - 12/05/2025', 'status' => 'concluído'],
          ['id' => 2, 'nome' => 'Perfil de candidato - 10/05/2025', 'status' => 'concluído'],
          ['id' => 3, 'nome' => 'Avaliação de competências - 05/05/2025', 'status' => 'concluído']
        ];
        
        foreach ($historicos as $historico) {
          echo '<div class="history-item">';
          echo '<span class="history-name">' . $historico['nome'] . '</span>';
          echo '<span class="history-status ' . $historico['status'] . '">' . $historico['status'] . '</span>';
          echo '</div>';
        }
        ?>
      </div>
      <button class="nova-analise"><span>+</span> Iniciar nova análise</button>
    </aside>

    <main class="principal">
      <header class="topo">
        <div class="logo-container">
          <img src="logo.png" alt="Logo">
          <h1>IA Análise</h1>
        </div>
        <div class="user-controls">
          <div class="perfil-btn">
            <?php 
            if(isset($_SESSION['nome'])) {
              echo '<span class="user-initial">' . substr($_SESSION['nome'], 0, 1) . '</span>';
            } else {
              echo '<span class="user-initial">U</span>';
            }
            ?>
            <div class="profile-dropdown">
              <a href="logout.php">Sair</a>
            </div>
          </div>
        </div>
      </header>

      <section class="conteudo">
        <div class="welcome-message">
          <h2>Bem-vindo ao seu assistente de análise</h2>
          <p>Faça upload de um arquivo para começar a análise ou continue um trabalho anterior.</p>
        </div>
        <div class="btn-central">
          <button id="botao" class="add-btn">+</button>
          <p>Escolha o arquivo para análise</p>
          <div class="file-types">Suporta .pdf, .docx, .txt</div>
        </div>
        <div id="arquivo-info" class="arquivo-info hidden">
          <div class="arquivo-preview">
            <div class="preview-icon">📄</div>
            <div class="preview-details">
              <h4 id="arquivo-nome">Nome do arquivo</h4>
              <p id="arquivo-tamanho">Tamanho: 0 KB</p>
            </div>
          </div>
          <button id="remover-arquivo" class="remover-btn">Remover</button>
        </div>
        <div id="resultado-analise" class="resultado-analise hidden">
          <!-- Aqui será exibido o resultado da análise via JavaScript -->
        </div>
      </section>

      <footer class="footer">
      <textarea id="requisitos" placeholder="Descreva os requisitos para análise..." oninput="autoResize(this)"></textarea>
        <button class="enviar" id="enviar-analise">
          ➜
        </button>
      </footer>
    </main>
  </div>
  
  <!-- Animação de carregamento -->
  <div id="loading" class="loading-overlay hidden">
    <div class="loading-spinner"></div>
    <p>Processando análise...</p>
  </div>

  <py-script src="script.py"></py-script>
  <script type="py" src="./script.py" config="./pyscript.json"></script>
  <script src="js/animacoes.js" defer></script>
</body>
</html>
