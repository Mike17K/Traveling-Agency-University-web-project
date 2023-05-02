const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const helpers = require('./components/hbsHelpers');
const session = require('express-session');

const app = express();

/////////////////////////////////////////////////////////////////////////////////// fix the logic to have session !!!!!!!!!!!!!!!!!!!!!
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.post('/login', (req, res) => {
    // TODO: validate login credentials
    const username = req.body.username;
  
    // Set the user ID in the session
    req.session.userId = username;
  
    res.send('Login successful');
  });
  
  app.get('/dashboard', (req, res) => {
    // Check if the user is logged in
    if (!req.session.userId) {
      res.redirect('/login');
      return;
    }
  
    // Render the dashboard page
    res.render('dashboard', { username: req.session.userId });
  });


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

app.use(require('./routes/router'));
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Web server started at post 3000...');
});
