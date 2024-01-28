const mongoose = require('mongoose');

const hourSchema = new mongoose.Schema({
    id: String,
    date: Date,
    input: String,
    output: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

hourSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
    }
})

const Hour = mongoose.model('Hour', hourSchema)

module.exports = Hour;