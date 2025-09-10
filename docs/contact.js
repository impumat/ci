// contact.js

document.addEventListener("DOMContentLoaded", function() {
    const forms = document.querySelectorAll(".contact-form");

    forms.forEach(function(form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Empêche l'envoi standard

            clearErrors(form); // depuis form_utils.js

            let valid = true;

            // Exemple de champs : name, email, message
            const name = form.querySelector("input[name='name']");
            const email = form.querySelector("input[name='email']");
            const message = form.querySelector("textarea[name='message']");

            if (!isNotEmpty(name.value)) {
                showError(name, "Veuillez entrer votre nom");
                valid = false;
            }

            if (!isValidEmail(email.value)) {
                showError(email, "Adresse e-mail invalide");
                valid = false;
            }

            if (!isNotEmpty(message.value)) {
                showError(message, "Veuillez saisir un message");
                valid = false;
            }

            if (valid) {
                // Envoi via fetch à send.php
                const formData = new FormData(form);
                fetch("send.php", {
                    method: "POST",
                    body: formData
                })
                .then(response => response.text())
                .then(data => {
                    // redirection vers page de remerciement
                    window.location.href = form.getAttribute("data-thanks") || "thanks.html";
                })
                .catch(error => {
                    console.error("Erreur lors de l'envoi :", error);
                    window.location.href = form.getAttribute("data-error") || "error.html";
                });
            }
        });
    });
});
