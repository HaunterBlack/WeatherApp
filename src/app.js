const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./../utils/forecast');
const geocode = require('./../utils/geocode');

const app = express();
const port = 3000;
const publicDirectoyPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoyPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Johnny Joestar'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Johnny Joestar'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        message: 'How can I help you?',
        name: 'Johnny Joestar'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address to get the forecast.'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Johnny Joestar'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not Found.',
        name: 'Johnny Joestar'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});