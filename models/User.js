const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: { type:String},
    lastName: { type: String },
    fullName :{type: String},
    email: { type: String },
    password: { type: String },
    pincode: { type: Number },
    mobileNo: { type: Number },
    address1: { type: String },
    address2: { type: String },
    state: { type: String },
    country:  { type: String },
    lastLogin: {  type: Date },
    isLogin:  { type: Boolean },

})

module.exports = mongoose.model('User', UserSchema)