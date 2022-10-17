const mongoose = require('mongoose');


const PlayerSchema = new mongoose.Schema({
    Username: 
    {
        type: String,
        required: true,     // cannot be skipped
        immutable: true     // cannot be edited
    },
    
    Password: 
    {
        type: String,
        required: true,     // cannot be skipped
        immutable: true  // cannot be edited after written once
    },
    Score:
    {
        type: Number,
        default: 0  // default value is 0
    },

    isLoggedIn:
    {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model("PlayerModel",PlayerSchema);



