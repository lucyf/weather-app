const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { hasSubscribers } = require('diagnostics_channel')
const app = express()
const hbs = require('hbs')

// Port config
const port = process.env.PORT || 3000

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPaths = path.join(__dirname, '../templates/views')
const partialsPaths = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPaths)
hbs.registerPartials(partialsPaths)


// Seting static directory to serve
app.use(express.static(publicDirectoryPath))

// Render hbs files
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name:'Lucia'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name:'Lucia'
    })
})
// Weather
app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide an Adress!'
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude,(error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

// 404 pages

app.get('/about/*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Lucia',
        message:'About article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Lucia',
        message:'Page not found'
    })
})

app.listen(port, ()=>{
    console.log(port)
})
