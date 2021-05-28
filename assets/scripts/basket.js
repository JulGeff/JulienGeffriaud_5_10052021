// Récupération de toutes les données stockées dans localStorage
let basketData = []

function allStorage() {

    keys = Object.keys(localStorage), // à recreuser
        i = keys.length;

    while (i--) {
        basketData.push(localStorage.getItem(keys[i]));
    }
}

allStorage();


// Insertion des données dans le html
let basketEntry = document.getElementById('basket__content');
let basket = document.getElementById("basket__main");
let totalCost = 0;
let newh2 = document.createElement("h2");


function displayBasket() {

    if (window.localStorage.length === 0) {  // Si localStorage vide, remonter "panier vide"
        basketEntry.innerText = "Votre panier est vide"
    } else {
        basketData.forEach((cam, index) => { // Sinon écrire chaque élément du local storage dans une ligne de tableau

            let newLine = JSON.parse(basketData[index])
            let basketLine = document.getElementById("table_body");

            totalCost = totalCost + (newLine.price * newLine.quantity);

            basketLine.innerHTML += `
            <tr>
                <td>${newLine.id}</td>
                <td>${newLine.cam}</td>
                <td>${newLine.option}</td>
                <td>
                    <label for="qt"></label>
                        <select class="qt" name="q">
                            <option value="selected" selected>${newLine.quantity}</option>
                        </select>
                </td>        
                <td>${newLine.price.toFixed(2)} €</td>
                <td>${(newLine.price * newLine.quantity).toFixed(2)} €</td>
                <td class="delete">Retirer du panier</td>
            </tr>`

            return totalCost;




        })
    }
}

displayBasket();

// Ajout des autres quantités en option

let qt = document.getElementsByClassName("qt");

function addQtChoices() {
    for (let i = 0; i < qt.length; i++) {

        let quantity = qt[i].selectedOptions[0].text;
        console.log(quantity)

        for (let j = 1; j < 10; j++) {

            var opt = document.createElement("option");
            opt.value = j;
            opt.text = j;
            if (j < quantity) {
                qt[i].add(opt, qt[i].selectedOptions[0]);

            } else {
                if (j > quantity)
                    qt[i].add(opt);
            }
        }
    }
}

addQtChoices();


//enregistrement événement modification de quantité

function newQt() {

    for (let i = 0; i < qt.length; i++) {
        let quantity = qt[i].selectedOptions[0].text;

        qt[i].addEventListener('change', function () {
            let newQuantity = qt[i].selectedOptions[0].text
            return (newQuantity);

        })
    };
}

newQt();


// réinjecter nouvelle quantité dans local Storage
function basketUpdate() {

    let product = {id:id, cam:camera.name, option:option, quantity:quantity, price:camera.price / 1000};
    localStorage.setItem(id, JSON.stringify(product));   
}


