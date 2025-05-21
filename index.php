<?php
session_start();
//dizer que quero iniciar um login
include 'conexao.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    //coletar as credenciais
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $sql = 'select * from usuarios  where email = ? and senha = ?';
    $stmt = $conexao->prepare($sql);
    $stmt->bind_param("ss", $email, $senha);
    $stmt->execute();
    // o "?" funciona como um placeholder, ou seja, ele esta esperando o usuario
    // informar o seu valor o comando bind faz o vinculo das informações para a query
    // desejada que foi preparada pelo comando prepare
    $result = $stmt->get_result();
    // coletar o reultado da query
    if($result->num_rows > 0){
        $_SESSION['loggedin'] = true;
        header('Location:home.php');
        exit();
    }else{
        $error = 'Usuário e/ou senha incorretas';
    }
    }

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://pyscript.net/releases/2025.3.1/core.css">
    <script type="module" src="https://pyscript.net/releases/2025.3.1/core.js"></script>
    <!-- Add particles script -->
    <script src="js/particles.js" defer></script>
    </head>
<body class="centered-layout page-transition">
    <div class="logo1">
        <img src="logo.png" alt="">
    </div>
    <h2 class="titulologin">Login</h2>
    <!-- se o usuario informou credenciais erradas -->
    <?php
        if(isset($error)){
            echo '<div class="error-message">' . $error . '</div>';
        }
    ?>
    <div class="login">
        <form action="index.php" method="post">
            <input type="text" name="email" placeholder='Informe o email'>
            <br>
            <input type="password" name="senha" placeholder='Informe a senha'>
            <br>
            <input type="submit" value="Logar" onclick="window.location.href='home.html';">
        </form>
        <p class="login-link">Não tem uma conta? <a href="cadastro.php">Cadastre-se</a></p>
    </div>
    <py-script src="script.py"></py-script>    
    <script type="py" src="./script.py" config="./pyscript.json"></script>
</body>
</html>
