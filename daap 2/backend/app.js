const express = require("express");
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");
const app = express();
dotenv.config({path: './config.env'})

const port = process.env.PORT || 8000;  

require("./db/conn");

const Participants = require('./model/participantsSchema');
app.use(cookieParser())
app.use(express.json());
app.use(require('./router/auth'));


// const middleware =  (req,res,next)=>{
//     console.log("Middleware");
//     next();
// }
// app.get('/', middleware, (req,res)=>{
//     res.send("mkcs");
// });

app.listen(port ,()=>{  
    console.log(`server chal raha ${port} pe` );
})