const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const participantsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pasword: {
        type: String,
        required: true
    },
    cpasword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

participantsSchema.pre('save', async function (next) {
    if (this.isModified('pasword')) {
        console.log("hello");
        this.pasword = await bcrypt.hash(this.pasword, 12);
        this.cpasword = await bcrypt.hash(this.cpasword, 12);
    }
    next();
});


participantsSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

const Participants = mongoose.model('PARTICIPANTS', participantsSchema);
module.exports = Participants;