const validator = require('validator');

const validateSignUpData = (data) => {
    const { firstName, lastName, email, password } = data;
    if(!firstName || !lastName || !email || !password) {
        throw new Error("All fields are required")
    }
    if(!validator.isEmail(email)) {
        throw new Error("Invalid email")
    }
    if(!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong")
    }
}

const validateLoginData = (data) => {
    const { email, password } = data;
    if(!email || !password) {
        throw new Error("All fields are required")
    }
    if(!validator.isEmail(email)) {
        throw new Error("Invalid email")
    }
}

const validateProfileUpdate = (data) => {
    const ALLOWED_FIELDS = ["firstName", "lastName", "age", "gender", "about"];
    
    const isValidFields = Object.keys(data).every(key => ALLOWED_FIELDS.includes(key));
    if(!isValidFields) {
        throw new Error("Invalid fields")
    }
}

const validatePasswordUpdate = (data) => {
    const { currentPassword, newPassword } = data;
    if(!currentPassword || !newPassword) {
        throw new Error("All fields are required")
    }
    if(!validator.isStrongPassword(newPassword)) {
        throw new Error("Password is not strong")
    }
}

const validateConnectionRequest = (data) => {
    const { status, receiverId } = data;
    if(!status || !receiverId) {
        throw new Error("All fields are required")
    }

    const ALLOWED_STATES = ["interested", "ignored"];

    if(!ALLOWED_STATES.includes(status)) {
        throw new Error("Invalid status")
    }
}


module.exports = {
    validateSignUpData,
    validateLoginData,
    validatePasswordUpdate,
    validateProfileUpdate,
    validateConnectionRequest,
}