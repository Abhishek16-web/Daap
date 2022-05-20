const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("../db/conn");
const Participants = require("../model/participantsSchema");
const Managers =  require("../model/managerSchema");
const authenticate = require("../middleware/authenticate")

router.get('/', (req, res) => {
    res.send('hello ');
})
router.post('/participantregister', async (req, res) => {
    const { name, email, pasword, cpasword } = req.body;
    if (!name || !email || !pasword || !cpasword) {
        return res.status(422).json({ error: "Please enter the fileds properly" });
    }
    try {
        const userExist = await Participants.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "User already registered" });
        } else if (pasword != cpasword) {
            return res.status(422).json({ error: "pasword not matched" });
        } else {

            const participants = new Participants({ name, email, pasword, cpasword })

            await participants.save();
            res.status(201).json({ messgae: "user signin successfully" });
        }

    } catch (err) {
        console.log(err);
    }
});


router.post('/participantsignin', async (req, res) => {
    try {
        const {email, pasword } = req.body;
        if (!email || !pasword) {
            return res.status(400).json({ error: "fill all the details" })
        }
        const participantlogin = await Participants.findOne({ email: email })

        if (!participantlogin) {
            res.status(400).json({ error: "invalid credintals mail" })
        }
        else {
            const isMatch = await bcrypt.compare(pasword, participantlogin.pasword);

            const token = await participantlogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })

            if (!isMatch) {
                res.status(400).json({ error: "invalid credintals pasword" })
            } else {
                res.json({ messgae: "user signin successfully" });
            }
        }

    } catch (err) {
        console.log(err);
    }
})
router.post('/managersignin', async (req, res) => {
    try {
        const {email, pasword } = req.body;
        if (!email || !pasword) {
            return res.status(400).json({ error: "fill all the details" })
        }
        else{
            const managerlogin = await Managers.findOne({ email: email, pasword:pasword });
            if (! managerlogin) {
                res.status(400).json({ error: "invalid credintals mail" })
            }
            else{
                res.json({ messgae: "user signin successfully" });
            }
        }
    } catch (err) {
        console.log(err);
    }
})

router.get('/lottery', authenticate, (req,res) =>{
    res.send(req.rootparticipant);
});



router.get('/logout', (req,res) =>{
    console.log("i am logging out");
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send("user logout");
});




module.exports = router;