// form_utils.js

/**
 * Vérifie si une chaîne est un email valide
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Vérifie si un champ texte est vide
 * @param {string} value
 * @returns {boolean}
 */
function isNotEmpty(value) {
    return value.trim() !== "";
}

/**
 * Vérifie la longueur minimale d'un champ
 * @param {string} value
 * @param {number} min
 * @returns {boolean}
 */
function minLength(value, min) {
    return value.trim().length >= min;
}

/**
 * Fonction utilitaire pour afficher une erreur sur un champ
 * @param {HTMLElement} field
 * @param {string} message
 */
function showError(field, message) {
    const errorEl = field.nextElementSibling;
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = "block";
    }
}

/**
 * Réinitialise l'affichage des erreurs pour un formulaire
 * @param {HTMLFormElement} form
 */
function clearErrors(form) {
    const errors = form.querySelectorAll(".error");
    errors.forEach(el => {
        el.textContent = "";
        el.style.display = "none";
    });
}
