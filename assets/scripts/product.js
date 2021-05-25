
let id = location.search.substr(4); //extraction de l'ID depuis l'url
console.log(id);
let main = document.getElementById('main');

fetch(`http://localhost:3000/api/cameras/${id}`) // récupération de l'ID situé dans l'URL depuis l'API
    .then((response) => response.json())
    .then(function (camera) {
        console.log(camera);
        productPage(camera);  // création de la fiche produit
        lensesOptions(camera);// affichage des options de lenses
        storeQt();             // au clic sur "Ajouter au panier", enregistrement clé id / qt dans local storage
    })

//FONCTIONS APPELEES
// création de la fiche produit
function productPage(camera) {
    main.innerHTML += `
        <h1>Craquez pour le ${camera.name}!</h1>
        <section>
            <div class=product>
                <img src="../images/vcam_1.jpg" alt="appareil photo">
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
function chosenOption(option) {
    let opt = document.getElementById("lenses-select");
    opt.addEventListener('change', function () {
        let option = opt[opt.selectedIndex].text;
        console.log("Option choisie : " + option);
  


    })
};


// Récupération quantité choisie
function chosenQt() {
    let qt = document.getElementById("qt");
    qt.addEventListener('change', function () {
        let quantity = qt.selectedIndex + 1;
        console.log("Quantité choisie : " + quantity);

    })
};


// Stockage de l'ID, option et de la quantité associée dans localStorage
function storeQt(quantity, option) {
chosenQt();
chosenOption();


    let product = {
        id: id,
        option: option,
        quantity: quantity,
    }
    

    const button = document.getElementById('button');                  // On récupère l'élément sur lequel on veut détecter le clic
    button.addEventListener('click', function () { 
        console.log(product);                    // On écoute l'événement click
        window.localStorage.setItem(id, JSON.stringify(product)); // On stocke la chaîne id option / qt dans le local storage
        let prod = document.getElementById("product__subtitle"); // On écrit "Produit ajouté au panier !" sous le bouton
        let newp = document.createElement("p");
        prod.appendChild(newp).innerHTML = "Produit ajouté au panier";
    })
};

