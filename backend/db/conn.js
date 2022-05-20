const mongoose = require('mongoose');

const DB = process.env.DATABASE;
mongoose.connect(DB,{

}).then(()=>{
    console.log("connect ho gya");
}).catch(()=> console.log("nhi hua"));

