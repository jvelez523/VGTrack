const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const cookieParser = require('cookie-parser');
var authMiddleware = require("./authMiddleware");
var glist = require("../models/gamelist")
var axios = require("axios")


//Wanting to play Post Rout
router.post("/:id/wtp", (req,res,next)=> {
  var id = req.params.id;
  axios({
    url:
      `https://api-v3.igdb.com/games/${id}?fields=name,cover.image_id&expand=cover`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "user-key": "1fda64715ca1971db849c092ce825dbf"
    },
    data: "fields name artworks;"
  })
    .then(response => {
      console.log(response.data[0]);
      let {name , id,cover} = response.data[0];
      glist.create({name,id,cover}).then(gli => {
        User.findById(req.cookies.currentuser._id).then(user=>{
          user.wtpgames.push(gli)
          user.save()
        }).then(() => {console.log("object")})
      })
    })
    .catch(err => {
      console.error(err);
    });
    res.redirect("/dashboard")
})


//Playing Post Route
router.post("/:id/playing", (req,res,next)=> {
  var id = req.params.id;
  axios({
    url:
      `https://api-v3.igdb.com/games/${id}?fields=name,cover.image_id&expand=cover`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "user-key": "1fda64715ca1971db849c092ce825dbf"
    },
    data: "fields name artworks;"
  })
    .then(response => {
      console.log(response.data[0]);
      let {name , id,cover} = response.data[0];
      glist.create({name,id,cover}).then(gli => {
        User.findById(req.cookies.currentuser._id).then(user=>{
          user.playing.push(gli)
          user.save()
        }).then(() => {console.log("object")})
      })
    })
    .catch(err => {
      console.error(err);
    });
    res.redirect("/dashboard")
})


//Beaten Post Route
router.post("/:id/beaten", (req,res,next)=> {
  var id = req.params.id;
  axios({
    url:
      `https://api-v3.igdb.com/games/${id}?fields=name,cover.image_id&expand=cover`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "user-key": "1fda64715ca1971db849c092ce825dbf"
    },
    data: "fields name artworks;"
  })
    .then(response => {
      console.log(response.data[0]);
      let {name , id,cover} = response.data[0];
      glist.create({name,id,cover}).then(gli => {
        User.findById(req.cookies.currentuser._id).then(user=>{
          user.beaten.push(gli)
          user.save()
        }).then(() => {console.log("object")})
      })
    })
    .catch(err => {
      console.error(err);
    });
    res.redirect("/dashboard")
})


//Backlog Post Route
router.post("/:id/backlog", (req,res,next)=> {
  var id = req.params.id;
  axios({
    url:
      `https://api-v3.igdb.com/games/${id}?fields=name,cover.image_id&expand=cover`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "user-key": "1fda64715ca1971db849c092ce825dbf"
    },
    data: "fields name artworks;"
  })
    .then(response => {
      console.log(response.data[0]);
      let {name , id,cover} = response.data[0];
      glist.create({name,id,cover}).then(gli => {
        User.findById(req.cookies.currentuser._id).then(user=>{
          user.backlog.push(gli)
          user.save()
        }).then(() => {console.log("object")})
      })
    })
    .catch(err => {
      console.error(err);
    });
    res.redirect("/dashboard")
})




//=============
//Deletion Routes
//=============

//Played Deletion Post Route
router.get("/delete/:_id", (req,res,next)=> {
  gameid = req.params._id
  User.findById(req.cookies.currentuser._id).then(user=>{
    glist.findByIdAndDelete(gameid).then((game) => {
      user.playing.splice(user.playing.indexOf(game), 1);
      user.save();
      res.redirect('back');
    })
  })
  console.log("This is the game id for GLIST =====>",req.params._id)
})

//want to play Deletion Post Route
router.get("/deletewtp/:_id", (req,res,next)=> {
  gameid = req.params._id
  User.findById(req.cookies.currentuser._id).then(user=>{
    glist.findByIdAndDelete(gameid).then((game) => {
      user.wtpgames.splice(user.wtpgames.indexOf(game), 1);
      user.save();
      res.redirect('back');
    })
  })
  console.log("This is the game id for GLIST =====>",req.params._id)
})

//Beaten Deletion Post Route
router.get("/deletebeat/:_id", (req,res,next)=> {
  gameid = req.params._id
  User.findById(req.cookies.currentuser._id).then(user=>{
    glist.findByIdAndDelete(gameid).then((game) => {
      user.beaten.splice(user.beaten.indexOf(game), 1);
      user.save();
      res.redirect('back');
    })
  })
  console.log("This is the game id for GLIST =====>",req.params._id)
})

//Backlog Deletion Post Route
router.get("/deleteblog/:_id", (req,res,next)=> {
  gameid = req.params._id
  User.findById(req.cookies.currentuser._id).then(user=>{
    glist.findByIdAndDelete(gameid).then((game) => {
      user.backlog.splice(user.backlog.indexOf(game), 1);
      user.save();
      res.redirect('back');
    })
  })
  console.log("This is the game id for GLIST =====>",req.params._id)
})




module.exports = router;

//let arr = [];
//user.find(req.cookies.currentuser._id).then(user => {
//  for (let i = 0; i < user.wtpgames.length; i++) {
//    glist.findById(user.wtpgame[i]).then(game => {
//      arr.push(game)
//    })
//  }
//})




// arr contains all wtp games