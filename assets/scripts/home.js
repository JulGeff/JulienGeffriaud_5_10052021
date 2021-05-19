fetch('http://localhost:3000/api/cameras')
    .then((response) => response.json())
    .then(function(cameras) {
        addCameras(cameras)
     })

function addCameras(cameras) {
    cameras.forEach(function(camera) {
        displayCamera(camera);
    })
}

function displayCamera(camera) {
    document.getElementById('camera1__name').innerHTML = camera[1].lenses;
    // creation de ton html pour injecter une camera dans le tamplate
    // Toujours avec le même princique que tu as fais pour ajouter les element dans ton html
    
}





//test modif texte bouton 1 au clic
var elt = document.getElementsByClassName('buttons')[0];
elt.addEventListener('click', function () {          // On écoute l'événement click
        elt.innerHTML = "Ajouté à votre panier";

})
