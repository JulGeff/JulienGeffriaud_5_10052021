
let id = location.search.substr(4); //extraction de l'ID depuis l'url
console.log (id);
let main = document.getElementById('main');


fetch('http://localhost:3000/api/cameras')
    .then((response) => response.json())
    .then(function (cameras) {
        for (var i = 0; i < cameras.length; i++) {
            console.log (cameras[i]._id); 
            if (id === cameras[i]._id) { //comparaison de l'ID situé dans l'url avec les ID du fichier json issu de l'API
                
                // Quand ID correspondant avec clui de l'URL, insertion de la fiche produit ci-dessous
                main.innerHTML += `
                <h1>Craquez pour le ${cameras[i].name}!</h1>
                <section>
                    <div class=product>
                        <img src="../images/vcam_${i + 1}.jpg" alt="appareil photo">
                        <div class=product__subtitle>
                            <h2>${cameras[i].name}</h2>
                            <p>${cameras[i].description}</p>

                            <p>
                            <label for="options">Lentilles : </label>
                            <select name="lenses" id="lenses-select">
                                <option value="">--choisissez une option--</option>
                                
                            </select>
                            </p>
                            <p>
                            <label for="q">Quantité : </label>
                            <select id="qt" name="q">
                                <option value="1">1</option>
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
                            <button type="button" div=${cameras[i].id}>
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                </li>`


                // Insertion des options de lenses pour chaque appareil 
                cameras[i].lenses.forEach((lens, index) => {
                    function displayLensOption(lens, index) {
                        let lensesOptions = document.getElementById('lenses-select');    
                            lensesOptions.innerHTML += 
                            `<option>${cameras[i].lenses[index]}</option>`
                        };
                        displayLensOption(lens, index)
                })
            }}});




           
    
         
 
            
                
                      
            