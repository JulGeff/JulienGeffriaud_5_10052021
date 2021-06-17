// Récupération de la commande dans le local Storage
let order = JSON.parse(localStorage.getItem('order'));


// Affichage des infos de commandes dans le main du html
let orderConfirmation = document.getElementById("order");

function displayOrder () {
    orderConfirmation.innerHTML +=                 
    `<h1>${order.firstName}, merci pour votre commande !</h1>

    <h2>Numéro de commande : <br>${order.orderRef}</h2>
    <h2>Prix total : <br>${order.totalCost.toFixed(2)} euros</h2>
    <h2>A bientôt chez Orinoco !</h2>
    <a href="../index.html">Revenir à l'accueil</a>`
}

displayOrder ();


// On vide le local Storage quand on quitte la page
function emptyOrder () {
window.onbeforeunload = function(){
    localStorage.clear () 
}
}

emptyOrder ();