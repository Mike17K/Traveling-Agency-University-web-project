const express = require('express');
const router = express.Router();

// here all the diferent pages are rendered
router.get('/', (req, res) => {
    res.render('pages/home', {style:'home.css',title:"home page",script:"home.js"});
}
);

router.get('/Beaches', (req, res) => {
    // fetch data from server 
    // and pass them to the render object

    data = [
        {
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTZkVmyelTI1lyMjxSWxh6wWjiBHN4KEDyQ&usqp=CAU",
            title:"Κολώνα",
            organized:"Μη οργανωμένη",
            location:"Στο κέντρο της Αίγινας",
            direction:"Δυτικά του νησιού"
        },
        {
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTZkVmyelTI1lyMjxSWxh6wWjiBHN4KEDyQ&usqp=CAU",
            title:"Πόρτες",
            organized:"Μη οργανωμένη",
            location:"24’ από το λιμάνι της Αίγινας",
            direction:"Ανατολικά του νησιού"
        },
        {
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTZkVmyelTI1lyMjxSWxh6wWjiBHN4KEDyQ&usqp=CAU",
            title:"Σουβάλα",
            organized:"Οργανωμένη",
            location:"18’ από το λιμάνι της Αίγινας",
            direction:"Βόρεια του νησιού"
        },
        {
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTZkVmyelTI1lyMjxSWxh6wWjiBHN4KEDyQ&usqp=CAU",
            title:"Αγία Μαρίνα",
            organized:"Οργανωμένη",
            location:"20’ από το λιμάνι της Αίγινας",
            direction:"Ανατολικά του νησιού"
        }
    ];

    res.render('pages/beaches', {style:'beaches.css',title:"home page",data:data,script:"beaches.js"});
}
);



module.exports = router;