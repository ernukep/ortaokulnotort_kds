<?php

include_once "./api/db-connection.php";

function IsRegistered($emailData, $passwordData = ""): bool
{
    try {

        global $db;
        $query = "SELECT * FROM users WHERE email = :email";
        if ($passwordData !== "")
            $query .= " AND password = :password";
        $statement = $db->prepare($query);
        $statement->bindParam(':email', $emailData);
        if ($passwordData !== "")
            $statement->bindParam(':password', $passwordData);
        $statement->execute();
        return $statement->rowCount() > 0;
    } catch (Exception $e) {
        echo $e->getMessage();
        return false;
    }
}
