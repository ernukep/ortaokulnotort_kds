<?php
include_once("./db-connection.php");

function GetData($query)
{
    try {
        global $db;
        $fetchData = $db->prepare($query);
        $fetchData->execute();
        $result = $fetchData->fetchAll(PDO::FETCH_ASSOC);
        $jsonData = json_encode($result, JSON_UNESCAPED_UNICODE, JSON_PRETTY_PRINT);
        return $jsonData;
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
