document.querySelector("#beaches").classList.add("target");


var map = L.map('map').setView([37.9448, 23.3539], 10);

// gia nea views toy map
//https://leaflet-extras.github.io/leaflet-providers/preview/#filter=Jawg.Terrain

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

// set the links of each beach for the beach page
const beaches_cards = document.querySelectorAll('.beach-item');
beaches_cards.forEach(card => {
    card.addEventListener('click', (e) => {
        // get the id of the card
        const card = e.target.closest(".beach-item");
        // take the key atribute of the card
        const id = card.getAttribute("key");
        // redirect to the page of this beach
        window.location.href = "/beach?page=" + id;

    }
    )
})
