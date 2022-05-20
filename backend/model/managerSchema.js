const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    pasword:{
        type:String,
        required:true
    }
})

const Manager = mongoose.model('MANAGERS', managerSchema);
module.exports = Manager;