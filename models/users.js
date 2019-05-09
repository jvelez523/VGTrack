const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  displayName: String,
  uid: String,
  email: String,
  wtpgames: [{type: mongoose.Schema.Types.ObjectId,
    ref: 'glist'}],
  playing: [{type: mongoose.Schema.Types.ObjectId,
    ref: 'glist'}],
  beaten: [{type: mongoose.Schema.Types.ObjectId,
    ref: 'glist'}],
  backlog: [{type: mongoose.Schema.Types.ObjectId,
    ref: 'glist'}],
  photoURL: { type: String, default: '/image/defaultprofile.png' },
  
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;