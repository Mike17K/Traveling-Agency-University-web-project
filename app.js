import {connect, disconnect} from './config/database.mjs';
connect();
import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';

import {router} from './routes/router.js';

import {helper} from './components/hbsHelpers.js';
import session from 'express-session';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
const app = express();

/////////////////////////////////////////////////////////////////////////////////// fix the logic to have session !!!!!!!!!!!!!!!!!!!!!
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));


app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

///////////////////////////////////////////////////////////////////////////////////


app.set('views', './views');
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: [
        path.join(app.get('views'), 'partials')
    ],
    helper
}));
app.set('view engine', '.hbs');

app.use(express.urlencoded());

app.use(router);
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Web server started at post 3000...');
});

