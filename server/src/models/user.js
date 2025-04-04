const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 225,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        default: "",
    },
    zipCode: {
        type: String,
        default: "",
    },
    profilePicture: {
        type: String,
        default: "",
    },
    adminRequests: [
        { type: mongoose.Schema.Types.ObjectId, ref: "AdminRequest" },
    ],
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin },
        process.env.SECRET_KEY
    );
    return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
