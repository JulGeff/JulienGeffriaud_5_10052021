let basketData = [];

// Get all localStorage data in a single array
function allStorage() {
    basketData = []
    keys = Object.keys(localStorage),
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
newh2.id = "sum";
let sumSentence = document.getElementById("sum");
let newp = document.createElement("p");
let qt = document.getElementsByClassName("qt");
let basketLine = document.getElementById("table_body");
let submit = document.getElementById("submit");


// Insertion des données du localStorage dans la table html
function displayBasket() { 

    if (window.localStorage.length === 0) {  // Si localStorage vide, remonter "panier vide"
        newh2.innerHTML = "";
        basketEntry.innerText = "Votre panier est vide"
    } else { 
        basketData.forEach((cam, index) => { // Sinon écrire chaque élément du local storage dans une ligne de tableau et calculer somme totale

            let newLine = JSON.parse(basketData[index]);
            tableFulfill (newLine);
            total (newLine);
        })
        
        addQtChoices(); 
    } 
}

displayBasket();

//FONCTIONS APPELLES DANS displayBasket()

//Création d'une nouvelle ligne de table html 
function tableFulfill (newLine) { 
    basketLine.innerHTML +=                 
    `<tr>
        <td><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart"
            class="svg-inline--fa fa-shopping-cart fa-w-18" role="img"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path fill="currentColor"
                d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z">
            </path>
            </svg>
        </td>
        <td class="id" data-label="Référence">${newLine.id}</td>
        <td class="product" data-label="Produit">${newLine.cam}</td>
        <td class="option" data-label="Option">${newLine.option}</td>
        <td data-label="Quantité">
            <label for="qt"></label>
                <select class="qt" name="q">
                    <option value="selected" selected>${newLine.quantity}</option>
                </select>
        </td>        
        <td class="price" data-label="Prix unitaire">${newLine.price} €</td>
        <td data-label="Total article">${(newLine.price * newLine.quantity).toFixed(2)} €</td>
        <td><button class="delete" >X</button></td>
    </tr>`;
    }


//Calcul et affichage du coût total
function total (newLine)  { 
    totalCost = totalCost + (newLine.price * newLine.quantity);
    basket.appendChild(newh2).innerHTML = `Le montant total de votre commande est de ${totalCost.toFixed(2)} €`; // affiche le total de la commande
    }


// Ajout du menu déroulant de sélection de quantité
function addQtChoices() { 
    for (let i = 0; i < qt.length; i++) {

        let quantity = qt[i].selectedOptions[0].text; // retourne la quantité sélectionnée
    

        for (let j = 1; j < 10; j++) {

            var opt = document.createElement("option");
            opt.value = j;
            opt.text = j;
            if (j < quantity) {
                qt[i].add(opt, qt[i].selectedOptions[0]);  //place les qts inférieures à la quantité sélectionnée plus haut dans le menu déroulant

            } else {                //place les qts supérieures à la quantité sélectionnée plus bas dans le menu déroulant
                if (j > quantity) {
                    qt[i].add(opt);
                }
            }
        }
    }
}

//FIN DES FONCTIONS APPELLES DANS displayBasket()


//MISE A JOUR DU PANIER - Suppression ligne de commande & modification quantité de commande
let basketLines =  document.getElementsByClassName("id");

//Suppression d'une ligne du panier au clic sur "Retirer du panier"
function basketDelete () { 
    let id = document.getElementsByClassName("id")
    let lineDeletion = document.getElementsByClassName("delete")

    for (let i = 0; i < basketLines.length; i++)
        lineDeletion[i].addEventListener('click', function () {
            localStorage.removeItem(id[i].innerText);
            location.reload() //recharge la page

    })}

basketDelete();

//Enregistrement événement modification de quantité dans le local storage
function newQt() { 

    for (let i = 0; i < qt.length; i++) {
            

        qt[i].addEventListener('change', function () { //on écoute si modification d'option sur le menu déroulant "quantité"
            let newQuantity = qt[i].selectedOptions[0].text;
            console.log(newQuantity)
                    
            for (let j = 0; j < basketLines.length; j++) {
        
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
                location.reload() //recharge la page
          
            }   
        
        })
       
    };
    
}

newQt();


//FIN MISE A JOUR DU PANIER

//ENVOI DE LA COMMANDE A l'API




function send(e) {
    
    orderStorage();
    if (products.length === 0) {
        e.preventDefault();
        document.getElementById("contact").appendChild(newp).innerHTML = "Votre panier est vide ! <br> Veuillez sélectionner un produit"

    } else {
        
        let contact = contactCreation();
        let order = { contact : contact, products : products }
        
        let sendOptions = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
          }

        fetch("http://localhost:3000/api/cameras/order", sendOptions)
            .then((response) => response.json())
            .then((json) => {   
                let orderResponse = { orderRef : json.orderId ,totalCost : totalCost, firstName : contact.firstName }
                localStorage.clear ()
                localStorage.setItem("order", JSON.stringify(orderResponse))
                document.location.href = "order.html"
        })
            .catch(x => { // gestion des erreurs en cas de fail d'API
                console.log(x);  
                })
          
    }
}
 
  
  document
    .getElementById("form")
    .addEventListener("submit", send);


    //FONCTIONS APPELLEES DANS send()

// Récupération des ID de la commande dans le localStorage
let products = []; 

function orderStorage() {       
    keys = Object.keys(localStorage), 
        i = keys.length;

    while (i--) {  
        products.push(JSON.parse(basketData[i]).id);
     
    }  
}

//Création de l'objet contact
function contactCreation() {
    let firstName = document.getElementById("first_name").value;
    let lastName = document.getElementById("last_name").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;
    let contact = {     
        firstName : firstName,
        lastName : lastName,
        address : address,
        city : city,
        email : email,
    }
    
    return contact;
    
}

    
    

  