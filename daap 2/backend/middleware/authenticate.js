const jwt = require("jsonwebtoken");
const Participants = require("../model/participantsSchema");


const Authenticate = async(req, res, next) =>{
    try{
        const token = req.cookies.jwtoken;
        const verifytoken = jwt.verify(token, process.env.SECRET_KEY);
        const rootparticipant = await Participants.findOne({_id: verifytoken._id, "tokens.token":token})
        if(!rootparticipant){ throw new Error("user not found") }
        req.token = token;
        req.rootparticipant= rootparticipant;
        req.participantId = rootparticipant._id;

        next();
    }catch(err) {

        res.status(401).send('unautherized token');
        console.log(err);
    }

}

module.exports = Authenticate;