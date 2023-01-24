const mongoose = require('mongoose');

const schema = mongoose.Schema({
    question: String,
    response:String
});

module.exports = mongoose.model('chatmodel', schema);