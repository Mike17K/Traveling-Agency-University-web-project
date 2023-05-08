import express from 'express';
import { loginPipe } from './piplines.js';

export const router = express.Router();

// functions
const loggedIn = (req, res, next) => {
    console.log();
    if (req.session.name === undefined) {
        res.redirect('/signin');
    }
    else {
        next();
    }
};

const home = (req, res) => {
    let isLogedIn = (req.session.name === undefined) ? false : true;
    res.render('pages/home', { style: 'home.css', title: "home page", script: "home.js", isLogedIn: isLogedIn });
}

// routes
router.get('/', home);

router.get('/signin', (req, res, next) => {
    res.render('pages/signin', { style: 'signin.css', title: "login page", script: "signin.js", isLogedIn: false, alertMessage: req.flash('alertMessage') });

});

router.get('/signup', (req, res) => {
    res.render('pages/signup', { style: 'signup.css', title: "signup page", script: "signup.js", isLogedIn: false, alertMessage: req.flash('alertMessage') });
});

router.get('/logout', (req, res) => {
    //TODO make the logout
    req.session.destroy((err) => { console.log("session destroyed") });
    res.redirect('/');
});

router.post('/logingIn', loginPipe);


router.get('/Beaches', (req, res) => {
    // fetch data from server 
    // and pass them to the render object

    let data = [
        {
            id: "1",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTZkVmyelTI1lyMjxSWxh6wWjiBHN4KEDyQ&usqp=CAU",
            title: "Κολώνα",
            organized: "Μη οργανωμένη",
            location: "Στο κέντρο της Αίγινας",
            direction: "Δυτικά του νησιού"
        },
        {
            id: "2",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTZkVmyelTI1lyMjxSWxh6wWjiBHN4KEDyQ&usqp=CAU",
            title: "Πόρτες",
            organized: "Μη οργανωμένη",
            location: "24’ από το λιμάνι της Αίγινας",
            direction: "Ανατολικά του νησιού"
        },
        {
            id: "3",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTZkVmyelTI1lyMjxSWxh6wWjiBHN4KEDyQ&usqp=CAU",
            title: "Σουβάλα",
            organized: "Οργανωμένη",
            location: "18’ από το λιμάνι της Αίγινας",
            direction: "Βόρεια του νησιού"
        },
        {
            id: "4",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTZkVmyelTI1lyMjxSWxh6wWjiBHN4KEDyQ&usqp=CAU",
            title: "Αγία Μαρίνα",
            organized: "Οργανωμένη",
            location: "20’ από το λιμάνι της Αίγινας",
            direction: "Ανατολικά του νησιού"
        }
    ];

    res.render('pages/beaches', { style: 'beaches.css', title: "home page", data: data, script: "beaches.js" });
}
);

router.get('/beach', loggedIn, (req, res) => {
    const beach_id = req.query.page;

    // fetch the data
    const data = {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTZkVmyelTI1lyMjxSWxh6wWjiBHN4KEDyQ&usqp=CAU",
        discription: "discription testing .... "
    }
    const comments = [
        {
            id: 0,
            username: 'mike',
            content: 'test loremf sa sakhfd',
            likes: 3,
            replies: 5,
        },
        {
            id: 1,
            username: 'mike',
            content: 'test loremf sa sakhfd',
            likes: 3,
            replies: 5,
        }];

    res.render('pages/beachpage', { style: 'beachpage.css', title: "Beach Page", script: "beachpage.js", data: data, isLogedIn: false, comments: comments });
}
);
