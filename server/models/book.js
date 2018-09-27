const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
})

// model refers to collection in the database
module.exports = mongoose.model('Book', bookSchema)
