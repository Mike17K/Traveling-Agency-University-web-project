const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const helpers = require('./components/hbsHelpers');

const app = express();

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

app.use(require('./routes/router'));
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Web server started at post 3000...');
});
