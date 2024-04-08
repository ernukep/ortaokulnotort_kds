<?php

session_start();

include_once "./api/db-connection.php";
include_once "./helpers/is_registered.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $emailData = $_POST["emailData"];
    $passwordData = $_POST["passwordData"];

    if (isset($_POST["register"])) {
        if (!IsRegistered($emailData)) {
            $query = "INSERT INTO users (email, password) VALUES (:email, :password)";
            $statement = $db->prepare($query);

            $statement->bindParam(":email", $emailData);
            $statement->bindParam(":password", $passwordData);

            try {
                $statement->execute();
                $_SESSION["loggedin"] = true;
                $_SESSION["username"] = $emailData;

                header("Location: http://localhost/odev_dosyalari/chart");
                exit;
            } catch (PDOException $e) {
                echo "<div id=\"message\" class=\"fail\">Kullanıcı eklenirken bir hata oluştu: " . $e->getMessage() . "</div>";
            }
        } else {
            echo "<div id=\"message\" class=\"fail\">Bu kullanıcı kayıtlı" . "</div>";
        }
    } else if (isset($_POST["login"])) {
        if (IsRegistered($emailData, $passwordData)) {
            $_SESSION["loggedin"] = true;
            $_SESSION["username"] = $emailData;

            header("Location: http://localhost/odev_dosyalari/chart");
            exit;
        } else {
            echo "<div id=\"message\" class=\"fail\">Geçersiz kullanıcı adı veya şifre." . "</div>";
        }
    }
}
?>




<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>İzmir Ortaokullar</title>

    <link rel="stylesheet" href="./style/clean.css" />
    <link rel="stylesheet" href="./style/style.css" />
</head>

<body>


    <div id="login-screen">
        <form action="./index.php" method="post">
            <h1>Giriş Yap</h1>
            <div class="form-item">
                <label for="email">E-Mail</label>
                <input type="email" name="emailData" id="emailData" placeholder="E-Mail" required>
            </div>
            <div class="form-item">
                <label for="password">Password</label>
                <input type="password" name="passwordData" id="passwordData" placeholder="Password" required>
            </div>
            <div class="form-item">
                <button type="submit" name="login">Giriş yap</button>
                <button type="submit" name="register">Kayıt ol</button>
            </div>
        </form>
    </div>
</body>

</html>