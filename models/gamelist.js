const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const games = new Schema({
  name: String,
  id: String,
  cover: Object,
}, {
  timestamps: true
});

const glist = mongoose.model("glist", games);

module.exports = glist;