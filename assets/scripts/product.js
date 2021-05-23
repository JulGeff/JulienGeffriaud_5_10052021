
let id = location.search.substr(4); //extraction de l'ID depuis l'url
console.log (id);
let main = document.getElementById('main');


fetch('http://localhost:3000/api/cameras')
    .then((response) => response.json())
    .then(function (cameras) {
        for (var i = 0; i < cameras.length; i++) {
            console.log (cameras[i]._id); 
            if (id === cameras[i]._id) { //comparaison de l'ID situé dans l'url avec les ID du fichier json issu de l'API
                
                // Quand ID correspondant avec clui de l'URL, insertion de la fiche produit
                main.innerHTML += `
                <h1>Craquez pour le ${cameras[i].name}!</h1>
                <section>
                    <div class=product>
                        <img src="../images/vcam_${i + 1}.jpg" alt="appareil photo">
                        <div class=product__subtitle>
                            <h2>${cameras[i].name}</h2>
                            <p>${cameras[i].description}</p>

                            <label for="options">Lentilles</label>
                            <select name="lenses" id="lenses-select">
                                <option value="">--choisissez une option--</option>
                                
                            </select>

                            <p>Prix : ${cameras[i].price / 1000} €</p>
                            
                            <button type="button" class="buttons">
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                </li>`

                // Insertion des options de lenses pour chaque appareil 
                cameras[i].lenses.forEach((lens) => {
                    function displayLensOption(lens) {
                        let lensesOptions = document.getElementById('lenses-select');
                                              
                            lensesOptions.innerHTML += 
                            `<option>${cameras[i].lenses.lens}</option>`
                        };
                        displayLensOption()
                })
            }}});


           
    
         
 
            
                
                      
            