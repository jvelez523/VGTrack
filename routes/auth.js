const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

router.post("/signup", (req, res, next) => {
  //console.log(req.body)

  let { email, uid, displayName } = req.body.user;
  User.create({ email, uid, displayName }).then(user => {
    console.log(user);
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

module.exports = router;
