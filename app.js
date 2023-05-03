const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
require('./config/database');
const helpers = require('./components/hbsHelpers');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const cookieParser = require('cookie-parser');
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


app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: [
        path.join(app.get('views'), 'partials')
    ],
    helpers
}));
app.set('view engine', '.hbs');

app.use(express.urlencoded());

app.use(require('./routes/router'));
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Web server started at post 3000...');
});

