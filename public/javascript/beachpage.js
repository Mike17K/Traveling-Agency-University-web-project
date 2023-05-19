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
        window.location.href = "/beach/" + id;

    }
    )
})

// add comment logic
const comment_list = document.querySelector("#comment-list");
const comment_btn = document.querySelector("#critic-submit-button");
const comment_input = document.querySelector("#critic-input");

comment_btn.addEventListener('click', (e) => {
    // get the id of the card
    const comment = comment_input.value;
    // take the key atribute of the card
    const post_id = document.querySelector("#post-id").getAttribute("key");
    //console.log("post_id", post_id);
    // redirect to the page of this beach
    fetch('/api/addcomment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: comment,
            post_id: post_id
        }),
    })
}
)








// add the add like logic
const like_btns = document.querySelectorAll('.like-btn');

like_btns.forEach(btn => {
    const comment_id = btn.closest(".comment-wrapper").getAttribute("id");

    btn.addEventListener('click', (e) => {
        // add class liked to all liked comments by the user TODO
        document.querySelector(`.comment-wrapper[id='${comment_id}'] .dislike-btn`).classList.remove("disliked");

        fetch('/api/addlike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment_id: comment_id,
            }),
        })
            .then(response => response.json())
            .then(data => {
                //console.log('Success:', data);
                // update the likes
                const likes = document.querySelector(`#likes-count-${comment_id}`);
                likes.innerHTML = data.likescount;
                (data.action == 'added') ? btn.classList.add("liked") : btn.classList.remove("liked");
            }
            )
    }
    )
}
)

// add the add dislike logic
const dislike_btns = document.querySelectorAll('.dislike-btn');
dislike_btns.forEach(btn => {
    const comment_id = btn.closest(".comment-wrapper").getAttribute("id");
    btn.addEventListener('click', (e) => {
        // add class liked to all liked comments by the user TODO
        btn.classList.toggle("disliked");

        document.querySelector(`.comment-wrapper[id='${comment_id}'] .like-btn`).classList.remove("liked");

        fetch('/api/removelike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment_id: comment_id,
            }),
        })
            .then(response => response.json())
            .then(data => {
                //console.log('Success:', data);
                // update the likes
                const likes = document.querySelector(`#likes-count-${comment_id}`);
                likes.innerHTML = data.likescount;
            }
            )


    }
    )
}
)

