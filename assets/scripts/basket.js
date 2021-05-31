let basketData = [];

// Récupération dans un array de toutes les données stockées dans localStorage
function allStorage() {

    keys = Object.keys(localStorage), // à recreuser
        i = keys.length;

    while (i--) {
        basketData.push(localStorage.getItem(keys[i]));
    }
}

allStorage();

let basketEntry = document.getElementById('basket__content');
let basket = document.getElementById("basket__main");
let totalCost = 0;
let newh2 = document.createElement("h2");
let qt = document.getElementsByClassName("qt");
let basketLine = document.getElementById("table_body");

displayBasket();

// Insertion des données du localStorage dans la table html
function displayBasket() { 

    if (window.localStorage.length === 0) {  // Si localStorage vide, remonter "panier vide"
        basketEntry.innerText = "Votre panier est vide"
    } else { 
        basketData.forEach((cam, index) => { // Sinon écrire chaque élément du local storage dans une ligne de tableau et calculer somme totale

            let newLine = JSON.parse(basketData[index]);
            tableFulfill (newLine);
            total (newLine);
        })
        
        
    }
}

function tableFulfill (newLine) { //Création d'une nouvelle ligne de table html 
basketLine.innerHTML +=                 
`<tr>
    <td class="id">${newLine.id}</td>
    <td class="product">${newLine.cam}</td>
    <td class="option">${newLine.option}</td>
    <td>
        <label for="qt"></label>
            <select class="qt" name="q">
                <option value="selected" selected>${newLine.quantity}</option>
            </select>
    </td>        
    <td class="price">${newLine.price} €</td>
    <td>${(newLine.price * newLine.quantity).toFixed(2)} €</td>
    <td><button class="delete">X</button></td>
</tr>`;
}


function total (newLine)  { //Calcul et affichage du coût total
totalCost = totalCost + (newLine.price * newLine.quantity);
basket.appendChild(newh2).innerHTML = `Le montant total de votre commande est de ${totalCost.toFixed(2)} €`; // affiche le total de la commande
}


function addQtChoices() { // Ajout du menu déroulant de sélection de quantité
    for (let i = 0; i < qt.length; i++) {

        let quantity = qt[i].selectedOptions[0].text;
        console.log(quantity);
        console.log(qt)

        for (let j = 1; j < 10; j++) {

            var opt = document.createElement("option");
            opt.value = j;
            opt.text = j;
            if (j < quantity) {
                qt[i].add(opt, qt[i].selectedOptions[0]);

            } else {
                if (j > quantity) {
                    qt[i].add(opt);
                }
            }
        }
    }
}

addQtChoices();

let basketLines =  document.getElementsByClassName("id");

function newQt() { //Enregistrement événement modification de quantité

    for (let i = 0; i < qt.length; i++) {
        let quantity = qt[i].selectedOptions[0].text;

        qt[i].addEventListener('change', function () {

            let newQuantity = qt[i].selectedOptions[0].text;
            
                    
            for (let i = 0; i < basketLines.length; i++) {
        
                let idPos = document.getElementsByClassName("id")[i];
                let camPos = idPos.nextElementSibling;
                let optionPos = camPos.nextElementSibling;
                let quantityPos = optionPos.nextElementSibling;
                let pricePos = quantityPos.nextElementSibling;
            
                let id = idPos.innerText;
                let cam = camPos.innerText;
                let option = optionPos.innerText;
                let quantity = newQuantity;
                let price = pricePos.innerText.slice(0, -2);
            
                let product = {id:id, cam:cam, option:option, quantity:quantity, price:price};

                localStorage.setItem(id, JSON.stringify(product)); // envoie la nouvelle quantité dans le local storage          
                location.reload() //recharge la page à chaque modification de quantité
          
            }           
        })
    };
}

newQt();


function basketDelete () { //Suppression d'une ligne du panier au clic sur "Retirer du panier"
let id = document.getElementsByClassName("id")
let lineDeletion = document.getElementsByClassName("delete")

for (let i = 0; i < basketLines.length; i++)
lineDeletion[i].addEventListener('click', function () {
localStorage.removeItem(id[i].innerText);
location.reload() //recharge la page à chaque suppression de ligne du panier

})}

basketDelete ();


//Création de l'objet à envoyer au serveur

let firstName = document.getElementById("first_name").innerText;
let lastName = document.getElementById("last_name").innerText;
let address = document.getElementById("address").innerText;
let city = document.getElementById("city").innerText;
let email = document.getElementById("email").innerText;
   
    
let contact = {     //création de l'objet contact regroupant les coordonnées du client

firstName : firstName,
lastName : lastName,
address : address,
city : city,
email : email,

}

let order = [];

function orderStorage() {       // Récupération des ID de la commande dans le localStorage
    keys = Object.keys(localStorage), 
        i = keys.length;

    while (i--) {
        order.push(JSON.parse(basketData[i]).id);
   
        
    }
    
}
orderStorage()


let orderPack = { contact, order }
console.log(orderPack);



//Envoi des données du panier à l'API
/*Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs
firstName, lastName, address, city et email. Le tableau des produits envoyé au
backend doit être un array de strings product_id. Les types de ces champs et leur
présence doivent être validés avant l’envoi des données au serveur*/



function send(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/cameras/order", {
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(orderPack)
    })
    .then(function(res) {
      if (res.ok) {
        console.log(res.json)
        
      }
      
    })
    
  }
  
  document
    .getElementById("form")
    .addEventListener("submit", send);
  