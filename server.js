const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + "/views/partials/");
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('error', err);
        }
    });
    console.log(log);
    next();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to our home page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorCode: 404,
        errorMessage: 'The request could not be fulfilled'
    });
});


app.listen(3000, () => {
    console.log('the server is up at port 3000');
});
