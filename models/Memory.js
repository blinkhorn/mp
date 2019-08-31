const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    topic: {
        type: String,
        required: true
    },
    images: [
        {
            memory: {
                type: String,
                required: true
            },
            imageURL: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                defautlt: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Memory = mongoose.model('memory', MemorySchema);
