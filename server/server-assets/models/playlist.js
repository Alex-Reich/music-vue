var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var schemaName = 'Playlist'

let songSchema = new Schema({
    title: { type: String, required: true },
    albumArt: { type: String },
    artist: { type: String },
    coll: { type: String },
    preview: { type: String }
})

let schema = new Schema({
    title: { type: String, required: true },
    songs: [songSchema]
})

schema.pre('save', function (next) {
    this.markModified('songs')
    next()
})



module.exports = mongoose.model(schemaName, schema)
