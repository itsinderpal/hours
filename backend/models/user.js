const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { MONGO_URI } = require('../utils/config');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    passwordHash: String,
    hours: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hour',
        }
    ]
})

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
        delete returnedObj.passwordHash;
    }
})

async () => await mongoose.connect(MONGO_URI)();
console.log("connected from model");

const User = mongoose.model('User', userSchema);

module.exports = User;