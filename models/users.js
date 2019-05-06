const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  displayName: String,
  uid: String,
  email: String,
  favoritegames: Array,
  profileimg: { type: String, default: '/image/defaultprofile.png' },
  
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;