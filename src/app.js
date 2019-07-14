const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jordan Deck'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Jordan Deck'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'this is the help page... HHHEEEEELLLLLPPPP!!!!!!!!',
        title: 'Help',
        name: 'Jordan Deck'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (err, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        }

        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send({
                    error: err
                })
            }

            res.send({
                forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found.',
        title: '404',
        name: 'Jordan Deck'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found.',
        title: '404',
        name: 'Jordan Deck'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})