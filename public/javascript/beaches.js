document.querySelector('.page-description').addEventListener("click",(event)=>{
    const e = document.querySelector('.map');

    let logic=false;
    e.classList.forEach((e)=>{
        if(e=="hidden-map"){
            logic = true;
        }
    })

    if (logic){
        e.classList.remove("hidden-map");
        e.classList.add("show-map");
    }else{
        e.classList.remove("show-map");
        e.classList.add("hidden-map");
    }
})


var map = L.map('map').setView([37.9448, 23.3539], 10);

// gia nea views toy map
//https://leaflet-extras.github.io/leaflet-providers/preview/#filter=Jawg.Terrain

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);
