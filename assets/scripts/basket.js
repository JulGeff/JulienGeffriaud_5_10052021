let addBasket = document.getElementById("5be1ef211c9d44000030b062").href = "../../pages/product.html";    // On récupère l'élément sur lequel on veut détecter le clic
addBasket.addEventListener('click', function() {                                  // On écoute l'événement click
    document.getElementById('basket').innerHTML = "<p>C'est cliqué !</p>";               // On change le contenu de notre élément pour afficher "C'est cliqué !"
});



/* //tests
document.getElementById('jstest2').innerHTML = 'New text!';


const newElt = document.createElement("div");
newElt.innerText = "new child div baby"


let elt = document.getElementById("jstest2");

elt.appendChild(newElt);
*/
