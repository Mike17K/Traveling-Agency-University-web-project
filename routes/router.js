const express = require('express');
const router = express.Router();

let isLogedIn = true;

// here all the diferent pages are rendered
router.get('/', (req, res) => {
    res.render('pages/home', {style:'home.css',title:"home page",script:"home.js",isLogedIn:isLogedIn});
}
);

router.get('/signin', (req, res) => {
    res.render('pages/signin', {style:'signin.css',title:"login page",script:"signin.js",isLogedIn:false});
});

router.get('/signup', (req, res) => {
    res.render('pages/signup', {style:'signup.css',title:"signup page",script:"signup.js",isLogedIn:false});
});

router.get('/logout', (req, res) => {
    isLogedIn = false;
    res.redirect('/');
});

router.post('/logingIn', (req, res) => {
    // make here the logic for loging in here
    oauth = true;
    if(!oauth){
        res.redirect('/signup');
        return
    }
    isLogedIn = true;
    res.redirect('/');
});

router.post('/registeruser', (req, res) => {
    // make here the logic

    isLogedIn = true;
    res.redirect('/');
});


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