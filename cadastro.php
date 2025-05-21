<?php
session_start();
include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Coletar dados do formulário
    $usuario = $_POST['usuario'];
    $senha = $_POST['senha'];
    $confirmar_senha = $_POST['confirmar_senha'];
    
    // Verificar se as senhas coincidem
    if ($senha !== $confirmar_senha) {
        $error = 'As senhas não coincidem';
    } else {
        // Verificar se o usuário já existe
        $check_sql = 'SELECT * FROM usuarios WHERE usuario = ?';
        $check_stmt = $conexao->prepare($check_sql);
        $check_stmt->bind_param("s", $usuario);
        $check_stmt->execute();
        $result = $check_stmt->get_result();
        
        if ($result->num_rows > 0) {
            $error = 'Nome de usuário já existe';
        } else {
            // Inserir novo usuário
            $insert_sql = 'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)';
            $insert_stmt = $conexao->prepare($insert_sql);
            $insert_stmt->bind_param("ss", $usuario, $senha);
            
            if ($insert_stmt->execute()) {
                $_SESSION['loggedin'] = true;
                header('Location: home.php');
                exit();
            } else {
                $error = 'Erro ao cadastrar: ' . $conexao->error;
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://pyscript.net/releases/2025.3.1/core.css">
    <script type="module" src="https://pyscript.net/releases/2025.3.1/core.js"></script>
    <!-- Add particles script -->
    <script src="js/particles.js" defer></script>
</head>
<body class="left-layout page-transition">
    <div class="left-content">
        <div class="logo1">
            <img src="logo.png" alt="">
        </div>
        <h2 class="titulologin">Cadastro</h2>
        <!-- Exibir mensagem de erro, se houver -->
        <?php
            if(isset($error)){
                echo '<div class="error-message">' . $error . '</div>';
            }
        ?>
        <div class="login">
            <form action="cadastro.php" method="post">
                <input type="text" name="usuario" placeholder='Informe o nome de usuário' required>
                <br>
                <input type="password" name="senha" placeholder='Informe a senha' required>
                <br>
                <input type="password" name="confirmar_senha" placeholder='Confirme a senha' required>
                <br>
                <input type="submit" value="Cadastrar">
            </form>
            <p class="login-link">Já tem uma conta? <a href="index.php">Entrar</a></p>
        </div>
    </div>
    <div class="right-content">
        <!-- Espaço reservado para futura imagem -->
    </div>
    <py-script src="script.py"></py-script>    
    <script type="py" src="./script.py" config="./pyscript.json"></script>
</body>
</html>
