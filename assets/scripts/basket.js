// Récupération de toutes les données stockées dans localStorage
let basketData = []

function allStorage() {

        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        basketData.push(localStorage.getItem(keys[i]) );
    } 

}

allStorage();


// Insertion des données dans le html
let basketEntry = document.getElementById('basket__content');

function displayBasket() {
    
    if (window.localStorage.length === 0) {  // Si localStorage vide, remonter "panier vide"
        basketEntry.innerText = "Votre panier est vide"
    } else {
    basketData.forEach((cam,index) => { // Sinon écrire chaque élément du local storage dans une ligne de tableau
                          
        let newLine = JSON.parse(basketData[index])
        let basketLine = document.getElementById("table_body"); 
        basketLine.innerHTML += `
            <tr>
                <td>${newLine.cam}</td>
                <td>${newLine.option}</td>
                <td>${newLine.quantity}</td>
                <td>${newLine.price} €</td>
                <td>${newLine.price * newLine.quantity} €</td>
            </tr>`
         
    })}}

    displayBasket();



   