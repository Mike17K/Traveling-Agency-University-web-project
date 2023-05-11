import { validateUser, addUser } from '../config/db_functions.mjs';

export const loggedIn = (req, res, next) => {
    console.log();
    if (req.session.name === undefined) {
        res.redirect('/signin');
    }
    else {
        next();
    }
};


export const home = (req, res) => {
    let isLogedIn = (req.session.name === undefined) ? false : true;
    res.render('pages/home', { style: 'home.css', title: "home page", script: "home.js", isLogedIn: isLogedIn });
}


export const loginPipe = [
    (req, res, next) => {
        validateUser({ username: req.body.username, password: req.body.password }).then(isLogedInRes => {
            if (isLogedInRes) {
                req.session.name = 'session-update';
                next();
            } else {
                req.flash('alertMessage', 'Error loging in')
                res.redirect('/signin');
            }
        })
    },
    (req, res, next) => {
        res.redirect('/');
    }
]

export const registerPipe = [
    (req, res, next) => {
        addUser(req.body.username, req.body.password).then(isLogedInRes => {
            if (isLogedInRes) {
                req.session.name = 'session-update';
                next();
            } else {
                req.flash('alertMessage', 'Error loging in')
                res.redirect('/signup');
            }
        })
    },
    (req, res, next) => {
        res.redirect('/');
    }
];

export const signin = (req, res, next) => {
    let isLogedIn = (req.session.name === undefined) ? false : true;
    res.render('pages/signin', { style: 'signin.css', title: "login page", script: "signin.js", isLogedIn: isLogedIn, alertMessage: req.flash('alertMessage') });
};
export const signup = (req, res) => {
    let isLogedIn = (req.session.name === undefined) ? false : true;
    res.render('pages/signup', { style: 'signup.css', title: "signup page", script: "signup.js", isLogedIn: isLogedIn, alertMessage: req.flash('alertMessage') });
};

export const logout = (req, res) => {
    req.session.destroy((err) => { console.log("session destroyed") });
    res.redirect('/');
}


import { getBeaches } from '../config/db_functions.mjs';
export const beachesPage = (req, res) => {
    let isLogedIn = (req.session.name === undefined) ? false : true;
    // fetch data from server 
    // and pass them to the render object

    const data = getBeaches();

    res.render('pages/beaches', { style: 'beaches.css', title: "home page", isLogedIn: isLogedIn, data: data, script: "beaches.js" });
}

export const beachPage = (req, res) => {
    let isLogedIn = (req.session.name === undefined) ? false : true;
    const beach_id = req.query.page;

    // fetch the data
    let data = getBeaches()[0];
    data = { ...data, beachtitle: data.title };

    console.log(data);

    const comments = [
        {
            id: 0,
            icon: 2,
            username: 'Mike Kaipis',
            content: 'Υπέροχο νησάκι με πεύκα, ωραία γαλαζοπράσινα νερά κι ένα μικρό beach bar με τις στοιχειώδεις ανέσεις. Η μεγαλύτερη ατραξιόν όμως είναι τα παγώνια και τα ελάφια που πλησιάζουν τον κόσμο χωρίς να φοβούνται. Μοναδική εμπειρία!',
            likes: 3,
            replies: 1,
            date: `5 minutes ago`,
        },
        {
            id: 1,
            icon: 3,
            username: 'George Kaipis',
            content: 'Το νησί πολυ όμορφο η εξυπηρετηση όμως αισχρή.Το προσωπικό αγενέστατο και οι τιμές στον θεό. (15€ για ένα ζευγάρι ξαπλώστρες σε μαγαζί σελφ σέρβις και 10€ για δυο καφέδες). Το τοπίο πολυ όμορφο τα νερά τέλεια αλλά το καταστηματακι άθλιο.',
            likes: 3,
            date: `15 minutes ago`,
            replies: 5,
        }];

    res.render('pages/beachpage', { style: 'beachpage.css', title: "Beach Page", script: "beachpage.js", data: data, isLogedIn: isLogedIn, comments: comments });
}

export const accessBeachPipeLine = [loggedIn, beachPage]