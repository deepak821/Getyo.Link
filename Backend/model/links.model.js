const mongoose = require('mongoose');

var letters = "0123456789ABCDEF";
var uid ="";
for(var i = 0; i < 6; i++)
 uid  = uid + letters[(Math.floor(Math.random() * 16))];
const Schema = mongoose.Schema

const Link = Schema({
    weblink: {
        type: String
    },
    _id: {
        type: String,
        default: uid
      },
    description: {
        type: String
    },
    email: {
        type: String
    }
})

module.exports = mongoose.model("Link", Link);