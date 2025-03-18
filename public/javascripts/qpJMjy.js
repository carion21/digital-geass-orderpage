$(document).ready(function () {
    const telInput = $("#phone");

    // Initialisation de l'IntlTelInput
    const iti = telInput.intlTelInput({
        initialCountry: "auto", // Détection automatique du pays via IP
        preferredCountries: ["ci", "sn", "cm", "ml", "bf", "tg", "gn", "bj", "cd"], // Pays préférés
        autoPlaceholder: "aggressive", // Placeholders agressifs pour le format téléphonique
        separateDialCode: true, // Affiche l'indicatif séparément
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/utils.min.js", // Script utilitaire requis
        geoIpLookup: function (callback) {
            fetch('https://ipinfo.io/json', { cache: 'reload' })
                .then(response => response.json())
                .then(data => callback(data.country)) // Récupération du pays basé sur l'IP
                .catch(() => callback("us")); // Fallback sur les États-Unis en cas d'erreur
        }
    });

    // au submit du formulaire
    $("#submit").on("click", function (e) {
        const phoneNumber = telInput.val();
        console.log('phoneNumber', phoneNumber);

        const dialCodeElt = $(".selected-dial-code");
        const dialCode = dialCodeElt.text();
        console.log('dialCode', dialCode);

        $('#dialcode').val(dialCode);
    });


});