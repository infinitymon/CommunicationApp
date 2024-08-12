import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Email already exists"],
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    firstName:{
        type: String,
        required: [true, "Please enter your first name"],
    },
    lastName:{
        type: String,
        required: [true, "Please enter your last name"]
    },
    password:{
        type: String,
        required: true,
    },
    active:{
        type: Boolean,
    },
    role:{
        type: String,
        enum: ["Admin", "Agent"]
    }
})

const User = mongoose.model('user', UserSchema);

export default User;