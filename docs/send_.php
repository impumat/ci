<?php
// send_.php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des champs
    $name    = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : "N/A";
    $email   = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : "N/A";
    $message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : "";
    $subject = isset($_POST['subject']) ? htmlspecialchars($_POST['subject']) : "[IMPUMAT] Message";

    // Adresse de réception
    $to = "contact@impumat.com";

    // Corps de l’email
    $body  = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message";

    // Entêtes (UTF-8 + Reply-To)
    $headers  = "From: noreply@impumat.com\r\n";
    if ($email !== "N/A") {
        $headers .= "Reply-To: $email\r\n";
    }
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Envoi
    if (mail($to, $subject, $body, $headers)) {
        // Détection langue via subject
        if (strpos($subject, "Feedback Utilisateur") !== false || strpos($subject, "Demande de Contact") !== false) {
            header("Location: merci.html"); // Français
        } else {
            header("Location: thanks.html"); // Anglais
        }
    } else {
        // Erreur selon la langue
        if (strpos($subject, "Feedback Utilisateur") !== false || strpos($subject, "Demande de Contact") !== false) {
            header("Location: erreur.html"); // Français
        } else {
            header("Location: error.html"); // Anglais
        }
    }
    exit;
}
?>
