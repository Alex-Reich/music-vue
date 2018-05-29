var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'User'


var schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
})

schema.statics.generateHash = function (password) {
    return bcrypt.hashSync(password, SALT)
}

schema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.hash)
}

module.exports = mongoose.model(schemaName, schema)

