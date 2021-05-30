
let id = location.search.substr(4); //extraction de l'ID depuis l'url
console.log(id);
let main = document.getElementById('main');

fetch(`http://localhost:3000/api/cameras/${id}`) // récupération de l'ID situé dans l'URL depuis l'API
    .then((response) => response.json())
    .then(function (camera) {
        console.log(camera);
        productPage(camera);  // création de la fiche produit
        lensesOptions(camera);// affichage des options de lenses
        basket(camera);
    })

    
//FONCTIONS APPELEES
// création de la fiche produit dans le code HTML
function productPage(camera, index) {
    main.innerHTML += `
        <h1>Craquez pour le ${camera.name}!</h1>
        <section>
            <div class=product>
                <img src="${camera.imageUrl}" alt="appareil photo">
                <div class="product__subtitle" id="product__subtitle">
                    <h2>Description du ${camera.name}</h2>
                    <p>${camera.description}</p>
                    <p>
                        <label for="lenses">Lentilles : </label>
                        <select name="lenses" id="lenses-select">
                            <option value="" selected>--choisissez une option--</option> 
                        </select>
                    </p>
                    <p>
                        <label for="qt">Quantité : </label>
                        <select id="qt" name="q">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>
                    </p>
                    <button type="button" id="button">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </li>`
}

// Insertion des options de lenses pour chaque appareil 
function lensesOptions(camera) {
    camera.lenses.forEach((lens, index) => {
        function displayLensOption() {
            let lensesOptions = document.getElementById('lenses-select');
            lensesOptions.innerHTML +=
                `<option>${camera.lenses[index]}</option>`
        };

        displayLensOption();

    })
}

//AJOUT AU PANIER
// Récupération option choisie
function chosenOption() {
   
    let opt = document.getElementById("lenses-select");
    let option = opt[opt.selectedIndex].text;
    return option;
   
};

// Récupération quantité choisie
function chosenQt() {
    let qt = document.getElementById("qt");
    let quantity = qt.selectedIndex + 1;
    return quantity;

};


// Stockage de l'ID, option et de la quantité associée dans localStorage
function basket(camera) {

    const button = document.getElementById('button');     // On récupère l'élément sur lequel on veut détecter le clic
    button.addEventListener('click', function () {        // On écoute l'événement click
        let option = chosenOption();                      // On enregistre l'option sélectionnée
        let quantity = chosenQt();                        // On enregistre la quantité sélectionnée


        let prod = document.getElementById("product__subtitle"); 
        let newp = document.createElement("p");
        newp.setAttribute("id", "verif_message")
        prod.appendChild(newp).innerHTML = "";

        if (document.getElementById("lenses-select").selectedIndex === 0) { 
        
            document.getElementById("verif_message").innerHTML = "Veuillez sélectionner une option"; 
            // si pas d'option choisie, on retourne "Veuillez choisir une option"
        } else {                                
    
            document.getElementById("verif_message").innerHTML = "Produit ajouté au panier";          
            // si option choisie, on retourne "Produit ajouté" et on stocke dans localStorage
            let product = {id:id, cam:camera.name, option:option, quantity:quantity, price:camera.price / 1000};
            localStorage.setItem(id, JSON.stringify(product));       
            // on stocke données produit dans localStorage       
        }  

    })
};



