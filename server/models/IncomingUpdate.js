const mongoose = require('mongoose');


const IncomingUpdateSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   }
    
});


module.exports = mongoose.model('IncomingUpdate', IncomingUpdateSchema);