<?php
session_start();
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("Location: http://localhost/odev_dosyalari/middle-schools/");
    exit;
}
?>

<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>İzmir Ortaokullar</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css" />
    <link rel="stylesheet" href="./style/clean.css" />
    <link rel="stylesheet" href="./style/chart.css" />
</head>

<body>
    <div class="container">
        <nav>
            <h1 id="logo">İzmir Ortaokul Not Ortalaması</h1>
        </nav>

        <main id="page">
            <div id="dropdown">
                <ul id="dropdown-items">
                    <li id="tab-0" class="dropdown-item" onclick="onClickHandler(0)">
                        <i class="bi bi-house"></i>
                        <span>Ana Sayfa</span>
                    </li>
                </ul>
            </div>

            <section>
                <h2 id="title">Ana Sayfa</h2>
                <div id="content"></div>
            </section>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="./js/app.js"></script>
</body>

</html>