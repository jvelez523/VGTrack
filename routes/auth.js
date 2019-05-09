const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const cookieParser = require('cookie-parser');
var authMiddleware = require("./authMiddleware");

router.post("/signup", (req, res, next) => {
  //console.log(req.body)

  let { email, uid, displayName, photoURL } = req.body.user;
  User.create({ email, uid, displayName, photoURL }).then(user => {
    console.log(user);
    res.redirect("/")
  });

  console.log(email, uid, displayName);

  // var user = firebase.auth().currentUser;

  // if (user != null) {
  //   user.providerData.forEach(function(profile) {
  //     console.log("Sign-in provider: " + profile.providerId);
  //     console.log("  Provider-specific UID: " + profile.uid);
  //     console.log("  Name: " + profile.displayName);
  //     console.log("  Email: " + profile.email);
  //     console.log("  Photo URL: " + profile.photoURL);
  //   });
  // }
});

router.post("/user", (req, res, next) => {
let userId = req.body.user.uid;
  User.findOne({uid : userId}).then(user => {
    console.log(user)
    res.cookie("currentuser", cookieParser.JSONCookies(user))
    .redirect("/")
  }) 
})

router.get("/cookies",(req,res) => {
  res.json(req.cookies)
})

router.post("/logout",(req,res) => {
  res.clearCookie("currentuser").redirect('/')
})
module.exports = router;
