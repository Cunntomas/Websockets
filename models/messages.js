const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema ({
  username: {
    type: String
  },
  text: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Message', schema)
