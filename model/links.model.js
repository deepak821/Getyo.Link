const mongoose = require('mongoose');


const Schema = mongoose.Schema

const Link = Schema({
    url: {
        type: String,
        require: true
    },
    id: {
        type: String,
        unique: true
      },
    description: {
        type: String
    },
    email: {
        type: String
    }
})

module.exports = mongoose.model("Link", Link);