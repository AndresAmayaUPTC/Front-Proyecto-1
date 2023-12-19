const route = require('express').Router()

const path = require('path')

route.get('/', (req, res)=>res.sendFile(path.join(__dirname,'./../views/index.html')))
route.get('/rent', (req, res)=>res.sendFile(path.join(__dirname,'./../views/rent.html')))
route.get('/add-location', (req, res)=>res.sendFile(path.join(__dirname,'./../views/location.html')))

module.exports = route