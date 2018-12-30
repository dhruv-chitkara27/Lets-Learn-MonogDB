const express = require('express')
const mongoose = require('mongoose')
const City = require('./models/City')
const Country = require('./models/Country')

//connect to our Mongo DB:
mongoose.connect('mongodb://localhost/world')
.then(data => {
  console.log('Mongo DB connection success!')
})
.catch(err => {
  console.log('Mongo DB connection failed: ' + err.message)
})

const app = express()

const cities = require('./routes/cities')
const countries = require('./routes/cities')

app.use('/cities',cities)
app.use('/countries', countries)

app.get('/', (req,res,next) => {
  res.json({
    confirmation: 'success',
    data: 'This is the Mongo project!'
  })
})

app.get('/cities', (req,res,next) => {
    City.find(null)
    .then(cities => {
      res.json({
        confirmation: 'success',
        data: cities
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
        message: err.message
      })
    })
})

app.get('/countries', (req,res,next) => {
  Country.find(null)
  .then(countries => {
    res.json({
      confirmation: 'success',
      data: countries
    })
  })
  .catch(err => {
    res.json({
      confirmation: 'fail',
      message: err.message
    })
  })
})

app.listen(3000)
console.log('App running http://localhost3000')
