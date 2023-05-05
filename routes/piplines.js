import { validateUser,addUser } from '../config/db_functions.mjs';

export const loginPipe = [
    (req, res,next) => {
        validateUser({username:req.body.username,password:req.body.password}).then(isLogedInRes => {
            if (isLogedInRes) {
                next();
            } else {
                req.flash('alertMessage', 'Error loging in')
                res.redirect('/signin');
        }})
    },
    (req, res) => {
        res.redirect('/');
    }
    ]

        /*
router.post('/registeruser', (req, res,next) => { addUser({name:req.body.name}) }
        if (isLogedInRes) {
            isLogedIn = true;
            res.redirect('/');
        } else {
            req.flash('alertMessage', 'Error singin up')
            res.redirect('/signup');
        }
    }
    ).catch(err=>console.log(err));
});
*/
