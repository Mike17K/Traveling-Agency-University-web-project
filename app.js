import { connect, disconnect } from './models/mysql/database.mjs';
connect();
import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';

import { router } from './routes/router.js';

import { helper } from './components/hbsHelpers.js';
import session from 'express-session';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();

/////////////////////////////////////////////////////////////////////////////////// fix the logic to have session !!!!!!!!!!!!!!!!!!!!!
app.use(cookieParser('keyboard cat'));
app.use(session({
    secret: process.env.secret || "PynOjAuHetAuWawtinAytVunarAcjeBlybEshkEjVudyelwa",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: true,
        maxAge: 1000000 // Time is in miliseconds
    },
    // store: new MemoryStore({ checkPeriod: 86400000 })
}
));
app.use(flash());
app.use(bodyParser.json());

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
app.use(express.static('public'));

app.use(router);

app.listen(3000, () => {
    console.log('Web server started at post 3000...');
});

