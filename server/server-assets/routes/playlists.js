var router = require('express').Router()
var Playlists = require('../models/playlist')
var session = require('../auth/session')

// router.get('/api/playlists', (req, res, next) => {
//   Playlists.find({})
//     .then(playlists => {
//       res.status(200).send(playlists)
//     })
//     .catch(err => {
//       res.status(400).send(err)
//     })
// })

router.get('/api/playlists/:id?', (req, res, next) => {
  if (req.params.id) {
    Playlists.findById(req.params.id)
      .then(playlist => {
        return res.status(200).send(playlist)
      })
      .catch(err => {
        return res.status(400).send(err)
      })
  } else {
    Playlists.find({})
      .then(playlist => {
        return res.status(200).send(playlist)
      })
      .catch(err => {
        return res.status(400).send(err)
      })
  }
})

// Making a new playlist
router.post('/api/playlists', (req, res, next) => {
  var playlist = req.body
  Playlists.create(playlist)
    .then(newPlaylist => {
      return res.status(200).send(newPlaylist)
    })
    .catch(err => {
      return res.status(400).send(err)
    })
})

// Deleting a playlist
router.delete('/api/playlists/:id', (req, res, next) => {
  Playlists.findByIdAndRemove(req.params.id)
    .then(data => {
      res.send("Successfully Deleted Playlist")
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Adding song to a specific playlist Req.body will be a single song object
router.put('/api/playlists/:id/songs', (req, res, next) => {
  Playlists.findById(req.params.id)
  .then(function (playlist) {
    playlist.songs.addToSet(req.body)
    playlist.save()
      .then(() => {
        res.send(playlist)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })
})

// Replace entire playlist with updated playlist
router.put('/api/playlists/:id', (req, res) => {
  Playlists.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(playlist=>{
    res.send(playlist)
  })
  .catch(err =>{
    res.status(400).send(err)
  })
})

// Get the songs of a specific playlist
router.get('/api/playlists/:id/songs', (req, res, next) => {
  Playlists.findById(req.params.id)
    .then(playlist => {
      res.status(200).send(playlist)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

module.exports = {
  router
}



