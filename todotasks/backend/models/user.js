const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // cartlists: [
    //     {
    //         type:Schema.Types.ObjectId,
    //         ref: 'CartList'
    //     }
    // ]
});

module.exports = mongoose.model('User', userSchema);