const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    jwt:{
      type:String,
      required:false
    },
});

const authModel = mongoose.model('authModel', userSchema);

module.exports = { authModel };
