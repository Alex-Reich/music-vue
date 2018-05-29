var mongoose = require('mongoose')
var connectionString = 'mongodb://student:student@ds016298.mlab.com:16298/music-vue'
var connection = mongoose.connection


mongoose.connect(connectionString)

connection.on('error', err=>{
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', ()=>{
  console.log('Connected to Database')
})