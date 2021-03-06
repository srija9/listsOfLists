const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: { // name of the cartlist
        type: String,
        //require: true,
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'TaskCard'
        }
    ],
    count: { 
        type: Number,
        require: true,
    }
});

module.exports = mongoose.model('CartList', listSchema);