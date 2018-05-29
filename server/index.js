var express = require('express')
var bp = require('body-parser')
var app = express()
var cors = require('cors')
var port = 3000

app.use(cors())
//Fire up database connection
require('./server-assets/db/mlab-config')


//REGISTER MIDDLEWEAR
app.use(bp.json())
app.use(bp.urlencoded({
  extended: true
}))

let auth = require('./server-assets/auth/routes')
app.use(auth.session)
app.use(auth.router)

var users = require('./server-assets/routes/users')
var playlists = require('./server-assets/routes/playlists')

app.use(playlists.router)

// app.use('/users/*', (req, res, next) => {
//     if (!req.session.uid) {
//       return res.status(401).send({
//         error: 'please login to continue'
//       })
//     }
//     next()
//   })

// app.get('*', (req, res, next) => {
//     res.status(404).send({
//       error: 'No matching routes'
//     })
//   })
  
app.listen(port, () => {
  console.log('server running on port', port)
})
  