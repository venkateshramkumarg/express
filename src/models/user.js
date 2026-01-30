const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,

    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })) {
                throw new Error("Password is not strong")
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["Male", "Female", "Other"].includes(value)) {
                throw new Error("Invalid gender")
            }
        }
    },
    about: {
        type: String,
        default: "I am a new user"
    }
},
{
    timestamps: true
}
)

userSchema.methods.getJWT = function() {
    const user = this;
    const token =  jwt.sign({ userId: user._id }, "1234567890", { expiresIn: "1h" });
    return token;
}

userSchema.methods.validatePassword = async function(password) {
    const user = this;
    const isValid = await bcrypt.compare(password, user.password);
    return isValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;