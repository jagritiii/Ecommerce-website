const mongoose = require("mongoose");

const userRoleEnums = {
    admin: 1,
    customer: 2
}
module.exports.role = userRoleEnums;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        required: true
    },
    userType: {
        type: Number,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;