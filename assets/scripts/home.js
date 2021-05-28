let ul = document.getElementById('cameras');


fetch('http://localhost:3000/api/cameras')
    .then((response) => response.json())
    .then(function (cameras) {


        cameras.forEach((camera, index) => {
            displayCamera(camera, index);
        });

    });


function displayCamera(camera, index) {

    ul.innerHTML += `
        <li class="camera">
        <a href="./pages/product.html?id=${camera._id}">
            <img src="${camera.imageUrl}" alt="appareil photo">
            <div class="camera__subtitle">
                <h2>${camera.name}</h2>
                <h2>${camera.price / 1000} €</h2>
                <button class="buttons">
                    + d'infos
                </button>
            </div>
        </a>
    </li>`

}

