// Fonction principale pour le minuteur
function startCountdown() {
    const countdownElement = document.getElementById('countdown');

    // Durée totale du minuteur en millisecondes (23H59 = 86340000 ms)
    const totalDuration = 23 * 60 * 60 * 1000 + 59 * 60 * 1000;

    // Récupérer l'heure de début depuis localStorage ou définir maintenant
    let startTime = localStorage.getItem('countdownStartTime');
    if (!startTime) {
        startTime = Date.now(); // Heure actuelle
        localStorage.setItem('countdownStartTime', startTime);
    } else {
        startTime = parseInt(startTime, 10);
    }

    // Calculer le temps restant
    function updateCountdown() {
        const elapsedTime = Date.now() - startTime;
        let remainingTime = totalDuration - elapsedTime;

        // Si le temps est écoulé, arrêter le minuteur
        if (remainingTime <= 0) {
            clearInterval(interval);
            countdownElement.textContent = "Temps écoulé !";
            localStorage.removeItem('countdownStartTime'); // Réinitialiser
            return;
        }

        // Convertir le temps restant en heures, minutes et secondes
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        // Mettre à jour l'affichage
        countdownElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Mettre à jour le minuteur toutes les secondes
    updateCountdown(); // Appel initial
    const interval = setInterval(updateCountdown, 1000);
}

// Démarrer le minuteur au chargement de la page
// window.onload = startCountdown;