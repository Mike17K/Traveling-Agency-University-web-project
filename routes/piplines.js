import { validateUser, addUser } from '../models/mysql/db_functions.mjs';

export const loggedIn = (req, res, next) => {
    if (req.session.name === undefined) {
        res.redirect('/signin');
    }
    else {
        next();
    }
};

export const isAdmin = (req, res, next) => {
    if (req.session.name === "Admin") {
        next();
    }
    else {
        res.redirect('/');
    }
};


export const home = (req, res) => {
    let isLogedIn = (req.session.name === undefined) ? false : true;
    res.render('pages/home', { style: 'home.css', title: "home page", script: "home.js", isLogedIn: isLogedIn });
}


export const loginPipe = [
    (req, res, next) => {
        validateUser({ username: req.body.email, password: req.body.password }).then(isLogedInRes => {
            if (isLogedInRes) {
                req.session.name = 'session-update';
                if (req.body.email === 'admin' && req.body.password === 'password') {
                    req.session.name = 'Admin';
                    console.log("admin loged in");
                } else {
                    console.log("user loged in");
                }
                req.session.username = req.body.email;
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
        addUser(req.body.username, req.body.password, 1 + Math.floor(Math.random() * 5)).then(isLogedInRes => {
            if (isLogedInRes) {
                req.session.name = 'session-update';
                req.session.username = req.body.username;
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


import { getPosts, getPost } from '../controllers/beachesController.js';

export async function beachesPage(req, res) {
    let isLogedIn = (req.session.name === undefined) ? false : true;
    const data = await getPosts(10);

    console.log(data);

    res.render('pages/beaches', { style: 'beaches.css', title: "home page", isLogedIn: isLogedIn, data: data, script: "beaches.js" });
}


import { getBeachByPostId, getComments, getUserIdByName } from '../controllers/beachController.js';

export async function beachPage(req, res) {

    let isLogedIn = (req.session.name === undefined) ? false : true;
    const post_id = req.params.id;

    let user_id = await getUserIdByName(req.session.username);

    let post = await getPost(parseInt(post_id));
    console.log("post:", post);


    if (post === undefined) {
        res.redirect('/beaches');
        return;
    }

    let event = await getBeachByPostId(parseInt(post_id));
    console.log("event:", event);

    let data = { beachtitle: event.name, img: event.image, organized: event.description, location: event.location, description: post.description, post_id: post_id };
    console.log("data:", data);

    let comments = await getComments(user_id, parseInt(post_id));
    //console.log("comments:", comments);

    res.render('pages/beachpage', { style: 'beachpage.css', title: "Beach Page", script: "beachpage.js", data: data, isLogedIn: isLogedIn, comments: comments });
}

export const accessBeachPipeLine = [loggedIn, beachPage]





export async function adminPage(req, res) {
    let isLogedIn = (req.session.name === undefined) ? false : true;
    res.render('pages/adminpage', { style: 'adminpage.css', title: "Admin Page", script: "adminpage.js", isLogedIn: isLogedIn });
}

export const adminPipeLine = [loggedIn, isAdmin, adminPage]
