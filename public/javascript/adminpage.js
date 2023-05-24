
const img = document.querySelector(".image");
const titles = document.querySelectorAll(".title");
const direction = document.querySelector(".direction");

document.querySelector("#img-url-input").addEventListener("change", async (e) => {
    console.log(e.target.value);
    img.src = e.target.value;
    document.querySelector(".beach-img").src = e.target.value;
});

document.querySelector("#title-input").addEventListener("change", async (e) => {
    console.log(e.target.value);
    titles.forEach(title => title.innerHTML = e.target.value);
}
);

document.querySelector("#organized-input").addEventListener("change", async (e) => {
    console.log(e.target.value);
    document.querySelectorAll(".organized").forEach(organized => organized.innerHTML = e.target.value);
}
);

document.querySelector("#direction-input").addEventListener("change", async (e) => {
    console.log(e.target.value);
    direction.innerHTML = e.target.value;
}
);

document.querySelector("#location-input").addEventListener("change", async (e) => {
    console.log(e.target.value);
    document.querySelectorAll(".location").forEach(location => location.innerHTML = e.target.value);
}
);

document.querySelector("#description-input").addEventListener("change", async (e) => {
    console.log(e.target.value);
    document.querySelector(".discription").innerHTML = e.target.value;
}
);












var map = L.map('map').setView([37.9448, 23.3539], 10);

// gia nea views toy map
//https://leaflet-extras.github.io/leaflet-providers/preview/#filter=Jawg.Terrain

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);



// refresh page to apply values
var event = new Event('change');

// Dispatch it.
document.querySelectorAll("input").forEach(e => e.dispatchEvent(event));


// handle the submit button
document.querySelector("#post-add-button").addEventListener("click", async (e) => {
    console.log("post-add-button clicked");

    const img_url = document.querySelector("#img-url-input").value;
    const title = document.querySelector("#title-input").value;
    const organized = document.querySelector("#organized-input").value;
    const direction = document.querySelector("#direction-input").value;
    const location = document.querySelector("#location-input").value;
    const description = document.querySelector("#description-input").value;

    console.log(img_url, title, organized, direction, location, description);

    fetch('/api/addpost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            img_url: img_url,
            title: title,
            organized: organized,
            direction: direction,
            location: location,
            description: description
        }),
    }).then(res => res.json()).then(res => {
        alert(res.message);
    })
}
);

