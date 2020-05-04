const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.port || 3000
    //define path for express config
const publicDircteryPath = path.join(__dirname, '../public')
const templatePath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partial')
    //setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', templatePath)
hbs.registerPartials(partialPath)
    //setup static directory for server
app.use(express.static(publicDircteryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Behaylu'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Behaylu'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Behaylu'
    })
})

app.get('/weather', (req, res) => {
    //quary string 
    if (!req.query.address) {
        return res.send({ error: 'You must provide the addrass term ' })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forcast({ latitude, longitude }, (error, forcast) => {
            if (error) {
                return res.send({
                    error

                })
            }
            res.send({
                location: location,
                forcast: forcast
            })

        })
    })
})
app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        message: 'help article not found',
        name: 'Behaylu'
    })
})
app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        message: 'page not found',
        name: 'Behaylu'
    })
})

app.listen(port, () => {
    console.log('The server is on')
})