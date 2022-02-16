const mongoose = require('mongoose');


const MeetingItemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('MeetingItem', MeetingItemSchema);